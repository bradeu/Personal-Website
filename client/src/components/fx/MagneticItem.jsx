import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnetic hover wrapper: children are pulled toward the cursor
 * while it hovers, and spring back to rest on leave.
 * Disabled on touch devices (no fine pointer).
 */
export default function MagneticItem({ children, strength = 0.35, className }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
    const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

    const handleMove = (e) => {
        if (!ref.current || window.matchMedia?.("(pointer: coarse)").matches) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x: springX, y: springY, display: "inline-block" }}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            {children}
        </motion.div>
    );
}
