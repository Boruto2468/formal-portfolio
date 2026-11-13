'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const HINT = "There's more to this portfolio than meets the eye.";
// Group letters into unbreakable words so the Easter egg wraps cleanly on phones.
let hintOffset = 0;
const HINT_WORDS = HINT.split(' ').map((word) => {
  const offset = hintOffset;
  hintOffset += word.length + 1;
  return { word, offset };
});
const STORAGE_KEY = 'frank-portfolio-creative-unlocked';
const DESTINATION = '/creative/index.html';

type Phase = 'visible' | 'vanishing' | 'hidden' | 'returning';

/**
 * A deliberately subtle escape hatch from the professional portfolio.
 * The two sites are separate documents, so no stylesheet or client code leaks between them.
 */
export default function CreativeEntrance() {
  const [unlocked, setUnlocked] = useState(false);
  const [phase, setPhase] = useState<Phase>('visible');
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const leavingRef = useRef(false);
  const transitionAbort = useRef<AbortController | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const discoveryTimer = useRef<number | null>(null);

  useEffect(() => {
    try { setUnlocked(localStorage.getItem(STORAGE_KEY) === 'true'); } catch { /* storage may be disabled */ }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhase('visible');
      return;
    }
    // Keyboard focus and pointer hover prevent the hint disappearing mid-interaction.
    if (paused && phase === 'visible') return;
    if (paused) return;
    const timings: Record<Phase, number> = {
      visible: 3000,
      vanishing: 650,
      hidden: 4350,
      returning: 650,
    };
    const next: Record<Phase, Phase> = {
      visible: 'vanishing',
      vanishing: 'hidden',
      hidden: 'returning',
      returning: 'visible',
    };
    const id = window.setTimeout(() => setPhase(next[phase]), timings[phase]);
    return () => window.clearTimeout(id);
  }, [phase, paused, reducedMotion]);

  const unlock = useCallback(() => {
    setUnlocked(true);
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* private mode */ }
  }, []);

  const enter = useCallback(async () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    unlock();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.location.assign(DESTINATION);
      return;
    }
    setTransitioning(true);
    // Prefetch while the ink-style interstitial is on screen. If offline or slow,
    // proceed to the destination anyway so the browser can show its own error state.
    const abort = new AbortController();
    transitionAbort.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 4000);
    const prepare = Promise.allSettled([
      fetch(DESTINATION, { signal: abort.signal, cache: 'force-cache' }),
      fetch('/creative/styles.css', { signal: abort.signal, cache: 'force-cache' }),
    ]).finally(() => window.clearTimeout(timeout));
    const minimum = new Promise<void>(resolve => {
      transitionTimer.current = window.setTimeout(resolve, 1900);
    });
    await Promise.all([prepare, minimum]);
    try { sessionStorage.setItem('frank-portfolio-arriving', '1'); } catch { /* ignore */ }
    window.location.assign(DESTINATION);
  }, [unlock]);

  useEffect(() => {
    const logo = document.querySelector<HTMLAnchorElement>('.nav-logo');
    if (!logo) return;
    let clicks: number[] = [];
    const onClick = (event: MouseEvent) => {
      const now = performance.now();
      clicks = clicks.filter(time => now - time <= 2000);
      clicks.push(now);
      if (clicks.length >= 3) {
        event.preventDefault();
        clicks = [];
        void enter();
      }
    };
    logo.addEventListener('click', onClick);
    logo.setAttribute('title', 'Frank.dev');
    return () => logo.removeEventListener('click', onClick);
  }, [enter]);

  useEffect(() => () => {
    transitionAbort.current?.abort();
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    if (discoveryTimer.current !== null) window.clearTimeout(discoveryTimer.current);
  }, []);

  const interactive = reducedMotion || phase === 'visible';
  return (
    <>
      <div className="secret-entrance" aria-label="A hidden side of this portfolio">
        {unlocked ? (
          <button className="secret-unlocked" type="button" onClick={() => void enter()}>
            <span className="secret-unlocked-dot" aria-hidden="true" />
            Enter creative mode <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <button
            type="button"
            className={`secret-hint secret-hint--${discovered ? 'discovered' : reducedMotion ? 'visible' : phase}`}
            disabled={!interactive || discovered}
            aria-hidden={!interactive || discovered}
            aria-label={HINT + ' Reveal the other portfolio.'}
            onClick={() => {
              if (reducedMotion) { void enter(); return; }
              setDiscovered(true);
              // The letters scatter once, then the welcome screen takes over.
              discoveryTimer.current = window.setTimeout(() => void enter(), 400);
            }}
            onPointerEnter={() => { if (phase === 'visible') setPaused(true); }}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => { if (phase === 'visible') setPaused(true); }}
            onBlur={() => setPaused(false)}
          >
            {HINT_WORDS.map(({ word, offset }, wordIndex) => (
              <span className="secret-word" key={wordIndex} aria-hidden="true">
                {Array.from(word).map((letter, charIndex) => {
                  const index = offset + charIndex;
                  return (
                    <span
                      className="secret-letter"
                      key={index}
                      style={{ '--letter': index, '--remaining': HINT.length - 1 - index, '--scatter-x': `${((index % 5) - 2) * 5}px`, '--scatter-y': `${((index % 3) - 1) * 6 - 4}px` } as CSSProperties}
                    >{letter}</span>
                  );
                })}
              </span>
            ))}
          </button>
        )}
      </div>
      {transitioning && (
        <div className="creative-transition" role="status" aria-live="polite" aria-label="Entering creative mode">
          <div className="creative-transition-inner">
            <p className="creative-transition-kicker">THE OTHER SIDE OF THE PORTFOLIO</p>
            <span className="creative-transition-rule" aria-hidden="true" />
            <h2>This is more<br /><em>my style.</em></h2>
            <p className="creative-transition-jp" lang="ja">ようこそ。</p>
            <p className="creative-transition-sub">Welcome to the other side.</p>
            <div className="creative-transition-progress" aria-hidden="true"><span /></div>
          </div>
        </div>
      )}
    </>
  );
}
