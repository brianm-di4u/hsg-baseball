import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { click } from './helpers.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const facts = JSON.parse(fs.readFileSync(path.join(here, '../data/facts.json'), 'utf8')).facts;
const bank = JSON.parse(fs.readFileSync(path.join(root, 'shared/data/trivia-questions.json'), 'utf8')).questions;
const schools = JSON.parse(fs.readFileSync(path.join(root, 'shared/data/schools.json'), 'utf8')).schools;
// Names that must never appear as players or playable teams (kept here, not in game data).
const BANNED_TEAMS = ['Red Sox', 'Cubs', 'White Stockings', 'Pirates', 'Dodgers', 'Tigers', 'Yankees', 'Reds', 'Browns', 'Cardinals', 'Spiders', 'Crawfords', 'Grays', 'Monarchs', 'Clowns', 'Bathers', 'Vapors', 'White Sox', 'Athletics'];
const BANNED_PLAYERS = ['Ruth', 'Wagner', 'Aaron', 'Robinson', 'Anson', 'Spalding', 'Speaker', 'Dickey', 'Hornsby', 'Didrikson', 'Cobb', 'Paige', 'Simmons', 'Ott', 'Dean', 'Musial', 'Grove', 'Wood', 'Tugerson', 'McGraw', 'Crawford', 'Johnson', 'Young', 'Ewing', 'Clinton', 'McDill', 'McMahan'];

export const tests = [
  {
    name: 'content: every fact is audited and sourced',
    viewports: ['desktop'],
    async run(t) {
      for (const f of facts) {
        const q = bank.find((x) => x.id === f.id);
        t.expect(q && q.confidence === 'confirmed' && q.source === f.source, `${f.id} confirmed with matching source`);
      }
      const ids = facts.map((f) => f.id);
      t.expect(ids.includes('hs-0184') && ids.includes('hs-0336'), 'the 573-ft card and its caveat are both present');
      t.expect(!facts.some((f) => /birthplace/i.test(f.text) && !/called|known/i.test(f.text)), '"birthplace" is always hedged');
      t.expect(!ids.includes('hs-0480'), 'the unconfirmed "Birthplace of Spring Baseball" claim is not shown');
      await click(t, 'album');
      const txt = await t.page.textContent('#screen');
      t.expect(/Tugerson/.test(txt), 'the 1953 history card is in the album (never playable)');
      await t.shot('46-album', { fullPage: true });
      await t.checkLayout({ allowScrollY: true });
    },
  },
  {
    name: 'content: schools from shared data, fictional players',
    async run(t) {
      await click(t, 'select');
      const txt = await t.page.textContent('#screen');
      for (const s of schools) {
        t.expect(txt.includes(s.short) && txt.includes(s.mascot), `${s.short} ${s.mascot} listed`);
        t.expect(txt.includes(`${s.mascot} · ${s.classification.baseball}`), `${s.short} shows Class ${s.classification.baseball}`);
      }
      await t.shot('47-teams');
      // every team's roster: no real names, and no real club names as playable teams
      const keys = [...schools.map((s) => s.id), 'cinderbrook', 'ironleaf', 'steam-valley', 'barnstormers'];
      for (let i = 0; i < keys.length; i += 2) {
        await t.game('newGame', { mode: keys[i].includes('steam') ? 'spring' : 'exhibition', home: keys[i], away: keys[i + 1] || 'bluemist', paused: true, seed: 3 });
        const s = await t.state();
        for (const tm of s.game.teams) {
          t.expect(!BANNED_TEAMS.some((b) => tm.name.includes(b)), `${tm.name} is not a real club`);
          for (const p of tm.players) t.expect(!BANNED_PLAYERS.some((b) => p.split(' ').includes(b)), `${p} is not a real player name`);
          if (!tm.fictional) t.equal(tm.cls, schools.find((x) => x.id === tm.key).classification.baseball, `${tm.key} baseball class`);
        }
      }
    },
  },
];
