import { exhibition, stepUntil, toPre, aiPitchAt } from './helpers.mjs';

// Force a batted ball in a crafted situation and play it out.
async function hit(t, ball, sit = {}, shotAt = null, name = null) {
  await t.game('setState', { game: { phase: 'pre', balls: 0, strikes: 0, outs: 0, bases: [false, false, false], ...sit } });
  await t.game('act', 'contact', ball);
  await aiPitchAt(t, 0, 2.5);
  let s = await stepUntil(t, (x) => x.game.phase === 'play', 900, 5, 'ball in play');
  if (shotAt != null) {
    await stepUntil(t, (x) => x.game.playT >= shotAt || x.game.phase !== 'play', 900, 3, 'play mid-point');
    await t.shot(name, { wait: false });
  }
  s = await stepUntil(t, (x) => x.game.phase === 'result' || x.game.phase === 'half' || x.scene !== 'game' || x.game.over, 3000, 15, 'play resolved');
  return s;
}

export const tests = [
  {
    name: 'play: fly out, gap hit, home run',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 41 });
      let s = await hit(t, { ev: 86, la: 34, spray: 2 }, {}, 2.2, '20-flyout');
      t.expect(s.game.lastPlay.caught && s.game.outs === 1, `fly ball caught for an out (${s.game.lastPlay.desc})`);
      let gap = null;
      for (const [ev, la, spray] of [[92, 16, -20], [92, 12, -24], [92, 13, 22], [94, 15, -17], [90, 10, 20]]) {
        s = await hit(t, { ev, la, spray }, {});
        if (s.game.lastPlay.hit >= 1) { gap = [ev, la, spray]; break; }
        await toPre(t);
      }
      t.expect(!!gap, `a gap liner falls in for a hit (${s.game.lastPlay.desc})`);
      if (gap) { await toPre(t); s = await hit(t, { ev: gap[0], la: gap[1], spray: gap[2] }, {}, 3.4, '20b-gap'); }
      s = await hit(t, { ev: 106, la: 29, spray: 3 }, {}, 3.4, '20c-homer');
      t.expect(s.game.lastPlay.hr && s.game.lastPlay.dist > 380, `home run (${s.game.lastPlay.desc})`);
      t.expect(/\d+ ft/.test(s.game.lastPlay.desc), 'distance shown');
      await t.checkLayout();
    },
  },
  {
    name: 'play: ground out and double play',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 43 });
      let s = await hit(t, { ev: 72, la: -6, spray: -14 }, {}, 1.6, '21-groundout');
      t.expect(/Ground out/.test(s.game.lastPlay.desc) && s.game.outs === 1, `routine grounder: ${s.game.lastPlay.desc}`);
      let dp = null;
      for (const spray of [-10, -14, 9, 13, -6, 5, -18]) {
        s = await hit(t, { ev: 84, la: -4, spray }, { bases: [true, false, false] });
        if (s.game.lastPlay.dp) { dp = s.game.lastPlay; break; }
      }
      t.expect(!!dp, `a double play turned (${dp && dp.desc})`);
      if (dp) {
        s = await hit(t, { ev: 84, la: -4, spray: dp.spray }, { bases: [true, false, false] }, 1.9, '21b-dp');
        t.expect(s.game.outs === 2, 'two outs on the double play');
      }
    },
  },
  {
    name: 'play: sacrifice fly',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 44 });
      const s0 = await t.state();
      let s = await hit(t, { ev: 94, la: 36, spray: -4 }, { bases: [false, false, true] }, 3.6, '22-sacfly');
      t.expect(s.game.lastPlay.sf && s.game.lastPlay.runs === 1, `runner tags and scores (${s.game.lastPlay.desc})`);
      t.equal(s.game.score[1] - s0.game.score[1], 1, 'run counts');
    },
  },
  {
    name: 'play: infield fly rule',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 45 });
      const s = await hit(t, { ev: 62, la: 68, spray: 6 }, { bases: [true, true, false] }, 1.5, '23-infield-fly');
      t.expect(s.game.lastPlay.infieldFly && s.game.outs === 1, `infield fly: batter out (${s.game.lastPlay.desc})`);
      t.expect(s.game.bases[0] && s.game.bases[1], 'runners stay');
    },
  },
  {
    name: 'play: no run on a third-out force',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 46 });
      let forced = null;
      for (const spray of [-15, -12, 12, 15, -20, 20, -8]) {
        const s0 = await t.state();
        const s = await hit(t, { ev: 74, la: -5, spray }, { outs: 2, bases: [true, true, true] });
        if (s.game.lastPlay.outs >= 1 && /Ground out|Fielder/.test(s.game.lastPlay.desc)) { forced = { s, s0 }; break; }
        await toPre(t);
      }
      t.expect(!!forced, 'a ground-ball force for the third out');
      if (forced) {
        t.equal(forced.s.game.lastPlay.runs, 0, `no run counts (${forced.s.game.lastPlay.desc})`);
        t.equal(forced.s.game.score[1], forced.s0.game.score[1], 'score unchanged');
      }
    },
  },
  {
    name: 'play: steal',
    async run(t) {
      await exhibition(t, { seed: 47 });
      await t.game('setState', { game: { bases: [true, false, false] } });
      await t.page.keyboard.press('s');
      let s = await t.state();
      t.equal(s.game.stealCall, true, 'S sends the runner');
      await aiPitchAt(t, 1.7, 2.5);
      await t.game('step', 8);
      await t.shot('24-steal');
      s = await stepUntil(t, (x) => x.game.phase === 'result', 600, 5, 'pitch done');
      t.expect(!!s.game.steal, 'catcher throws on the steal');
      t.expect(s.game.steal.safe ? s.game.bases[1] && !s.game.bases[0] : s.game.outs === 1, `steal ${s.game.steal.safe ? 'safe' : 'out'} applied`);
    },
  },
  {
    name: 'play: timeline playback and skip',
    async run(t) {
      await exhibition(t, { user: 'none', seed: 48 });
      await t.game('act', 'contact', { ev: 90, la: 12, spray: 24 });
      await aiPitchAt(t, 0, 2.5);
      let s = await stepUntil(t, (x) => x.game.phase === 'play', 600, 5, 'in play');
      await t.game('step', 45);
      s = await t.state();
      t.expect(s.game.phase === 'play' && s.game.playT > 0.5, `timeline running (${s.game.playT.toFixed(2)} of ${s.game.playDur.toFixed(2)} s)`);
      await t.shot('25-play-mid', { wait: false });
      await t.page.keyboard.press('f');
      s = await stepUntil(t, (x) => x.game.phase !== 'play', 200, 2, 'fast-forward');
      t.expect(s.game.phase === 'result' || s.game.phase === 'half', 'F fast-forwards to the result');
    },
  },
];
