import { useEffect, useRef } from 'react';

export default function NeonBlobs() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const N = 8; // number of blobs
    const root = containerRef.current;

    // Purple color palette in HSL format
    // #DD62ED = hsl(293, 77%, 65%)
    // #7318a2 = hsl(278, 76%, 36%)
    // #9333ea = hsl(274, 82%, 55%)
    const hues = [293, 278, 274, 290, 285, 280, 295, 288]; // variations of purples

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    let animationFrameId = null;

    // Accumulated animation time (integrates speed changes smoothly)
    let animTime = 0;
    let lastAnimTime = performance.now();

    // Global drift state (adds post-cursor "momentum" that slowly decays)
    let driftPos = { x: 0, y: 0 }; // in percentage points
    let driftVel = { x: 0, y: 0 }; // in percentage points per second

    // Cursor velocity tracking
    const cursor = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      velocityX: 0,
      velocityY: 0,
      speed: 0, // magnitude of velocity (viewport-diagonals per second)
      initialized: false, // flag to avoid giant first jump
    };
    let lastCursorTime = performance.now();

    // Clear any existing blobs
    root.innerHTML = '';

    // Store blob data for organic wandering motion
    const blobs = [];

    for (let i = 0; i < N; i++) {
      const shell = document.createElement('div');
      shell.className = 'blob';

      const ink = document.createElement('div');
      ink.className = 'blob__ink';

      // Randomize visual properties
      const hue = hues[i % hues.length] + rand(-8, 8);
      const hue2 = hue + rand(15, 35);
      const size = `${rand(28, 46)}vmin`;
      const alpha = rand(0.35, 0.55);
      const baseX = rand(10, 90);
      const baseY = rand(10, 90);
      const wanderSpeed = rand(0.08, 0.12); // slow but visible wandering speed

      shell.style.setProperty('--size', size);
      shell.style.setProperty('--alpha', String(alpha));

      ink.style.setProperty('--h', String(hue));
      ink.style.setProperty('--h2', String(hue2));
      ink.style.setProperty('--s', '80%');
      ink.style.setProperty('--l', '45%');

      shell.appendChild(ink);
      root.appendChild(shell);

      blobs.push({
        shell,
        ink,
        baseX,
        baseY,
        targetX: baseX,
        targetY: baseY,
        smoothTargetX: baseX,
        smoothTargetY: baseY,
        currentX: baseX,
        currentY: baseY,
        velocityX: 0,
        velocityY: 0,
        wanderSpeed,
        scale: 1,
        scaleSpeed: rand(0.4, 0.8),
      });
    }

    // Main animation loop - random wandering with cursor-influenced speed
    function animate() {
      const now = performance.now();
      const dt = Math.min((now - lastAnimTime) / 1000, 0.05); // ≤ 50ms
      lastAnimTime = now;

      // Integrate drift momentum (decays over time, continues after movement)
      const DRIFT_DAMP = 0.985;
      const damp = Math.pow(DRIFT_DAMP, dt * 60);
      driftVel.x *= damp;
      driftVel.y *= damp;

      // Integrate position from velocity
      driftPos.x += driftVel.x * dt;
      driftPos.y += driftVel.y * dt;

      // Soft-limit drift position so it doesn't wander too far off-screen
      const DRIFT_POS_MAX = 22; // percent
      if (driftPos.x > DRIFT_POS_MAX) driftPos.x = DRIFT_POS_MAX;
      if (driftPos.x < -DRIFT_POS_MAX) driftPos.x = -DRIFT_POS_MAX;
      if (driftPos.y > DRIFT_POS_MAX) driftPos.y = DRIFT_POS_MAX;
      if (driftPos.y < -DRIFT_POS_MAX) driftPos.y = -DRIFT_POS_MAX;

      // Frame-rate independent decay - speed drops when cursor stops
      cursor.speed *= Math.pow(0.92, dt * 60);
      if (cursor.speed < 0.005) cursor.speed = 0;

      // Calculate time multiplier based on cursor speed
      const speedMultiplier = 1.0 + (cursor.speed * 0.6);

      // Integrate time with speed multiplier (maintains phase continuity)
      animTime += dt * speedMultiplier;

      blobs.forEach((blob) => {
        // Strong random wandering - combine multiple sine waves for chaotic motion
        const phase1 = blob.baseX;
        const phase2 = blob.baseY;

        // Multiple overlapping sine waves create complex, organic motion
        // Reduced amplitudes to keep blobs more centered and visible
        const wanderX =
          Math.sin(animTime * blob.wanderSpeed + phase1) * 18 +
          Math.sin(animTime * blob.wanderSpeed * 0.5 + phase2) * 12 +
          Math.cos(animTime * blob.wanderSpeed * 1.3) * 8;

        const wanderY =
          Math.cos(animTime * blob.wanderSpeed * 0.7 + phase2) * 18 +
          Math.cos(animTime * blob.wanderSpeed * 0.3 + phase1) * 12 +
          Math.sin(animTime * blob.wanderSpeed * 1.1) * 8;

        // Add global drift offset so blobs keep drifting after cursor movement
        blob.targetX = blob.baseX + wanderX + driftPos.x;
        blob.targetY = blob.baseY + wanderY + driftPos.y;

        // Low-pass filter the target to smooth out high-frequency noise
        const SMOOTH_FACTOR = 0.15; // Higher = faster response, lower = smoother
        blob.smoothTargetX += (blob.targetX - blob.smoothTargetX) * SMOOTH_FACTOR;
        blob.smoothTargetY += (blob.targetY - blob.smoothTargetY) * SMOOTH_FACTOR;

        // Critically damped spring physics (no oscillation, smooth settling)
        const STIFFNESS = 50; // Spring strength
        const DAMPING = 15;   // Damping coefficient (critical damping at sqrt(4*STIFFNESS*mass), mass=1)

        const ax = STIFFNESS * (blob.smoothTargetX - blob.currentX) - DAMPING * blob.velocityX;
        const ay = STIFFNESS * (blob.smoothTargetY - blob.currentY) - DAMPING * blob.velocityY;

        blob.velocityX += ax * dt;
        blob.velocityY += ay * dt;

        // Dead-zone threshold - snap to still when movement is negligible
        const VELOCITY_THRESHOLD = 0.002;
        const POSITION_THRESHOLD = 0.01;

        if (Math.abs(blob.velocityX) < VELOCITY_THRESHOLD &&
            Math.abs(blob.smoothTargetX - blob.currentX) < POSITION_THRESHOLD) {
          blob.velocityX = 0;
          blob.currentX = blob.smoothTargetX;
        } else {
          blob.currentX += blob.velocityX * dt;
        }

        if (Math.abs(blob.velocityY) < VELOCITY_THRESHOLD &&
            Math.abs(blob.smoothTargetY - blob.currentY) < POSITION_THRESHOLD) {
          blob.velocityY = 0;
          blob.currentY = blob.smoothTargetY;
        } else {
          blob.currentY += blob.velocityY * dt;
        }

        // Apply to DOM using GPU-accelerated transform with vw/vh units, centered on position
        blob.shell.style.transform = `translate(${blob.currentX}vw, ${blob.currentY}vh) translate(-50%, -50%)`;

        // Organic pulsing - quantize scale to prevent sub-pixel shimmer
        const scaleOffset = Math.sin(animTime * blob.scaleSpeed * 2) * 0.12;
        blob.scale = Math.round((1 + scaleOffset) * 1000) / 1000;

        // Keep blur constant, pulse the inner blob scale instead for stability
        blob.ink.style.transform = `scale(${blob.scale})`;
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Start animation loop
    console.log('🔵 Starting blob animation with cursor-reactive speed');
    animationFrameId = requestAnimationFrame(animate);

    // Track cursor movement to calculate velocity
    let rafId = null;
    let latestPointerEvent = null;

    function handlePointerMove(e) {
      // Store the latest event
      latestPointerEvent = e;

      // Throttle processing with requestAnimationFrame for better performance
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        // Process the latest pointer position (not the one that triggered this rAF)
        const e = latestPointerEvent;
        if (!e) {
          rafId = null;
          return;
        }

        const currentTime = performance.now();
        const dt = (currentTime - lastCursorTime) / 1000; // convert to seconds

        // Initialize cursor position on first move
        if (!cursor.initialized) {
          cursor.x = e.clientX;
          cursor.y = e.clientY;
          cursor.prevX = e.clientX;
          cursor.prevY = e.clientY;
          cursor.initialized = true;
          lastCursorTime = currentTime;
          rafId = null;
          return;
        }

        // Guard against tiny/zero dt
        if (dt < 0.001 || dt > 1.0) {
          lastCursorTime = currentTime;
          rafId = null;
          return;
        }

        // Only update if cursor actually moved
        if (e.clientX === cursor.x && e.clientY === cursor.y) {
          rafId = null;
          return;
        }

        // Calculate distance moved in pixels
        const dx = e.clientX - cursor.x;
        const dy = e.clientY - cursor.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Push a drift "impulse" proportional to cursor velocity
        const vx = dx / dt; // px/s
        const vy = dy / dt; // px/s
        const vxPct = (vx / (window.innerWidth  || 1)) * 100;  // %/s
        const vyPct = (vy / (window.innerHeight || 1)) * 100;  // %/s

        // Add a momentum impulse
        const IMPULSE_GAIN = 0.18;
        driftVel.x += vxPct * IMPULSE_GAIN;
        driftVel.y += vyPct * IMPULSE_GAIN;

        // Cap drift velocity
        const DRIFT_VEL_MAX = 60; // % per second
        if (driftVel.x > DRIFT_VEL_MAX) driftVel.x = DRIFT_VEL_MAX;
        if (driftVel.x < -DRIFT_VEL_MAX) driftVel.x = -DRIFT_VEL_MAX;
        if (driftVel.y > DRIFT_VEL_MAX) driftVel.y = DRIFT_VEL_MAX;
        if (driftVel.y < -DRIFT_VEL_MAX) driftVel.y = -DRIFT_VEL_MAX;

        // Normalize distance by viewport diagonal
        const viewportDiagonal = Math.sqrt(
          window.innerWidth ** 2 + window.innerHeight ** 2
        );
        const normalizedDistance = distance / viewportDiagonal;

        // Speed in viewport-diagonals per second
        const speedPerSecond = normalizedDistance / dt;

        // Scale to reasonable range
        const rawSpeed = speedPerSecond * 6;
        const smoothSpeed = cursor.speed * 0.7 + rawSpeed * 0.3;
        cursor.speed = Math.max(0, Math.min(smoothSpeed, 5));

        // Update position
        cursor.prevX = cursor.x;
        cursor.prevY = cursor.y;
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        lastCursorTime = currentTime;

        rafId = null;
      });
    }

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      // Cancel both animation loops to prevent leaks
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="neon-bg"
      aria-hidden="true"
    />
  );
}
