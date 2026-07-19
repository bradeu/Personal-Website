import React, { useRef, useEffect, useState, useCallback } from "react";

const BALL_COLORS = ["#DD62ED", "#A78BFF", "#F182F6", "#7C4DFF", "#C031E2"];

const HELP_TEXT = [
  "commands:",
  "  help              show this list",
  "  reset             relaunch the ball",
  "  pause / resume    freeze / unfreeze the game",
  "  speed [1-5]       show or set ball speed",
  "  stats             bounces and corner hits",
  "  theme [day|night] switch the site theme",
  "  clear             wipe the terminal",
];

/**
 * Playground page: a CRT screen running the classic DVD-logo bounce,
 * driven entirely from a terminal below it. A true corner hit flares
 * the bezel and flickers the site theme for five seconds (kept under
 * 3 flashes/sec per WCAG 2.3.1; skipped for reduced-motion users).
 */
export default function PlaygroundSection() {
  const canvasRef = useRef(null);
  const shellRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const [resetKey, setResetKey] = useState(0);
  const [lines, setLines] = useState([
    { type: "sys", text: "bs-playground v1.0 — the dot is loose." },
    { type: "sys", text: 'type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  /* live game state the loop reads every frame */
  const game = useRef({ speed: 2, paused: false, bounces: 0, corners: 0 });
  const flickering = useRef(false);

  const print = useCallback((text, type = "out") => {
    setLines((prev) => [...prev, ...(Array.isArray(text) ? text.map((t) => ({ type, text: t })) : [{ type, text }])]);
  }, []);

  /* terminal autoscroll */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const startFlicker = useCallback(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (flickering.current || prefersReduced) return;
    flickering.current = true;
    const root = document.documentElement;
    const original = root.dataset.theme === "day" ? "day" : "night";
    const flipped = original === "day" ? "night" : "day";
    let on = false;

    const apply = (theme) => {
      root.dataset.theme = theme;
      root.classList.toggle("dark", theme === "night");
      root.classList.toggle("light", theme === "day");
    };

    const iv = setInterval(() => {
      on = !on;
      apply(on ? flipped : original);
    }, 350);

    setTimeout(() => {
      clearInterval(iv);
      apply(original);
      flickering.current = false;
    }, 5000);
  }, []);

  const celebrate = useCallback(() => {
    game.current.corners += 1;
    shellRef.current?.classList.add("console-shell--corner");
    setTimeout(() => shellRef.current?.classList.remove("console-shell--corner"), 900);
    print(`*** CORNER HIT #${game.current.corners} ***`, "corner");
    startFlicker();
  }, [print, startFlicker]);

  /* ---- game loop ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const R = 9;
    const angle = Math.random() * Math.PI * 2;
    const ball = {
      x: 60 + Math.random() * 100,
      y: 60 + Math.random() * 60,
      vx: Math.cos(angle),
      vy: Math.sin(angle),
      color: 0,
    };
    if (Math.abs(ball.vx) < 0.35) ball.vx = Math.sign(ball.vx || 1) * 0.35;
    if (Math.abs(ball.vy) < 0.35) ball.vy = Math.sign(ball.vy || 1) * 0.35;
    const norm = Math.hypot(ball.vx, ball.vy);
    ball.vx /= norm;
    ball.vy /= norm;

    let last = performance.now();
    let lastCorner = 0;

    /* generous corner: a wall bounce anywhere in this band near a corner counts */
    const CORNER_ZONE = 10;
    /* aim assist: within this range, a ball heading cornerward gets pulled in */
    const MAGNET = 90;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!game.current.paused) {
        const speed = 90 + game.current.speed * 70;
        ball.x += ball.vx * speed * dt;
        ball.y += ball.vy * speed * dt;

        /* corner magnet — steer toward the nearest corner when closing in */
        const cornersXY = [
          [R, R], [width - R, R], [R, height - R], [width - R, height - R],
        ];
        for (const [cx, cy] of cornersXY) {
          const dx = cx - ball.x;
          const dy = cy - ball.y;
          const d = Math.hypot(dx, dy);
          if (d > 1 && d < MAGNET) {
            const ux = dx / d;
            const uy = dy / d;
            // only assist when already heading roughly at the corner
            if (ball.vx * ux + ball.vy * uy > 0.6) {
              ball.vx += (ux - ball.vx) * 0.03;
              ball.vy += (uy - ball.vy) * 0.03;
              const n = Math.hypot(ball.vx, ball.vy);
              ball.vx /= n;
              ball.vy /= n;
            }
            break;
          }
        }

        let hitX = false;
        let hitY = false;

        if (ball.x <= R) { ball.x = R; ball.vx = Math.abs(ball.vx); hitX = true; }
        if (ball.x >= width - R) { ball.x = width - R; ball.vx = -Math.abs(ball.vx); hitX = true; }
        if (ball.y <= R) { ball.y = R; ball.vy = Math.abs(ball.vy); hitY = true; }
        if (ball.y >= height - R) { ball.y = height - R; ball.vy = -Math.abs(ball.vy); hitY = true; }

        if (hitX || hitY) {
          ball.color = (ball.color + 1) % BALL_COLORS.length;
          game.current.bounces += 1;
          const jitter = (Math.random() - 0.5) * 0.06;
          const cos = Math.cos(jitter);
          const sin = Math.sin(jitter);
          const nvx = ball.vx * cos - ball.vy * sin;
          const nvy = ball.vx * sin + ball.vy * cos;
          ball.vx = nvx;
          ball.vy = nvy;

          /* corner check with tolerance: bounced while near both edges */
          const nearX = ball.x <= R + CORNER_ZONE || ball.x >= width - R - CORNER_ZONE;
          const nearY = ball.y <= R + CORNER_ZONE || ball.y >= height - R - CORNER_ZONE;
          if (nearX && nearY && now - lastCorner > 1200) {
            lastCorner = now;
            celebrate();
          }
        }
      }

      ctx.fillStyle = "rgba(8, 4, 16, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const color = BALL_COLORS[ball.color];
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 22;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(ball.x - 2.5, ball.y - 2.5, 2.6, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(tick);
    };

    ctx.fillStyle = "#080410";
    ctx.fillRect(0, 0, width, height);

    if (prefersReduced) {
      ctx.fillStyle = BALL_COLORS[0];
      ctx.beginPath();
      ctx.arc(80, 80, R, 0, Math.PI * 2);
      ctx.fill();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [resetKey, celebrate]);

  /* ---- command interpreter ---- */
  const run = (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    print(`$ ${cmd}`, "cmd");

    const [name, arg] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case "help":
        print(HELP_TEXT);
        break;
      case "reset":
        game.current.bounces = 0;
        game.current.paused = false;
        setResetKey((k) => k + 1);
        print("ball relaunched.");
        break;
      case "pause":
        game.current.paused = true;
        print("game paused.");
        break;
      case "resume":
        game.current.paused = false;
        print("game resumed.");
        break;
      case "speed":
        if (arg === undefined) {
          print(`speed is ${game.current.speed} (1-5).`);
        } else {
          const n = parseInt(arg, 10);
          if (n >= 1 && n <= 5) {
            game.current.speed = n;
            print(`speed set to ${n}.`);
          } else {
            print("usage: speed [1-5]", "err");
          }
        }
        break;
      case "stats":
        print([
          `bounces: ${game.current.bounces}`,
          `corner hits: ${game.current.corners}`,
        ]);
        break;
      case "theme": {
        const root = document.documentElement;
        const current = root.dataset.theme === "day" ? "day" : "night";
        const next = arg === "day" || arg === "night" ? arg : current === "day" ? "night" : "day";
        root.dataset.theme = next;
        root.classList.toggle("dark", next === "night");
        root.classList.toggle("light", next === "day");
        localStorage.setItem("theme", next);
        print(`theme: ${next}.`);
        break;
      }
      case "clear":
        setLines([]);
        break;
      case "corner":
        /* undocumented — for the impatient */
        celebrate();
        break;
      default:
        print(`unknown command: ${name} — try "help"`, "err");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [...h, input]);
      setHistoryIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <main className="playground-page">
      <section id="playground" className="playground-section">
        <h2 className="playground-title">Playground</h2>
        <p className="playground-hint">Hit a corner.</p>

        <div className="console-shell" ref={shellRef}>
          <div className="console-screen">
            <canvas key={resetKey} ref={canvasRef} className="console-canvas" />
            <div className="console-scanlines" aria-hidden="true" />
          </div>

          {/* terminal */}
          <div
            className="terminal"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="terminal-scroll" ref={scrollRef}>
              {lines.map((line, i) => (
                <div key={i} className={`terminal-line terminal-line--${line.type}`}>
                  {line.text}
                </div>
              ))}
            </div>
            <div className="terminal-prompt">
              <span className="terminal-ps1">bs@playground:~$</span>
              <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Playground terminal"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
