import { exhibition, toFlight, toPre, stepUntil, aiPitchAt, click } from './helpers.mjs';

const toResult = (t) => stepUntil(t, (s) => s.game.phase === 'result' || s.game.phase === 'play', 600, 5, 'pitch result');

export const tests = [
  {
    name: 'duel: called strikes, balls, walk, strikeout',
    async run(t) {
      await exhibition(t);
      let s = await aiPitchAt(t, 0, 2.5);
      t.equal(s.game.userBats, true, 'the user bats');
      await t.game('step', 12);
      await t.shot('10-duel-bat');
      s = await toResult(t);
      t.equal(s.game.strikes, 1, 'pitch down the middle, taken: called strike');
      await toPre(t);
      s = await aiPitchAt(t, 1.6, 2.5);
      s = await toResult(t);
      t.equal(s.game.balls, 1, 'pitch off the plate: ball');
      await t.shot('10b-ball-call');
      await toPre(t);
      for (let i = 0; i < 3; i++) { await aiPitchAt(t, -1.6, 2.6); await toResult(t); await toPre(t); }
      s = await t.state();
      t.expect(s.game.bases[0] && s.game.balls === 0 && s.game.strikes === 0, 'four balls: walk, runner on first');
      for (let i = 0; i < 3; i++) { await aiPitchAt(t, 0.2, 2.4); await toResult(t); await toPre(t); }
      s = await t.state();
      t.equal(s.game.outs, 1, 'three called strikes: strikeout');
      t.expect(s.game.log.some((l) => /Strikeout/.test(l)), 'strikeout announced');
      await t.checkLayout();
    },
  },
  {
    name: 'duel: timing grades and contact',
    async run(t) {
      await exhibition(t, { seed: 21 });
      await aiPitchAt(t, 0, 2.5);
      let s = await t.game('act', 'swingAt', 0, { dx: 0, dz: 0.05 });
      t.equal(s.game.swing.grade, 'PERFECT', 'on-time swing graded PERFECT');
      await t.game('step', 2);
      await t.shot('11-swing-perfect', { wait: false });
      s = await toResult(t);
      t.expect(['inplay', 'foul'].includes(s.game.result.kind), `perfect swing makes contact (${s.game.result.kind})`);
      await toPre(t);
      s = await t.state();
      const k0 = s.game.strikes;
      await aiPitchAt(t, 0, 2.5);
      s = await t.game('act', 'swingAt', 2.4, { dx: 0, dz: 0 });
      t.equal(s.game.swing.grade, 'WAY LATE', 'very late swing graded');
      s = await toResult(t);
      t.equal(s.game.result.kind, 'whiff', 'very late swing misses');
      t.expect(s.game.strikes === k0 + 1 || s.game.outs > 0, 'swinging strike counts');
      await t.shot('11b-whiff');
      await aiPitchAt(t, 0, 2.5);
      s = await t.game('act', 'swingAt', -1.2, { dx: 0, dz: 0 });
      t.equal(s.game.swing.grade, 'EARLY', 'early swing graded EARLY');
    },
  },
  {
    name: 'duel: pull, opposite field and fouls',
    async run(t) {
      await exhibition(t, { seed: 5 });
      let s = await t.state();
      const side = s.game.batter.bats === 'L' ? -1 : 1;
      await aiPitchAt(t, 0, 2.5);
      await t.game('act', 'swingAt', -1.0, { dx: 0, dz: 0 });
      s = await toResult(t);
      t.expect(s.game.result.spray != null && Math.sign(s.game.result.spray) === -side, `early swing pulls (spray ${s.game.result.spray && s.game.result.spray.toFixed(1)}, bats ${s.game.batter.bats})`);
      await toPre(t);
      await t.game('setState', { game: { balls: 0, strikes: 0 } });
      await aiPitchAt(t, 0, 2.5);
      await t.game('act', 'swingAt', 1.0, { dx: 0, dz: 0 });
      s = await toResult(t);
      t.expect(s.game.result.spray != null && Math.sign(s.game.result.spray) === side, `late swing goes the other way (spray ${s.game.result.spray && s.game.result.spray.toFixed(1)})`);
      await toPre(t);
      // a foul with fewer than two strikes is a strike; with two it isn't
      await t.game('setState', { game: { balls: 0, strikes: 1, outs: 0 } });
      await t.game('act', 'contact', { ev: 70, la: 25, spray: 62 });
      await aiPitchAt(t, 0, 2.5);
      s = await toResult(t);
      await t.game('step', 30);
      await t.shot('12-foul', { wait: false });
      s = await toPre(t);
      t.equal(s.game.strikes, 2, 'foul with one strike makes two');
      await t.game('act', 'contact', { ev: 70, la: 25, spray: -62 });
      await aiPitchAt(t, 0, 2.5);
      s = await toPre(t);
      t.equal(s.game.strikes, 2, 'foul with two strikes leaves the count');
      t.equal(s.game.outs, 0, 'and is not an out');
    },
  },
  {
    name: 'duel: aim mode',
    async run(t) {
      await t.game('setState', { settings: { aim: 'aim' } });
      await exhibition(t, { seed: 9 });
      await t.game('act', 'aim', 1.2, 3.4);
      await aiPitchAt(t, -0.6, 1.9);
      await t.game('step', 10);
      await t.shot('13-aim-mode');
      let s = await t.game('act', 'swingAt', 0);
      s = await toResult(t);
      t.equal(s.game.result.kind, 'whiff', 'cursor far from the ball misses even with perfect timing');
      await toPre(t);
      await t.game('act', 'aim', 0.1, 2.6);
      await aiPitchAt(t, 0.1, 2.6);
      await t.game('act', 'swingAt', 0);
      s = await toResult(t);
      t.expect(s.game.result.kind !== 'whiff', `cursor on the ball connects (${s.game.result.kind})`);
      await t.game('setState', { settings: { aim: 'auto' } });
    },
  },
  {
    name: 'duel: bunt and two-strike foul bunt',
    async run(t) {
      await exhibition(t, { seed: 13 });
      await t.page.keyboard.press('b');
      let s = await t.state();
      t.equal(s.game.bunt, true, 'B toggles bunt');
      await t.shot('14-bunt');
      let got = null;
      for (let i = 0; i < 6 && !got; i++) {
        await t.game('act', 'bunt', true);
        await aiPitchAt(t, 0, 2.4);
        await t.game('act', 'swingAt', 0, { dx: 0, dz: 0 });
        s = await toResult(t);
        if (s.game.result.kind === 'inplay') { s = await toPre(t); got = s.game.lastPlay; }
        else { await toPre(t); await t.game('setState', { game: { balls: 0, strikes: 0, outs: 0, bases: [false, false, false] } }); }
      }
      t.expect(got && got.ev < 35, `bunt is a soft ball in play (${got && got.ev} mph, ${got && got.desc})`);
      await t.game('setState', { game: { balls: 0, strikes: 2, outs: 0, bases: [false, false, false] } });
      s = await t.state();
      const outs0 = s.game.outs;
      await t.game('act', 'bunt', true);
      await t.game('act', 'contact', { ev: 25, la: -8, spray: 70, bunt: true });
      await aiPitchAt(t, 0, 2.4);
      await t.game('act', 'swingAt', 0, { dx: 0, dz: 0 });
      s = await toPre(t);
      t.equal(s.game.outs, outs0 + 1, 'foul bunt with two strikes is a strikeout');
      t.expect(s.game.log.some((l) => /Foul bunt/.test(l)), 'announced as a foul-bunt strikeout');
    },
  },
  {
    name: 'duel: pitch types by key and by button',
    async run(t) {
      await exhibition(t, { user: 'home', seed: 3 });
      let s = await t.state();
      t.equal(s.game.userPitches, true, 'the user pitches');
      const reps = s.game.pitcher.reps;
      t.expect(reps.length >= 3 && reps[0] === 'FB', `starter has a fastball and more (${reps.join(',')})`);
      await t.page.keyboard.press('2');
      s = await t.state();
      t.equal(s.game.sel, 1, 'key 2 selects the second pitch');
      await click(t, 'pitchType', 2);
      s = await t.state();
      t.equal(s.game.sel, 2, 'button selects the third pitch');
      await t.game('act', 'aim', 0.4, 2.0);
      await t.shot('15-pitch-select');
      const seen = {};
      for (const type of reps) {
        await t.game('act', 'throw', { type, x: 0, z: 2.5, acc: 1, exact: true });
        s = await t.state();
        seen[type] = { mph: s.game.pitch.mph, bz: s.game.pitch.bz, bx: s.game.pitch.bx };
        if (type === 'CB' || (type === reps[reps.length - 1] && !reps.includes('CB'))) { await t.game('step', 60); await t.shot('15b-breaking-flight', { wait: false }); }
        await t.game('setState', { game: { phase: 'pre', balls: 0, strikes: 0 } });
      }
      const fb = seen.FB;
      for (const [k, v] of Object.entries(seen)) if (k !== 'FB') t.expect(v.mph < fb.mph, `${k} slower than the fastball (${v.mph} vs ${fb.mph})`);
      if (seen.CB) t.expect(seen.CB.bz < fb.bz - 0.5, 'curveball drops');
      if (seen.SL) t.expect(Math.abs(seen.SL.bx) > Math.abs(fb.bx) + 0.2, 'slider sweeps');
      t.log(JSON.stringify(seen));
    },
  },
  {
    name: 'duel: pitch meter accuracy',
    async run(t) {
      await exhibition(t, { user: 'home', seed: 17 });
      await t.page.keyboard.press(' ');
      let s = await t.state();
      t.expect(!!s.game.meter, 'Space starts the meter');
      await t.game('step', 30);
      await t.shot('16-meter');
      await stepUntil(t, (x) => x.game.meter && x.game.meter.t >= 0.88, 200, 1, 'needle in the gold band');
      await t.page.keyboard.press(' ');
      s = await t.state();
      t.expect(s.game.pitch && s.game.pitch.acc >= 0.9, `second press in the band: accuracy ${s.game.pitch && s.game.pitch.acc}`);
      // statistics: a perfect meter lands closer to the target than a missed one
      const err = async (acc) => {
        let sum = 0;
        for (let i = 0; i < 24; i++) {
          await t.game('setState', { game: { phase: 'pre', balls: 0, strikes: 0 } });
          await t.game('act', 'throw', { type: 'FB', x: 0.3, z: 2.4, acc });
          const p = (await t.state()).game.pitch;
          sum += Math.hypot(p.px - 0.3, p.pz - 2.4);
        }
        return sum / 24;
      };
      const good = await err(1), bad = await err(0.1);
      t.log(`mean miss: perfect meter ${good.toFixed(2)} ft, missed meter ${bad.toFixed(2)} ft`);
      t.expect(good < bad * 0.8, 'meter accuracy tightens location');
    },
  },
];
