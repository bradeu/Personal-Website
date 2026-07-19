import React from "react";
import { motion, useTransform } from "framer-motion";

function Word({ children, progress, start, end }) {
    const opacity = useTransform(progress, [start, end], [0.14, 1]);
    /* the space must live OUTSIDE the inline-block span —
       trailing whitespace inside an inline-block gets clipped,
       which glues the words together */
    return (
        <>
            <motion.span className="scrub-word" style={{ opacity }}>
                {children}
            </motion.span>{" "}
        </>
    );
}

/**
 * Word-by-word scroll lighting driven by an external scroll progress
 * MotionValue (needed because the About panels are pinned — element
 * position doesn't change while the section scrubs).
 *
 * `range` = [from, to] window of the progress value during which
 * the words light up sequentially.
 */
export default function ScrubWords({ text, progress, range, className }) {
    const words = text.split(" ");
    const [from, to] = range;
    const step = (to - from) / words.length;

    return (
        <p className={className}>
            {words.map((word, i) => (
                <Word
                    key={i}
                    progress={progress}
                    start={from + i * step}
                    end={from + (i + 1) * step}
                >
                    {word}
                </Word>
            ))}
        </p>
    );
}
