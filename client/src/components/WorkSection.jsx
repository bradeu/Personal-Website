import React, { useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    useReducedMotion,
} from "framer-motion";

/* Work history — sourced from the llm-wiki resume (canonical). */
const jobs = [
    {
        chip: "OLX '24",
        org: "OLX",
        role: "Machine Learning Engineer Intern",
        dates: "Jun 2024 – Aug 2024",
        loc: "Jakarta, Indonesia",
        desc: "Built a Bi-LSTM + Word2Vec retraining pipeline on AWS EC2 with TensorFlow and ClearML. Semi-supervised labeling with DBSCAN and topic modeling.",
    },
    {
        chip: "UBC '25",
        org: "University of British Columbia",
        role: "AI Engineer Co-op",
        dates: "May 2025 – Aug 2025",
        loc: "Vancouver, Canada",
        desc: "Built a modular RAG pipeline with FastAPI. Async PDF ingestion through Redis queues and Celery workers, with a Redis session cache and PostgreSQL long-term memory.",
    },
    {
        chip: "UBC RA",
        org: "University of British Columbia",
        role: "Research Assistant",
        dates: "Sep 2025 – Dec 2026",
        loc: "Vancouver, Canada",
        desc: "Building an agentic survey platform with FastAPI and MCP servers - namespaced tool routing, per-respondent identity caching, and Pydantic-validated dynamic prompts.",
    },
    {
        chip: "RBC '26",
        org: "Royal Bank of Canada",
        role: "Developer, AI Innovation-X (GRM)",
        dates: "Sep 2026 – Dec 2026",
        loc: "Toronto, Canada",
        desc: "Joining RBC's AI Innovation-X team in Group Risk Management to build GenAI, RAG, and agentic systems for enterprise risk workflows.",
    },
];

const STEP = 360 / jobs.length; // 90° per job

/* One chip on the orbit ring. Placed at its angle, counter-rotated so it
   stays upright while the wheel spins, scaled up when active. */
function OrbitChip({ job, index, wheelAngle, active }) {
    const upright = useTransform(wheelAngle, (a) => -(a + index * STEP));
    return (
        <div
            className="orbit-chip-slot"
            style={{ transform: `rotate(${index * STEP}deg)` }}
        >
            <motion.div
                className={`orbit-chip${active ? " orbit-chip--active" : ""}`}
                style={{ rotate: upright }}
                animate={{ scale: active ? 1.25 : 0.85, opacity: active ? 1 : 0.45 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
                {job.chip}
            </motion.div>
        </div>
    );
}

/**
 * Orbital work history: the section pins, the whole wheel zooms in from
 * deep scale, then spins 90° per job as you scroll. The active job's
 * details zoom through the center of the ring.
 */
export default function WorkSection() {
    const ref = useRef(null);
    const prefersReduced = useReducedMotion();
    const [active, setActive] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // phase 1 — zoom in through the wheel
    const wheelScale = useSpring(
        useTransform(scrollYProgress, [0, 0.14], [2.6, 1]),
        { stiffness: 120, damping: 24 }
    );
    const wheelOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

    // phase 2 — circular spin, one 90° step per job
    const stepProgress = useTransform(
        scrollYProgress,
        [0.16, 0.92],
        [0, jobs.length - 1],
        { clamp: true }
    );
    const wheelAngle = useSpring(useTransform(stepProgress, (v) => v * -STEP), {
        stiffness: 90,
        damping: 22,
    });

    useMotionValueEvent(stepProgress, "change", (v) => {
        const idx = Math.min(jobs.length - 1, Math.max(0, Math.round(v)));
        if (idx !== active) setActive(idx);
    });

    if (prefersReduced) {
        /* static fallback: plain list, no pin, no spin */
        return (
            <section id="work" className="work-section-static">
                <h2 className="work-title">Work</h2>
                {jobs.map((job) => (
                    <div className="work-static-item" key={job.chip}>
                        <h3>{job.role} — {job.org}</h3>
                        <p className="work-detail-meta">{job.dates} · {job.loc}</p>
                        <p>{job.desc}</p>
                    </div>
                ))}
            </section>
        );
    }

    return (
        <section id="work" className="work-section" ref={ref}>
            <div className="work-sticky">
                <h2 className="work-title" aria-hidden="true">Work</h2>

                <motion.div
                    className="orbit-wheel-frame"
                    style={{ scale: wheelScale, opacity: wheelOpacity }}
                >
                    {/* decorative orbit ring */}
                    <div className="orbit-ring" aria-hidden="true" />

                    {/* rotating wheel carrying the chips */}
                    <motion.div className="orbit-wheel" style={{ rotate: wheelAngle }} aria-hidden="true">
                        {jobs.map((job, i) => (
                            <OrbitChip
                                key={job.chip}
                                job={job}
                                index={i}
                                wheelAngle={wheelAngle}
                                active={i === active}
                            />
                        ))}
                    </motion.div>

                    {/* active job details zoom through the ring center */}
                    <div className="orbit-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className="work-detail"
                                initial={{ opacity: 0, scale: 0.55 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="work-detail-index">
                                    {String(active + 1).padStart(2, "0")} / {String(jobs.length).padStart(2, "0")}
                                </span>
                                <h3 className="work-detail-role">{jobs[active].role}</h3>
                                <p className="work-detail-org">{jobs[active].org}</p>
                                <p className="work-detail-meta">{jobs[active].dates} · {jobs[active].loc}</p>
                                <p className="work-detail-desc">{jobs[active].desc}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
