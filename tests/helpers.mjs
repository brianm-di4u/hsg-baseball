// Shared helpers for the Diamond Springs tests (imported by *.test.mjs; not a test file itself).

export async function waitFor(t, pred, ms = 8000, label = 'condition') {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const s = await t.state();
    if (pred(s)) return s;
    await t.page.waitForTimeout(40);
  }
  t.fail(`timed out waiting for ${label}`);
  return t.state();
}

// Step the paused game until pred(state) or n ticks.
export async function stepUntil(t, pred, maxTicks = 3600, chunk = 15, label = 'condition') {
  for (let k = 0; k < maxTicks; k += chunk) {
    const s = await t.game('step', chunk);
    if (pred(s)) return s;
  }
  t.fail(`stepUntil timed out: ${label}`);
  return t.state();
}

// A paused exhibition: the user bats (away team, top of the 1st) unless o.user says otherwise.
export async function exhibition(t, o = {}) {
  await t.seed(o.seed ?? 7);
  await t.game('newGame', { mode: 'exhibition', home: 'lakeside', away: 'hot-springs', user: 'away', park: 'home', innings: 7, paused: true, ...o });
  return t.state();
}

// Step until the pitch is in flight.
export const toFlight = (t) => stepUntil(t, (s) => s.game.phase === 'flight', 600, 5, 'pitch in flight');
// Step until the game is back between pitches.
export const toPre = (t) => stepUntil(t, (s) => s.game.phase === 'pre' || s.game.over || s.scene !== 'game', 6000, 30, 'next pitch');
// Throw an AI pitch exactly at (x, z) and wait for it to be in flight.
export async function aiPitchAt(t, x, z, type = 'FB') {
  await t.game('act', 'aiPitch', { x, z, type });
  return toFlight(t);
}

export async function click(t, act, arg) {
  const sel = arg != null ? `[data-act="${act}"][data-arg="${arg}"]` : `[data-act="${act}"]`;
  await t.page.click(sel);
  await t.page.waitForTimeout(30);
}

// WCAG contrast of every visible text element against its nearest opaque background.
export async function contrastReport(page) {
  return page.evaluate(() => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(',').map((x) => parseFloat(x)); return { r: v[0], g: v[1], b: v[2], a: v[3] == null ? 1 : v[3] }; };
    const lum = ({ r, g, b }) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const blend = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
    const bgOf = (el) => {
      const stack = [];
      for (let e = el; e; e = e.parentElement) {
        const c = parse(getComputedStyle(e).backgroundColor);
        if (c && c.a > 0) { stack.push(c); if (c.a >= 0.99) break; }
      }
      let bg = { r: 20, g: 18, b: 31, a: 1 };
      for (let i = stack.length - 1; i >= 0; i--) bg = blend(stack[i], bg);
      return bg;
    };
    const out = [];
    const els = [...document.querySelectorAll('#screen *, #sb *, #pad *, #banner, #tip')].filter((e) => {
      if (!e.offsetParent && getComputedStyle(e).position !== 'fixed') return false;
      return [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    });
    for (const e of els) {
      const cs = getComputedStyle(e);
      if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      let fg = parse(cs.color); if (!fg) continue;
      const bg = bgOf(e);
      let op = 1; for (let x = e; x; x = x.parentElement) op *= +getComputedStyle(x).opacity;
      if (e.closest('[disabled]')) continue; // disabled controls are exempt (WCAG 1.4.3)
      fg = blend({ ...fg, a: fg.a * op }, bg);
      const L1 = lum(fg), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
      const need = size >= 24 || (bold && size >= 18.66) ? 3 : 4.5;
      if (ratio < need) out.push({ text: e.textContent.trim().slice(0, 40), ratio: +ratio.toFixed(2), need, cls: e.className, tag: e.tagName });
    }
    return { checked: els.length, fails: out };
  });
}
