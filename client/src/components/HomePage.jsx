import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import bradleyPic from "../public/bradley_profile.jpg";
import BradleysResume from "../public/Bradley_s_Resume.pdf";
import ScrambleText from "./fx/ScrambleText";
import MagneticItem from "./fx/MagneticItem";

const ease = [0.22, 1, 0.36, 1];

/* Per-character masked rise. Each char lives in an overflow-hidden mask
   and slides up into view with a stagger; chars also lift on hover. */
function SplitLine({ text, delay = 0, children, className = "" }) {
    const chars = text.split("");
    return (
        <span className={`home-name-line ${className}`} aria-hidden="true">
            {chars.map((ch, i) => (
                <span className="char-mask" key={i}>
                    <motion.span
                        className="char"
                        initial={{ y: "115%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.85, delay: delay + i * 0.035, ease }}
                    >
                        {ch === " " ? " " : ch}
                    </motion.span>
                </span>
            ))}
            {children}
        </span>
    );
}

export default function HomePage() {
    const photoRef = useRef(null);

    /* Mouse-parallax tilt for the photo (depth-3). */
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 20 });
    const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 20 });

    const handlePhotoMove = (e) => {
        if (!photoRef.current || window.matchMedia?.("(pointer: coarse)").matches) return;
        const rect = photoRef.current.getBoundingClientRect();
        tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
        tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePhotoLeave = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    const handleViewResume = () => {
        window.open(BradleysResume, '_blank');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="home" className="home-section">
            <div className="home-grid">

                {/* Left — text */}
                <div className="home-left">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                    >
                        <ScrambleText
                            className="home-location-label"
                            text="Vancouver, BC · University of British Columbia"
                        />
                    </motion.span>

                    <h1 className="home-name-stack" aria-label="Bradley Eugene Sakran">
                        <SplitLine text="Bradley" delay={0.15} />
                        <SplitLine text="Eugene" delay={0.32} className="home-name-line--italic" />
                        <SplitLine text="Sakran" delay={0.49}>
                            <span className="char-mask">
                                <motion.span
                                    className="char home-name-period"
                                    initial={{ y: "115%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 0.85, delay: 0.72, ease }}
                                >
                                    .
                                </motion.span>
                            </span>
                        </SplitLine>
                    </h1>

                    <motion.div
                        className="home-divider"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.55, ease }}
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.65, ease }}
                    >
                        <ScrambleText className="home-roles" text="AI / ML / Backend" />
                    </motion.p>

                    <motion.p
                        className="home-description"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.75, ease }}
                    >
                        Currently studying at the University of British Columbia,
                        and building some cool stuff in my free time.
                    </motion.p>

                    <motion.div
                        className="home-actions"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.88, ease }}
                    >
                        <MagneticItem>
                            <button
                                className="btn-pill btn-pill--primary"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in Touch
                            </button>
                        </MagneticItem>
                        <MagneticItem>
                            <button
                                className="btn-pill btn-pill--ghost"
                                onClick={handleViewResume}
                            >
                                View Resume
                            </button>
                        </MagneticItem>
                    </motion.div>
                </div>

                {/* Right — photo (depth-3, mouse-parallax tilt) */}
                <motion.div
                    className="home-right"
                    initial={{ opacity: 0, x: 30, rotate: 4 }}
                    animate={{ opacity: 1, x: 0, rotate: 1.5 }}
                    transition={{ duration: 0.9, delay: 0.2, ease }}
                >
                    <motion.div
                        ref={photoRef}
                        className="home-photo-frame"
                        style={{ rotateX, rotateY, transformPerspective: 900 }}
                        onPointerMove={handlePhotoMove}
                        onPointerLeave={handlePhotoLeave}
                    >
                        <img
                            src={bradleyPic}
                            alt="Bradley Eugene Sakran"
                            className="home-profile-image"
                        />
                        <div className="home-photo-accent" aria-hidden="true" />
                    </motion.div>
                </motion.div>

            </div>

            <motion.button
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease }}
                onClick={() => scrollToSection('about')}
                aria-label="Scroll to about section"
            >
                Scroll
            </motion.button>
        </section>
    );
}
