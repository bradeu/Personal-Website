import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "01<>/#_\\{}[]";

/**
 * Decode-style text reveal: characters scramble through glyphs
 * and resolve left-to-right once the element enters the viewport.
 */
export default function ScrambleText({ text, className, as: Tag = "span", duration = 900 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const [display, setDisplay] = useState(text);

    useEffect(() => {
        if (!isInView) return;

        const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
            setDisplay(text);
            return;
        }

        let frame;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const resolved = Math.floor(progress * text.length);

            setDisplay(
                text
                    .split("")
                    .map((ch, i) => {
                        if (i < resolved || ch === " ") return ch;
                        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    })
                    .join("")
            );

            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [isInView, text, duration]);

    return (
        <Tag ref={ref} className={className} aria-label={text}>
            <span aria-hidden="true">{display}</span>
        </Tag>
    );
}
