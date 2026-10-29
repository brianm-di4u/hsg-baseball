// DOM screens as HTML strings. main.js owns state and handles `data-act` clicks.
import { COUNTY, FICTIONAL, CLUBS, team, FACTS_LIST, FINALS, rivalry, fact } from './data.js';
import { crestURL } from './art.js';
import { fullName } from './roster.js';
import { ROUNDS, nextGame, standings } from './season.js';
import { CHALLENGES } from './challenges.js';
import { PARKS } from './park.js';
import { PITCHES } from './pitch.js';
import { topPerformer } from './game.js';

export const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const crest = (t, px = 48, cls = 'crest') => `<img class="${cls}" src="${crestURL(t, px * 2)}" width="${px}" height="${px}" alt="">`;
export const btn = (act, label, o = {}) => `<button class="btn ${o.cls || ''}" data-act="${act}"${o.arg != null ? ` data-arg="${esc(o.arg)}"` : ''}${o.pressed != null ? ` aria-pressed="${o.pressed}"` : ''}${o.disabled ? ' disabled' : ''}${o.label ? ` aria-label="${esc(o.label)}"` : ''}>${label}</button>`;
const seg = (act, opts, cur, label) => `<div class="seg" role="group" aria-label="${esc(label)}"><span class="seg-l">${esc(label)}</span>${opts.map(([v, t]) => btn(act, esc(t), { arg: v, pressed: String(v) === String(cur), cls: 'seg-b' })).join('')}</div>`;
const stars = (n) => `<span class="stars" role="img" aria-label="${n} of 3 stars">${'★'.repeat(n)}<span class="dim">${'☆'.repeat(3 - n)}</span></span>`;

export const FICTION_NOTE = 'All players are fictional. Real Garland County schools appear as setting only; not affiliated with or endorsed by any school or the Arkansas Activities Association.';
const DIFFS = [['rookie', 'Rookie'], ['varsity', 'Varsity'], ['allstate', 'All-State']];
const INNS = [[3, '3 innings'], [5, '5 innings'], [7, '7 (regulation)']];

export function teamCard(t, act, sel) {
  const tag = t.club ? '<span class="tag">fictional club</span>' : t.fictional ? '<span class="tag">fictional town</span>' : !t.colorsConfirmed ? '<span class="tag">game colors</span>' : '';
  const colors = t.colorNames ? t.colorNames.join(' & ') : t.club ? 'cream wool' : 'fictional colors';
  return `<button class="tcard${sel ? ' sel' : ''}" data-act="${act}" data-arg="${t.key}" aria-pressed="${sel}" style="--tc:${t.colors.primary};--tc2:${t.colors.secondary}">
    ${crest(t, 44)}<span class="tc-txt"><b>${esc(t.short)}</b><span>${esc(t.mascot)}${t.cls ? ` · ${t.cls}` : ''}</span><span class="tc-col"><i style="background:${t.colors.primary}"></i><i style="background:${t.colors.secondary}"></i>${esc(colors)}</span>${tag}</span></button>`;
}
const grid = (act, sel, label, list = COUNTY) => `<div class="tgrid" role="group" aria-label="${esc(label)}">${list.map((t) => teamCard(t, act, t.key === sel)).join('')}</div>`;

// ---------------------------------------------------------------- title
export function titleScreen(st) {
  const S = st.season, has = S && !S.done;
  return `<div class="panel title-panel">
    <h1 class="logo"><span class="l1">DIAMOND</span><span class="l2">SPRINGS</span></h1>
    <p class="sub">High school baseball in Garland County, Arkansas</p>
    <nav class="menu" aria-label="Main menu">
      ${has ? btn('continueSeason', `Continue season <small>${esc(team(S.school).short)} · ${S.w}-${S.l}${S.phase === 'bracket' ? ' · state tournament' : ''}</small>`, { cls: 'primary' }) : ''}
      ${btn('seasonSetup', has ? 'New season' : 'Season', { cls: has ? '' : 'primary' })}
      ${btn('select', 'Exhibition')}
      ${btn('springSetup', 'Spring Training <small>historic-style park, 1900s-style clubs</small>')}
      ${btn('challenges', 'Challenges')}
      ${btn('album', 'Fact Album')}
      <div class="menu-row">${btn('help', 'How to play')}${btn('settings', 'Settings')}</div>
    </nav>
    ${st.save.trophies.length || st.save.records.longest ? `<div class="trophies" aria-label="Trophy case">${st.save.trophies.map((x) => `<span class="trophy">🏆 ${esc(team(x.school).short)} ${esc(x.cls)} champs (${esc(x.record)})</span>`).join('')}${st.save.records.longest ? `<span class="trophy">Longest home run: ${st.save.records.longest} ft</span>` : ''}${st.save.records.splashes ? `<span class="trophy">Gator Splashes: ${st.save.records.splashes}</span>` : ''}</div>` : ''}
    <p class="fine">${FICTION_NOTE}</p>
  </div>`;
}

// ---------------------------------------------------------------- exhibition
export function selectScreen(st) {
  const x = st.pick, rv = rivalry(x.home, x.away);
  return `<div class="panel wide">
    <h2>Exhibition</h2>
    <h3>Home team</h3>${grid('pickHome', x.home, 'Home team')}
    <details${team(x.home).fictional ? ' open' : ''}><summary>Fictional towns</summary>${grid('pickHome', x.home, 'Home team, fictional towns', FICTIONAL)}</details>
    <h3>Away team</h3>${grid('pickAway', x.away, 'Away team')}
    <details${team(x.away).fictional ? ' open' : ''}><summary>Fictional towns</summary>${grid('pickAway', x.away, 'Away team, fictional towns', FICTIONAL)}</details>
    ${x.home === x.away ? '<p class="warn" role="alert">Pick two different teams.</p>' : ''}
    ${rv ? `<p class="card fact"><b>${esc(rv.label)}</b> (from the shared school data)</p>` : ''}
    ${seg('pickSide', [['home', `Home (${team(x.home).short})`], ['away', `Away (${team(x.away).short})`], ['none', 'Watch']], x.side, 'You play')}
    ${seg('pickPark', [['home', `${team(x.home).short} home field`], ['majestic', 'Majestic Park'], ['historic', 'Historic-style park']], x.park, 'Park')}
    ${seg('setInnings', INNS, st.settings.innings, 'Innings')}
    ${seg('setDiff', DIFFS, st.settings.difficulty, 'Difficulty')}
    <div class="row end">${btn('title', 'Back')}${btn('startExhibition', 'Play ball', { cls: 'primary', disabled: x.home === x.away })}</div>
  </div>`;
}

export function springScreen(st) {
  const x = st.pick;
  return `<div class="panel wide linen">
    <p class="kicker">Spring Training</p>
    <h2>An exhibition at a historic-style park</h2>
    <p>Hot Springs is known as the birthplace of spring training: in 1886 the Chicago White Stockings came to train here, and big-league clubs followed for decades. This mode is a <b>game recreation</b>: two <b>fictional barnstorming clubs</b> in cream wool play at a park drawn after Whittington Park (opened 1894), with its listed fences of 340 ft to left, 400 ft to center and 260 ft to right, and the alligator farm across the street. Clear the right-field fence for a <b>Gator Splash</b>.</p>
    <p class="src">Facts: Wikipedia: Hot Springs, Arkansas; Wikipedia: Ban Johnson Park (audited trivia bank hs-0188, hs-0196, hs-0197). A fact card follows every inning.</p>
    <h3>Your club</h3>${grid('pickClub', x.club, 'Your club', CLUBS)}
    ${seg('setSpringInn', [[3, '3 innings'], [5, '5 innings'], [7, '7 innings']], st.settings.springInnings, 'Innings')}
    ${seg('setDiff', DIFFS, st.settings.difficulty, 'Difficulty')}
    <div class="row end">${btn('title', 'Back')}${btn('startSpring', 'Play ball', { cls: 'primary' })}</div>
  </div>`;
}

// ---------------------------------------------------------------- season
export function seasonSetupScreen(st) {
  const x = st.pick, t = team(x.school);
  return `<div class="panel wide">
    <h2>New season</h2>
    <p>Pick your school. Play a spring schedule, then the Class ${esc(t.cls)} state bracket: quarterfinal at the higher seed's field, semifinal at Lakeside High School and the final at ${esc(FINALS.name)}, the 2026 state finals sites.</p>
    ${grid('pickSchool', x.school, 'School')}
    ${seg('pickLength', [['short', 'Short: 8 games'], ['full', 'Full: 14 games']], x.length, 'Regular season')}
    ${seg('setInnings', INNS, st.settings.innings, 'Innings')}
    ${seg('setDiff', DIFFS, st.settings.difficulty, 'Difficulty')}
    ${st.season && !st.season.done ? '<p class="warn">Starting a new season replaces the season in progress.</p>' : ''}
    <div class="row end">${btn('title', 'Back')}${btn('startSeason', 'Start season', { cls: 'primary' })}</div>
  </div>`;
}

export function hubScreen(st) {
  const S = st.season, me = team(S.school), g = nextGame(S);
  const sched = S.games.map((x, i) => {
    const o = team(x.opp);
    const res = x.played ? `<b class="${x.us > x.them ? 'w' : 'l'}">${x.us > x.them ? 'W' : 'L'} ${x.us}-${x.them}</b>` : (g === x ? '<span class="tag ok">next</span>' : '');
    return `<li><span class="sch-when">Game ${i + 1}</span>${crest(o, 24, 'crest sm')}<span class="sch-opp">${x.home ? 'vs' : 'at'} ${esc(o.short)}${o.fictional ? ' <span class="tag">fictional</span>' : ''}</span>${res}</li>`;
  }).join('');
  const table = standings(S).map((r, i) => `<tr${r.k === S.school ? ' class="me"' : ''}><td>${i + 1}</td><td>${esc(team(r.k).short)}</td><td>${r.w}</td><td>${r.l}</td></tr>`).join('');
  let next = '';
  if (g) {
    const o = team(g.opp);
    const site = S.phase === 'bracket' ? g.site : g.home ? `${me.short} home field` : `${o.short} ${o.fictional ? 'field' : 'home field'}`;
    next = `<div class="card next"><p class="kicker">${S.phase === 'bracket' ? `State tournament · ${ROUNDS[S.bracket.round]}` : `Game ${S.games.indexOf(g) + 1} of ${S.games.length}`}</p>
      <div class="vs">${crest(me, 40)} ${esc(me.short)} <span>${g.home ? 'vs' : 'at'}</span> ${crest(o, 40)} ${esc(o.short)}</div>
      <p class="fine">${esc(site)}${rivalry(S.school, g.opp) ? ` · ${esc(rivalry(S.school, g.opp).label)}` : ''}</p>
      <div class="row">${btn('playSeason', 'Play game', { cls: 'primary' })}${btn('simSeason', 'Sim game')}${S.phase === 'regular' ? btn('simToBracket', 'Sim to the bracket') : ''}${S.bracket ? btn('bracket', 'Bracket') : ''}</div></div>`;
  } else {
    next = `<div class="card ${S.champion ? 'ok' : 'bad'}"><p class="big">${S.champion ? `${esc(me.short)} won the Class ${esc(S.cls)} state title!` : `Season over: ${S.w}-${S.l}.`}</p><div class="row">${S.bracket ? btn('bracket', 'Bracket') : ''}${btn('seasonSetup', 'New season', { cls: 'primary' })}</div></div>`;
  }
  return `<div class="panel wide">
    <div class="hub-h">${crest(me, 52)}<div><h2>${esc(me.name)}</h2><p class="fine">${esc(me.mascot)} · Class ${esc(me.cls)} · ${S.w}-${S.l}${me.colorsConfirmed ? '' : ' · game colors'}</p></div></div>
    ${next}
    <p class="fine">State tournament (game format): 8-team Class ${esc(me.cls)} bracket; semifinals at Lakeside High School, final at ${esc(FINALS.name)}.</p>
    <div class="cols"><div><h3>Schedule</h3><ul class="sched">${sched}</ul></div>
    <div><h3>Standings (game league)</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>Team</th><th>W</th><th>L</th></tr></thead><tbody>${table}</tbody></table></div></div></div>
    <div class="row end">${btn('title', 'Main menu')}</div>
  </div>`;
}

export function bracketScreen(st) {
  const S = st.season, B = S.bracket;
  if (!B) return `<div class="panel"><p>The bracket starts after the regular season.</p>${btn('hub', 'Back')}</div>`;
  const col = (r) => {
    const pairs = B.rounds[r] || [];
    const w = (B.winners || [])[r] || [];
    return `<div class="bcol"><h3>${ROUNDS[r]}</h3><p class="fine">${r === 0 ? 'higher seed hosts' : r === 1 ? 'Lakeside High School' : esc(FINALS.name)}</p>${pairs.map((p, i) => `<div class="bgame">${p.map((k) => `<div class="bline${k === S.school ? ' me' : ''}${w[i] === k ? ' won' : ''}">${crest(team(k), 20, 'crest sm')}<span>${B.seeds.indexOf(k) + 1}. ${esc(team(k).short)}</span></div>`).join('')}</div>`).join('') || '<p class="fine">TBD</p>'}</div>`;
  };
  return `<div class="panel wide"><h2>Class ${esc(S.cls)} state tournament</h2>
    <p class="fine">Bracket and seeds are a game format. ${esc(FINALS.name)}: ${esc(FINALS.facts[0])} ${esc(FINALS.facts[1])}</p>
    <div class="bracket">${col(0)}${col(1)}${col(2)}</div>
    <div class="row end">${btn('hub', 'Back to season', { cls: 'primary' })}</div></div>`;
}

// ---------------------------------------------------------------- challenges
export function challengesScreen(st) {
  const cards = CHALLENGES.map((c) => {
    const n = st.save.stars[c.id] || 0;
    const f = c.fact && fact(c.fact);
    return `<div class="card chal${n ? ' done' : ''}"><header><h3>${esc(c.title)}</h3>${stars(n)}</header><p>${esc(c.goal)}</p>${f ? `<p class="fact-line">${esc(f.text)} <span class="src">Source: ${esc(f.source)}</span></p>` : ''}${btn('chal', 'Play', { arg: c.id, cls: 'primary', label: `Play ${c.title}` })}</div>`;
  }).join('');
  const total = Object.values(st.save.stars).reduce((a, b) => a + b, 0);
  return `<div class="panel wide"><h2>Challenges</h2><p class="fine">${total} of ${CHALLENGES.length * 3} stars. Goals and stars are game design.</p><div class="clist">${cards}</div><div class="row end">${btn('title', 'Back')}</div></div>`;
}
export function chalIntro(st, c) {
  const f = c.fact && fact(c.fact);
  return `<div class="panel"><p class="kicker">Challenge</p><h2>${esc(c.title)}</h2><p class="big">${esc(c.goal)}</p>${c.tip ? `<p>${esc(c.tip)}</p>` : ''}
    ${f ? `<div class="card fact"><p class="kicker">${esc(f.tag)}</p><p>${esc(f.text)}</p><p class="src">Source: ${esc(f.source)}</p></div>` : ''}
    <div class="row end">${btn('challenges', 'Back')}${btn('chalGo', 'Start', { cls: 'primary' })}</div></div>`;
}
export function chalResult(st) {
  const r = st.chalResult, c = r.c;
  return `<div class="panel" role="dialog" aria-label="Challenge result"><p class="kicker">${esc(c.title)}</p><h2>${r.stars ? 'Challenge complete' : 'Not this time'}</h2>
    <p class="huge">${stars(r.stars)}</p><p class="big">${esc(r.text)}</p>${r.best ? `<p class="fine">Best: ${stars(r.best)}</p>` : ''}
    <div class="row end">${btn('challenges', 'Challenges')}${btn('chal', 'Try again', { arg: c.id, cls: 'primary' })}</div></div>`;
}

// ---------------------------------------------------------------- album
export function albumScreen(st) {
  const seen = new Set(st.save.album);
  const items = FACTS_LIST.map((f) => {
    const has = seen.has(f.id) || f.album === 'history';
    return has ? `<li class="card fact"><p class="kicker">${esc(f.tag)}</p><p>${esc(f.text)}</p><p class="src">Source: ${esc(f.source)} · audited bank ${esc(f.id)}</p></li>` : `<li class="card locked"><p class="kicker">${esc(f.tag)}</p><p class="fine">Not found yet. Fact cards appear between innings.</p></li>`;
  }).join('');
  const n = FACTS_LIST.filter((f) => seen.has(f.id) || f.album === 'history').length;
  return `<div class="panel wide"><h2>Fact Album</h2><p class="fine">${n} of ${FACTS_LIST.length} cards. Every card restates an audited, confirmed question from the collection's trivia bank and shows its source.</p><ul class="album">${items}</ul><div class="row end">${btn('title', 'Back')}</div></div>`;
}

// ---------------------------------------------------------------- help
export function helpScreen(st) {
  const tab = st.helpTab;
  const tabs = [['controls', 'Controls'], ['play', 'Batting & Pitching'], ['rules', 'Rules'], ['about', 'About']];
  let body = '';
  if (tab === 'controls') body = `<table class="tbl keys"><tbody>
    <tr><td><kbd>Space</kbd> / <kbd>Enter</kbd> / click</td><td>Swing · start and stop the pitch meter · skip ahead</td></tr>
    <tr><td><kbd>Arrow keys</kbd> / mouse / drag</td><td>Move the pitch target, or the bat cursor in Aim mode</td></tr>
    <tr><td><kbd>1</kbd>–<kbd>4</kbd></td><td>Choose a pitch (fastball, then your pitcher's others)</td></tr>
    <tr><td><kbd>B</kbd></td><td>Bunt on or off (before the pitch)</td></tr>
    <tr><td><kbd>S</kbd></td><td>Send the runner (steal) before the pitch</td></tr>
    <tr><td><kbd>F</kbd></td><td>Fast-forward a play</td></tr>
    <tr><td><kbd>R</kbd></td><td>Replay the last ball in play (also in the pause menu)</td></tr>
    <tr><td><kbd>P</kbd> / <kbd>Esc</kbd></td><td>Pause</td></tr></tbody></table>
    <p><b>Touch:</b> the pad under the field has SWING, BUNT and STEAL when you bat, and the pitch buttons plus PITCH when you pitch. Drag on the field to move the target or cursor.</p>`;
  else if (tab === 'play') body = `<h3>Batting</h3><p>Watch the pitcher's arm. Press <b>SWING</b> as the ball reaches the front of the plate. The game grades every swing: <b>PERFECT</b>, <b>GOOD</b>, <b>EARLY</b> or <b>LATE</b>. Early swings pull the ball, late swings go the other way, mistimed swings foul off or miss. Taking a pitch outside the zone is a ball.</p>
    <p><b>Auto aim</b> (default) lines the bat up for you; chasing pitches far off the plate still misses. <b>Aim + timing</b> (Settings) lets you place the bat cursor: a ball above the cursor flies, below it rolls on the ground.</p>
    <p>Turn on <b>Bunt</b> to square around for a short roller. Press <b>Steal</b> to send the runner with the next pitch.</p>
    <h3>Pitching</h3><p>Pick a pitch, move the target, then press <b>PITCH</b> twice: once to start the meter, again inside the gold band. A good meter throws close to the target with a little extra on it; a missed meter sprays the pitch. Mix speeds: a changeup after fastballs fools hitters. Pitchers tire; the coach goes to the bullpen.</p>
    <h3>In play</h3><p>Fielders, throws and runners play out on the field view. Runners take extra bases when they can beat the throw (Settings: aggression).</p>`;
  else if (tab === 'rules') body = `<p>These are <b>the game's rules</b>, modeled on high-school baseball. Seven innings is a common high-school default and is the game's regulation length; 3 and 5 are options.</p><ul class="plain bullets">
    <li>Three outs a half-inning. The home team bats last and skips the bottom of the last inning when ahead. Ties go to extra innings.</li>
    <li>Four balls is a walk; three strikes is a strikeout. A foul is a strike until two strikes. A foul bunt with two strikes is a strikeout. A pitch that hits the batter awards first base.</li>
    <li>The strike zone is over the plate from the knees to the letters.</li>
    <li>A ball over the fence in fair territory is a home run; one that bounces over is a ground-rule double. Any ball caught in the air is an out.</li>
    <li>Force outs, tag outs and double plays. Runners must tag up on a caught fly; with two outs they run on contact.</li>
    <li>Infield fly: a pop-up in the infield with runners on first and second and fewer than two outs is an automatic out.</li>
    <li>No run scores on a play that ends with a force out (or the batter out before first) for the third out.</li>
    <li>Walk-off: the game ends as soon as the home team takes the lead in the last inning or later.</li>
    <li>Run rule (setting): a 10-run lead ends the game after five innings (after three in a 5-inning game).</li>
    <li>Designated hitter: pitchers don't bat. Pitcher fatigue and bullpen changes are a game system, not a pitch-count rule.</li></ul>`;
  else body = `<p>Diamond Springs is part of the open-source <b>Hot Springs Games</b> collection (MIT license). It uses no network, no trackers and no external assets: the art is drawn in code and the sound is synthesized.</p>
    <ul class="plain bullets">
    <li><b>Schools</b>: Hot Springs, Lakeside, Lake Hamilton, Fountain Lake, Cutter-Morning Star, Jessieville and Mountain Pine appear as setting only, with names, colors, mascot ideas and baseball classifications from the collection's shared school data. Mascots are original shapes drawn in code, not logos.</li>
    <li><b>Game colors</b>: colors for Fountain Lake, Cutter-Morning Star, Jessieville and Mountain Pine were not confirmed and are game choices.</li>
    <li><b>Fields</b>: no school's baseball field name was confirmed, so the game says "home field". Park dimensions are game values, except the historic-style park's 340/400/260 ft from Whittington Park.</li>
    <li><b>Players</b>: every player is fictional, with generated names. Extra opponents are <b>fictional towns</b>; the Spring Training clubs are fictional too. No real team is playable.</li>
    <li><b>Finals</b>: the 2026 state baseball finals were at Majestic Park and Lakeside High School (shared school data, KAIT8). No baseball state titles are known for the county's schools, so the game shows none.</li>
    <li><b>Facts</b>: every fact card comes from the collection's audited trivia bank and shows its source. The 573-foot figure for the 1918 home run is an estimate measured in 2011 and can't be confirmed with complete certainty.</li></ul>
    <p class="fine">${FICTION_NOTE}</p>`;
  return `<div class="panel wide"><h2>How to play</h2>
    <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button class="tab" role="tab" aria-selected="${k === tab}" data-act="helpTab" data-arg="${k}">${l}</button>`).join('')}</div>
    <div role="tabpanel">${body}</div><div class="row end">${btn('back', 'Back', { cls: 'primary' })}</div></div>`;
}

// ---------------------------------------------------------------- settings
export function settingsScreen(st) {
  const s = st.settings;
  return `<div class="panel wide"><h2>Settings</h2>
    ${seg('setSound', [[1, 'On'], [0, 'Off']], s.sound ? 1 : 0, 'Sound')}
    ${seg('setVol', [[0.25, 'Quiet'], [0.5, 'Medium'], [0.85, 'Loud']], s.vol, 'Volume')}
    ${seg('setMotion', [['auto', 'Follow system'], ['on', 'Reduced'], ['off', 'Full']], s.motion, 'Reduce motion')}
    ${seg('setGfx', [['3d', '3D ballpark'], ['2d', 'Classic 2D']], s.gfx || '3d', 'Graphics')}
    ${seg('setTheme', [['auto', 'Follow system'], ['light', 'Day'], ['dark', 'Night']], s.theme, 'Theme')}
    ${seg('setText', [[100, '100%'], [115, '115%'], [130, '130%'], [150, '150%']], s.text, 'Text size')}
    ${seg('setDiff', DIFFS, s.difficulty, 'Difficulty')}
    ${seg('setAim', [['auto', 'Auto aim'], ['aim', 'Aim + timing']], s.aim, 'Batting')}
    ${seg('setSpeed', [['relaxed', 'Relaxed'], ['normal', 'Normal'], ['real', 'Real']], s.pitchSpeed, 'Pitch speed')}
    ${seg('setInnings', INNS, s.innings, 'Innings')}
    ${seg('setRunRule', [[1, 'On'], [0, 'Off']], s.runRule ? 1 : 0, 'Run rule')}
    ${seg('setAggr', [['safe', 'Safe'], ['normal', 'Normal'], ['aggressive', 'Aggressive']], s.aggr, 'Baserunning')}
    ${seg('setZone', [[1, 'Show'], [0, 'Hide']], s.zone ? 1 : 0, 'Strike zone')}
    ${seg('setRing', [[1, 'On'], [0, 'Off']], s.ring ? 1 : 0, 'Timing ring')}
    ${seg('setMeter', [[0, 'Manual'], [1, 'Auto']], s.autoMeter ? 1 : 0, 'Pitch meter')}
    ${seg('setFacts', [[1, 'On'], [0, 'Off']], s.facts ? 1 : 0, 'Fact cards')}
    <p class="fine">${st.storageOk ? 'Settings, seasons and stars are saved in this browser.' : 'Saving is unavailable in this browser (private mode?). The game still plays; progress lasts until you close the tab.'}</p>
    <div class="row end">${btn('back', 'Done', { cls: 'primary' })}</div></div>`;
}

// ---------------------------------------------------------------- in-game panels
export function lineScore(g) {
  const n = Math.max(g.rules.innings, g.inning);
  const head = Array.from({ length: n }, (_, i) => `<th>${i + 1}</th>`).join('');
  const done = (T) => (T.side === 1 ? (g.half === 0 ? g.inning - 1 : g.inning) : (g.half === 1 && g.over ? g.inning : g.inning - 1));
  const batting = (T) => !g.over && (g.half === 0 ? T.side === 1 : T.side === 0);
  const cell = (T, i) => (i < done(T) || (batting(T) && i === g.inning - 1 && g.phase !== 'pre') || T.line[i] ? T.line[i] || 0 : (g.over && i === g.inning - 1 && T.side === 0 && g.half === 0 ? 'X' : ''));
  const row = (T) => `<tr><th scope="row">${crest(T.team, 20, 'crest sm')} ${esc(T.team.abbr)}</th>${Array.from({ length: n }, (_, i) => `<td>${cell(T, i)}</td>`).join('')}<td class="tot">${T.score}</td><td class="tot">${T.hits}</td><td class="tot">${T.errors}</td></tr>`;
  return `<div class="tbl-wrap"><table class="tbl line"><thead><tr><th></th>${head}<th>R</th><th>H</th><th>E</th></tr></thead><tbody>${row(g.teams[1])}${row(g.teams[0])}</tbody></table></div>`;
}
export function factCard(f) {
  if (!f) return '';
  return `<div class="card fact"><p class="kicker">Hot Springs baseball · ${esc(f.tag)}</p><p>${esc(f.text)}</p><p class="src">Source: ${esc(f.source)}</p></div>`;
}
export function breakScreen(st) {
  const g = st.game;
  return `<div class="panel" role="dialog" aria-label="Between innings"><p class="kicker">End of the ${ordinal(g.inning - 1)}</p>
    <h2>${esc(g.teams[1].team.short)} ${g.teams[1].score}, ${esc(g.teams[0].team.short)} ${g.teams[0].score}</h2>${lineScore(g)}${factCard(st.breakFact)}
    <div class="row end">${btn('pause', 'Menu')}${btn('continue', 'Continue', { cls: 'primary' })}</div></div>`;
}
export function pauseScreen(st) {
  const g = st.game;
  return `<div class="panel" role="dialog" aria-label="Paused"><h2>Paused</h2>${lineScore(g)}<p class="fine">${esc(g.log.slice(-1)[0] || '')}</p>
    <div class="menu">${btn('resume', 'Resume', { cls: 'primary' })}${st.lastReplay ? btn('replay', 'Watch the replay') : ''}${btn('box', 'Box score')}${btn('settings', 'Settings')}${btn('help', 'How to play')}${btn('quit', 'Quit game')}</div></div>`;
}
export const ordinal = (n) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`;

export function boxScore(g) {
  const side = (T) => `<table class="tbl"><caption>${esc(T.team.short)}</caption><thead><tr><th>Batter</th><th>AB</th><th>R</th><th>H</th><th>RBI</th><th>BB</th><th>K</th><th class="opt">HR</th></tr></thead><tbody>
    ${T.lineup.map((i) => { const p = T.roster[i], s = T.bat[p.id]; return `<tr><td>${esc(p.pos)} ${esc(fullName(p))}</td><td>${s.ab}</td><td>${s.r}</td><td>${s.h}</td><td>${s.rbi}</td><td>${s.bb}</td><td>${s.k}</td><td class="opt">${s.hr}</td></tr>`; }).join('')}</tbody></table>
    <table class="tbl"><thead><tr><th>Pitcher</th><th>IP</th><th>H</th><th>R</th><th>BB</th><th>K</th><th>PC</th></tr></thead><tbody>
    ${T.used.map((i) => { const p = T.roster[i], s = T.pit[p.id]; return `<tr><td>${esc(fullName(p))}</td><td>${Math.floor(s.outs / 3)}.${s.outs % 3}</td><td>${s.h}</td><td>${s.r}</td><td>${s.bb}</td><td>${s.k}</td><td>${s.pc}</td></tr>`; }).join('')}</tbody></table>`;
  return `<div class="box">${side(g.teams[1])}${side(g.teams[0])}</div>`;
}

export function finalScreen(st) {
  const g = st.game, w = g.teams[g.winner], l = g.teams[1 - g.winner];
  const ut = g.user;
  const youWon = ut >= 0 && g.winner === ut;
  const tp = topPerformer(g, g.winner), tl = topPerformer(g, 1 - g.winner);
  const line = (x) => (x ? `${esc(fullName(x.p))} (${esc(x.p.pos)}, ${x.p.grade}th grade): ${x.s.h}-for-${x.s.ab}${x.s.hr ? `, ${x.s.hr} HR` : ''}${x.s.rbi ? `, ${x.s.rbi} RBI` : ''}${x.s.bb ? `, ${x.s.bb} BB` : ''}` : '');
  return `<div class="panel${st.showBox ? ' wide' : ''}" role="dialog" aria-label="Final score"><p class="kicker">Final${g.inning > g.rules.innings ? ` · ${g.inning} innings` : ''}${g.runRuled ? ' · run rule' : ''}${g.walkoff ? ' · walk-off' : ''}</p>
    <h2>${ut < 0 ? `${esc(w.team.short)} win` : youWon ? 'You win!' : `${esc(w.team.short)} win`}</h2>
    <div class="final-score"><span>${crest(g.teams[1].team, 44)}${esc(g.teams[1].team.abbr)}<em>${g.teams[1].score}</em></span><span>${crest(g.teams[0].team, 44)}${esc(g.teams[0].team.abbr)}<em>${g.teams[0].score}</em></span></div>
    ${lineScore(g)}
    <ul class="plain kv"><li><b>Star of the game (${esc(w.team.short)}):</b> ${line(tp)}</li><li><b>${esc(l.team.short)}:</b> ${line(tl)}</li>${g.longest ? `<li><b>Longest home run:</b> ${g.longest} ft</li>` : ''}${g.gator ? `<li><b>Gator Splashes:</b> ${g.gator}</li>` : ''}</ul>
    ${st.showBox ? boxScore(g) : ''}
    <div class="row end">${btn('box', st.showBox ? 'Hide box score' : 'Box score')}${st.mode === 'season' ? btn('afterSeasonGame', 'Continue', { cls: 'primary' }) : `${btn('title', 'Main menu')}${btn('rematch', 'Rematch', { cls: 'primary' })}`}</div></div>`;
}

export function championScreen(st) {
  const S = st.season, t = team(S.school);
  return `<div class="panel champ-panel" role="dialog" aria-label="State champions" style="--tc:${t.colors.primary};--tc2:${t.colors.secondary}">
    <div class="pennant">${crest(t, 46)}<span>CLASS ${esc(S.cls)}</span><span>STATE CHAMPS</span></div>
    <h2>${esc(t.short)} ${esc(t.mascot)} win it all</h2><p>Crowned at ${esc(FINALS.name)} (game season). Final record ${S.w}-${S.l}.</p>
    <p class="fine">A trophy was added to your title screen. Real title history is not claimed: no baseball state titles are known for Garland County schools.</p>
    <div class="row end">${btn('hub', 'Season summary')}${btn('title', 'Main menu', { cls: 'primary' })}</div></div>`;
}

// ---------------------------------------------------------------- scoreboard and pad
const dots = (n, max, cls) => `<span class="dots ${cls}" aria-hidden="true">${Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;
export function scoreboard(g, info) {
  const bat = g.half === 0 ? 1 : 0;
  const T = (i) => {
    const t = g.teams[i];
    return `<div class="sb-team${bat === i ? ' bat' : ''}"><img class="crest" src="${crestURL(t.team, 56)}" width="28" height="28" alt=""><span class="sb-name">${esc(t.team.abbr)}</span><span class="sb-score">${t.score}</span></div>`;
  };
  const b = g.bases;
  const diamond = `<svg class="sb-bases" viewBox="0 0 40 30" role="img" aria-label="Runners: ${['first', 'second', 'third'].filter((_, i) => b[i]).join(', ') || 'none'}">
    ${[[29, 15], [20, 6], [11, 15]].map(([x, y], i) => `<rect x="${x - 5}" y="${y - 5}" width="10" height="10" transform="rotate(45 ${x} ${y})" class="${b[i] ? 'on' : ''}"/>`).join('')}</svg>`;
  return `${T(1)}<div class="sb-mid"><span class="sb-inn">${g.half === 0 ? '▲' : '▼'} ${g.inning}</span>${diamond}
    <span class="sb-count"><span>B ${dots(g.balls, 3, 'b')}</span><span>S ${dots(g.strikes, 2, 's')}</span><span>O ${dots(g.outs, 2, 'o')}</span></span>
    <span class="sr-only">${g.balls} balls, ${g.strikes} strikes, ${g.outs} out${g.outs === 1 ? '' : 's'}</span></div>${T(0)}
    <div class="sb-info"><span>P ${esc(info.pitcher)} · ${info.pc} ${info.pcs}</span>${g.pitch && g.phase !== 'pre' ? `<span class="sb-pitch"><abbr title="${esc(PITCHES[g.pitch.type].name)}">${g.pitch.type}</abbr> <b>${Math.round(g.pitch.mph)}</b> mph</span>` : ''}<span>AB ${esc(info.batter)} · ${esc(info.line)}</span></div>`;
}

export function pad(role, g, st) {
  if (role === 'bat') {
    const canSteal = st.canSteal;
    return `<div class="pad-row">
      <button class="pb small${g.bunt ? ' on' : ''}" data-act="bunt" aria-pressed="${g.bunt}" aria-label="Bunt (B)">BUNT<small>B</small></button>
      <button class="pb small${g.stealCall ? ' on' : ''}" data-act="steal" aria-pressed="${g.stealCall}" aria-label="Steal (S)"${canSteal ? '' : ' disabled'}>STEAL<small>S</small></button>
      <button class="pb big" data-act="primary" aria-label="Swing (Space)">SWING<small>SPACE</small></button></div>`;
  }
  if (role === 'pitch') {
    const P = st.pitcher;
    return `<div class="pad-row">${P.reps.map((t, i) => `<button class="pb small${g.sel === i ? ' on' : ''}" data-act="pitchType" data-arg="${i}" aria-pressed="${g.sel === i}" aria-label="${PITCHES[t].name} (${i + 1})">${t}<small>${i + 1}</small></button>`).join('')}
      <button class="pb big" data-act="primary" aria-label="Pitch: press to start the meter, press again to throw (Space)">PITCH<small${g.meter ? ' class="keep"' : ''}>${g.meter ? 'AGAIN' : 'SPACE'}</small></button></div>`;
  }
  if (role === 'ump') return `<div class="pad-row"><button class="pb wide" data-act="ump" data-arg="ball" aria-label="Call ball (B)">BALL<small>B</small></button><button class="pb wide" data-act="ump" data-arg="strike" aria-label="Call strike (S)">STRIKE<small>S</small></button></div>`;
  if (role === 'play') return `<div class="pad-row"><button class="pb small" data-act="skip" aria-label="Fast-forward (F)">▶▶<small>F</small></button></div>`;
  return '<div class="pad-row"><span class="pad-msg">Watching</span><button class="pb small" data-act="skip" aria-label="Fast-forward (F)">▶▶<small>F</small></button></div>';
}

export { PARKS };
