// WebAudio synthesis only. The context is created on the first user gesture; nothing plays before that.
export const AU = { ctx: null, master: null, on: true, vol: 0.5, last: {}, noise: null };

export function unlock() {
  if (AU.ctx) { if (AU.ctx.state === 'suspended') AU.ctx.resume(); return; }
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    AU.ctx = new C();
    AU.master = AU.ctx.createGain(); AU.master.gain.value = AU.vol * 0.6; AU.master.connect(AU.ctx.destination);
    const len = AU.ctx.sampleRate;
    AU.noise = AU.ctx.createBuffer(1, len, AU.ctx.sampleRate);
    const d = AU.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  } catch (e) { AU.ctx = null; }
}
export function setVolume(v) { AU.vol = v; if (AU.master) AU.master.gain.value = v * 0.6; }
export function setOn(on) { AU.on = on; }

function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); }
function osc(type, f, t, dur, peak, f2) {
  const o = AU.ctx.createOscillator(), g = AU.ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
  env(g, t, 0.005, peak, dur); o.connect(g); g.connect(AU.master); o.start(t); o.stop(t + dur + 0.05);
  return o;
}
function noise(t, dur, peak, type, freq, q = 1) {
  const s = AU.ctx.createBufferSource(); s.buffer = AU.noise;
  const f = AU.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = AU.ctx.createGain(); env(g, t, 0.01, peak, dur);
  s.connect(f); f.connect(g); g.connect(AU.master); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.1);
}

const SOUNDS = {
  crack(t, o) { const q = o && o.q != null ? o.q : 0.7; osc('square', 1800 + 600 * q, t, 0.03, 0.12 + 0.12 * q); noise(t, 0.12 + 0.1 * q, 0.25 + 0.2 * q, 'bandpass', 2600, 1.2); osc('sine', 220, t, 0.08, 0.15, 90); },
  foul(t) { osc('square', 1400, t, 0.025, 0.08); noise(t, 0.08, 0.15, 'bandpass', 2000, 1.5); },
  pop(t) { osc('sine', 180, t, 0.07, 0.35, 70); noise(t, 0.05, 0.25, 'lowpass', 1200); },
  whiff(t) { noise(t, 0.22, 0.18, 'bandpass', 900, 0.7); },
  strike(t) { osc('triangle', 330, t, 0.16, 0.14); osc('triangle', 247, t + 0.12, 0.2, 0.12); },
  ball(t) { osc('sine', 392, t, 0.1, 0.07); },
  out(t) { osc('triangle', 294, t, 0.12, 0.12); osc('triangle', 220, t + 0.1, 0.22, 0.12); },
  safe(t) { osc('triangle', 440, t, 0.1, 0.1); osc('triangle', 587, t + 0.08, 0.18, 0.1); },
  cheer(t, o) { noise(t, (o && o.big) ? 1.8 : 1.0, (o && o.big) ? 0.32 : 0.2, 'lowpass', 1100, 0.6); noise(t + 0.1, 0.8, 0.08, 'bandpass', 2400, 2); },
  groan(t) { noise(t, 0.6, 0.12, 'lowpass', 500, 0.7); },
  organ(t) { [392, 523, 659, 784, 659, 784].forEach((f, k) => { osc('square', f, t + k * 0.13, 0.11, 0.05); osc('sine', f / 2, t + k * 0.13, 0.11, 0.07); }); },
  splash(t) { noise(t, 0.7, 0.3, 'lowpass', 900, 0.5); noise(t + 0.05, 0.4, 0.12, 'highpass', 3000); },
  click(t) { osc('square', 900, t, 0.03, 0.05); },
  meter(t) { osc('sine', 1320, t, 0.05, 0.08); },
  jingle(t) { [523, 659, 784, 1047].forEach((f, k) => osc('triangle', f, t + k * 0.11, 0.22, 0.14)); },
  win(t) { [523, 659, 784, 1047, 1319].forEach((f, k) => osc('triangle', f, t + k * 0.13, 0.35, 0.16)); },
};

// Rate-limited play by name.
export function play(name, o) {
  if (!AU.on || !AU.ctx || AU.ctx.state !== 'running') return;
  const now = AU.ctx.currentTime;
  const gap = 0.03;
  if (AU.last[name] && now - AU.last[name] < gap) return;
  AU.last[name] = now;
  try { SOUNDS[name] && SOUNDS[name](now, o); } catch (e) { /* audio is optional */ }
}
