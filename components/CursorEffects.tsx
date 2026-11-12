'use client';

import { useEffect, useRef } from 'react';
import { mountEffects } from '../lib/effects';

/** One canvas, no additional drawing canvases, and no React re-renders on pointer movement. */
export default function CursorEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const controller = mountEffects(canvasRef.current);
    return () => controller.destroy();
  }, []);
  return <canvas ref={canvasRef} className="sketch-canvas" aria-hidden="true" />;
}
