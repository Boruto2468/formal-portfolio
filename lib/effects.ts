/**
 * Pencil cursor + fading sketch canvas + link ink. Framework-independent core.
 * Used directly by the Next.js client component and the static preview.
 * The canvas is the ONLY full-screen drawing surface and never receives pointer events.
 */

export interface EffectController { destroy(): void }

type InkTarget = HTMLElement;
type Point = { x: number; y: number };
type Stroke = { points: Point[]; startedAt: number; endedAt: number | null; color: string };
type Hold = {
  pointerId: number;
  target: InkTarget;
  disk: HTMLSpanElement;
  x: number;
  y: number;
  filled: boolean;
  startX: number;
  startY: number;
  timer: number;
};

const STROKE_LIFETIME = 3000;
const FADE_WINDOW = 750;
const HOLD_DURATION = 1150;
const BLOT_DURATION = 580;
const DARK_SECTIONS = '.work-card-dark, .contact-section';

export function mountEffects(canvas: HTMLCanvasElement): EffectController {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return { destroy() {} };

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(pointer: fine) and (hover: hover)');
  const coarse = window.matchMedia('(pointer: coarse)');
  const root = document.documentElement;
  const timeouts = new Set<number>();
  const nodes = new Set<HTMLElement>();
  const targets = [...document.querySelectorAll<HTMLElement>('a, button, [role="button"]')].filter(el => !el.hasAttribute('disabled'));
  const strokes: Stroke[] = [];
  const holds = new Map<number, Hold>();
  let drawing: Stroke | null = null;
  let activePointer = -1;
  let raf = 0;
  let destroyed = false;
  let dpr = 1;

  const enabled = () => !reduced.matches;
  const canSketch = () => enabled() && fine.matches && !coarse.matches;
  const later = (callback: () => void, delay: number) => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      if (!destroyed) callback();
    }, delay);
    timeouts.add(id);
    return id;
  };
  const cancelLater = (id: number) => {
    window.clearTimeout(id);
    timeouts.delete(id);
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
    canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (strokes.length) requestPaint();
  };

  const paint = (now: number) => {
    raf = 0;
    if (destroyed) return;
    context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    if (!canSketch()) { strokes.length = 0; return; }

    for (let index = strokes.length - 1; index >= 0; index--) {
      const stroke = strokes[index];
      if (stroke.endedAt !== null && now - stroke.endedAt >= STROKE_LIFETIME) {
        strokes.splice(index, 1);
        continue;
      }
      const age = stroke.endedAt === null ? 0 : now - stroke.endedAt;
      const opacity = age <= STROKE_LIFETIME - FADE_WINDOW
        ? 1
        : Math.max(0, (STROKE_LIFETIME - age) / FADE_WINDOW);
      if (!stroke.points.length || opacity <= 0) continue;
      context.save();
      context.globalAlpha = opacity * 0.76;
      context.strokeStyle = stroke.color;
      context.fillStyle = stroke.color;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 1.35;
      const points = stroke.points;
      if (points.length === 1) {
        context.beginPath();
        context.arc(points[0].x, points[0].y, 0.75, 0, 2 * Math.PI);
        context.fill();
      } else {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          context.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
        context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        context.stroke();
      }
      context.restore();
    }
    // Runs only while a stroke is being drawn or while the 3-second fading window is active.
    if (strokes.length) raf = window.requestAnimationFrame(paint);
  };
  const requestPaint = () => {
    if (!raf && canSketch()) raf = window.requestAnimationFrame(paint);
  };
  const endSketch = (event?: PointerEvent) => {
    if (!drawing || (event && event.pointerId !== activePointer)) return;
    drawing.endedAt = performance.now();
    drawing = null;
    activePointer = -1;
    root.classList.remove('is-sketching');
    requestPaint();
  };

  const selectTarget = (node: EventTarget | null): InkTarget | null => {
    if (!(node instanceof Element)) return null;
    const target = node.closest<InkTarget>('a, button, [role="button"]');
    return target && !target.hasAttribute('disabled') ? target : null;
  };
  const ensureInkLayer = (target: InkTarget) => {
    const existing = [...target.children].find(ch => ch.classList.contains('ink-effect-layer'));
    if (existing instanceof HTMLSpanElement) return existing;
    const layer = document.createElement('span');
    layer.className = 'ink-effect-layer';
    layer.setAttribute('aria-hidden', 'true');
    target.appendChild(layer);
    nodes.add(layer);
    return layer;
  };
  const inkColor = (target: InkTarget) => target.closest(DARK_SECTIONS) ? '#c0392b' : '#171615';
  const positionInside = (target: InkTarget, clientX: number, clientY: number) => {
    const box = target.getBoundingClientRect();
    return {
      x: Math.min(box.width, Math.max(0, clientX - box.left)),
      y: Math.min(box.height, Math.max(0, clientY - box.top)),
      width: box.width,
      height: box.height,
    };
  };
  const clearNodeLater = (node: HTMLElement, after: number) => later(() => { node.remove(); nodes.delete(node); }, after);

  function splash(target: InkTarget, clientX: number, clientY: number) {
    const { x, y } = positionInside(target, clientX, clientY);
    const layer = ensureInkLayer(target);
    for (let index = 0; index < 4; index++) {
      const blot = document.createElement('span');
      blot.className = 'ink-blot';
      const dx = [0, -9, 12, 5][index];
      const dy = [0, 7, -4, 10][index];
      blot.style.left = `${x + dx}px`;
      blot.style.top = `${y + dy}px`;
      blot.style.width = `${[20, 12, 15, 9][index]}px`;
      blot.style.height = `${[15, 11, 14, 9][index]}px`;
      blot.style.backgroundColor = inkColor(target);
      blot.style.animationDelay = `${index * 30}ms`;
      layer.appendChild(blot);
      nodes.add(blot);
      clearNodeLater(blot, BLOT_DURATION + index * 30 + 100);
    }
  }

  function endHold(pointerId: number) {
    const hold = holds.get(pointerId);
    if (!hold) return;
    holds.delete(pointerId);
    cancelLater(hold.timer);
    const settle = () => {
      hold.disk.classList.add('is-receding');
      clearNodeLater(hold.disk, 320);
    };
    // A full ink fill holds for a moment, then clears; an early release fades immediately.
    if (hold.filled) later(settle, 250);
    else settle();
  }

  const onPointerDown = (event: PointerEvent) => {
    if (!enabled() || event.button !== 0) return;
    if (canSketch() && event.pointerType === 'mouse') {
      endSketch();
      const target = event.target instanceof Element ? event.target : null;
      const color = target?.closest(DARK_SECTIONS) ? '#c0392b' : '#171615';
      drawing = {
        startedAt: performance.now(), endedAt: null,
        points: [{ x: event.clientX, y: event.clientY }], color,
      };
      activePointer = event.pointerId;
      strokes.push(drawing);
      if (strokes.length > 30) strokes.shift();
      root.classList.add('is-sketching');
      requestPaint();
    }
    const target = selectTarget(event.target);
    if (!target) return;
    const { x, y, width, height } = positionInside(target, event.clientX, event.clientY);
    if (!width || !height) return;
    const layer = ensureInkLayer(target);
    const diameter = 2 * Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + 24;
    const disk = document.createElement('span');
    disk.className = 'ink-hold';
    disk.style.left = `${x}px`;
    disk.style.top = `${y}px`;
    disk.style.width = `${diameter}px`;
    disk.style.height = `${diameter}px`;
    disk.style.backgroundColor = inkColor(target);
    layer.appendChild(disk);
    nodes.add(disk);
    const hold: Hold = {
      pointerId: event.pointerId, target, disk, x, y,
      startX: event.clientX, startY: event.clientY,
      filled: false, timer: 0,
    };
    hold.timer = later(() => {
      if (holds.get(event.pointerId) === hold) {
        hold.filled = true;
        hold.disk.classList.add('is-filled');
      }
    }, HOLD_DURATION);
    holds.set(event.pointerId, hold);
    // Next frame starts the CSS transform so the long press expands smoothly.
    later(() => { if (holds.has(event.pointerId)) disk.classList.add('is-spreading'); }, 16);
  };

  const onPointerMove = (event: PointerEvent) => {
    const hold = holds.get(event.pointerId);
    // Cancel touch holds if scrolling/gesturing. Never prevent natural page scrolling.
    if (hold && event.pointerType !== 'mouse') {
      if (Math.hypot(event.clientX - hold.startX, event.clientY - hold.startY) > 12) endHold(event.pointerId);
    }
    if (!canSketch() || !drawing || event.pointerId !== activePointer) return;
    if (!(event.buttons & 1)) { endSketch(event); return; }
    const events = event.getCoalescedEvents?.() ?? [event];
    for (const point of events) {
      const prev = drawing.points[drawing.points.length - 1];
      if (Math.hypot(point.clientX - prev.x, point.clientY - prev.y) >= 1.25) {
        drawing.points.push({ x: point.clientX, y: point.clientY });
      }
      if (drawing.points.length >= 1400) break;
    }
    requestPaint();
  };
  const onPointerUp = (event: PointerEvent) => { endSketch(event); endHold(event.pointerId); };
  const onBlur = () => {
    endSketch();
    [...holds.keys()].forEach(endHold);
  };
  const onClick = (event: MouseEvent) => {
    if (!enabled()) return;
    const target = selectTarget(event.target);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = event.detail === 0 ? rect.left + rect.width / 2 : event.clientX;
    const y = event.detail === 0 ? rect.top + rect.height / 2 : event.clientY;
    splash(target, x, y);

    // Let hash links show the splash briefly without breaking modifier/target/download semantics.
    if (target instanceof HTMLAnchorElement && event.detail > 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey &&
        !target.download && !target.target && target.hash && target.origin === window.location.origin &&
        target.pathname === window.location.pathname && !event.defaultPrevented) {
      event.preventDefault();
      later(() => { window.location.hash = target.hash; }, 180);
    }
  };

  const syncMode = () => {
    if (!canSketch()) {
      endSketch();
      strokes.length = 0;
      if (raf) window.cancelAnimationFrame(raf);
      raf = 0;
      context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    }
    root.classList.toggle('cursor-fx-enabled', canSketch());
    canvas.hidden = !canSketch();
    if (!enabled()) {
      [...holds.keys()].forEach(endHold);
      for (const node of nodes) node.remove();
      nodes.clear();
    }
  };

  targets.forEach(target => target.classList.add('ink-target'));
  canvas.classList.add('sketch-canvas');
  canvas.setAttribute('aria-hidden', 'true');
  resize();
  syncMode();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });
  window.addEventListener('blur', onBlur);
  document.addEventListener('click', onClick, true);
  for (const query of [reduced, fine, coarse]) query.addEventListener('change', syncMode);

  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('click', onClick, true);
      for (const query of [reduced, fine, coarse]) query.removeEventListener('change', syncMode);
      for (const id of timeouts) window.clearTimeout(id);
      timeouts.clear();
      if (raf) window.cancelAnimationFrame(raf);
      for (const node of nodes) node.remove();
      nodes.clear();
      holds.clear();
      strokes.length = 0;
      context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      root.classList.remove('cursor-fx-enabled', 'is-sketching');
      targets.forEach(target => target.classList.remove('ink-target'));
    },
  };
}
