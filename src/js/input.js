// Keyboard, mouse and touch → intents. main.js decides what an intent means in the current phase.
const KEYS = {
  ' ': 'primary', Enter: 'primary', ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down',
  '1': 'p0', '2': 'p1', '3': 'p2', '4': 'p3', b: 'bunt', s: 'steal', f: 'skip', p: 'pause', Escape: 'escape',
};
export const I = { held: new Set(), handlers: null, dragging: false };

export function initInput(cv, h) {
  I.handlers = h;
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = KEYS[e.key] || KEYS[e.key.toLowerCase && e.key.toLowerCase()];
    if (!k) return;
    const consumed = h.key(k, e);
    if (consumed) e.preventDefault();
    if (['left', 'right', 'up', 'down'].includes(k)) I.held.add(k);
  });
  window.addEventListener('keyup', (e) => { const k = KEYS[e.key] || KEYS[e.key.toLowerCase && e.key.toLowerCase()]; if (k) I.held.delete(k); });
  window.addEventListener('blur', () => I.held.clear());
  const pos = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  cv.addEventListener('pointerdown', (e) => {
    I.dragging = true;
    try { cv.setPointerCapture(e.pointerId); } catch (err) { /* synthetic events */ }
    h.aimAt(...pos(e), e.pointerType);
    if (e.pointerType === 'mouse' && e.button === 0) h.key('primary', e);
  });
  cv.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || I.dragging) h.aimAt(...pos(e), e.pointerType); });
  const up = () => { I.dragging = false; };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
}

// Arrow-key aim: continuous while held (called each tick)
export function heldAim() {
  let dx = 0, dz = 0;
  if (I.held.has('left')) dx -= 1; if (I.held.has('right')) dx += 1;
  if (I.held.has('up')) dz += 1; if (I.held.has('down')) dz -= 1;
  return [dx, dz];
}
