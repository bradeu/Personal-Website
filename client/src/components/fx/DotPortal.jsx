import React, { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionTemplate,
    useMotionValueEvent,
    useReducedMotion,
} from "framer-motion";
import DropletCanvas from "./DropletCanvas";

/**
 * Water-droplet intro, scroll-scrubbed over a 320vh runway.
 * The droplet, landing dot, and ripples are a real 3D scene
 * (three.js via react-three-fiber) driven by the same progress value:
 *
 *  p 0.00–0.30  glassy 3D droplet falls toward the glowing dot
 *  p 0.28–0.44  impact: squash, rebound, perspective ripple rings
 *  p 0.42–0.84  circular clip opens from the impact point into content
 */
export default function DotPortal({ children }) {
    const ref = useRef(null);
    const prefersReduced = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    /* surface opens into the content */
    const radius = useTransform(scrollYProgress, [0.42, 0.84], [0.35, 120]);
    const clipPath = useMotionTemplate`circle(${radius}% at 50% 50%)`;
    const contentScale = useTransform(scrollYProgress, [0.42, 0.84], [1.2, 1]);

    // once the circle covers the screen, drop the opaque backdrop so the
    // fixed neon-blob background shows through the hero again
    const plainOpacity = useTransform(scrollYProgress, [0.82, 0.92], [1, 0]);

    // during the intro the page is ONLY the dot — html[data-intro="1"]
    // hides the navbar via CSS until the portal is mostly open
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        document.documentElement.dataset.intro = v < 0.86 && !prefersReduced ? "1" : "0";
    });

    useEffect(() => {
        document.documentElement.dataset.intro = prefersReduced ? "0" : "1";
        return () => {
            document.documentElement.dataset.intro = "0";
        };
    }, [prefersReduced]);

    if (prefersReduced) {
        return <div>{children}</div>;
    }

    return (
        <div className="dot-portal" ref={ref}>
            <div className="dot-portal-sticky">

                {/* plain landing layer with the 3D droplet scene */}
                <motion.div
                    className="dot-portal-plain"
                    style={{ opacity: plainOpacity }}
                    aria-hidden="true"
                >
                    <DropletCanvas progress={scrollYProgress} />
                </motion.div>

                {/* content revealed through the growing circle */}
                <motion.div
                    className="dot-portal-content"
                    style={{ clipPath, scale: contentScale }}
                >
                    {children}
                </motion.div>

            </div>
        </div>
    );
}
