import React, { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ScrubWords from "./fx/ScrubWords";

const AboutSpaceCanvas = lazy(() => import("./fx/AboutSpaceCanvas"));

const skillRows = [
  { label: "Languages",  skills: ["Python", "Go", "JavaScript", "TypeScript", "Java", "C#", "C++", "C", "SQL", "R", "Racket"] },
  { label: "Frameworks", skills: ["FastAPI", "Gin", "Fiber", "Django", "TensorFlow", "LangChain", "Node.js", "Express", "React", "Tailwind"] },
  { label: "Tools",      skills: ["RabbitMQ", "Redis", "Kafka", "ClearML", "Git", "Docker", "AWS", "Atlassian"] },
  { label: "Data",       skills: ["PostgreSQL", "MongoDB", "Pinecone", "ChromaDB", "Qdrant"] },
];

const ABOUT_TEXT = `Computer Science student at UBC, building full-stack, AI-powered systems — RAG pipelines, agentic platforms, backend infrastructure. Born and raised in Indonesia, now based in Vancouver.`;

function SkillsPanel() {
  return (
    <div className="about-editorial-panel">
      <span className="about-ghost-number" aria-hidden="true">02</span>
      <h3 className="about-editorial-title">Skills & Technologies</h3>
      <div className="about-skills-rows">
        {skillRows.map(({ label, skills }) => (
          <div key={label} className="about-skill-row">
            <span className="about-skill-label">{label}</span>
            <div className="about-skill-tags">
              {skills.map(s => (
                <span key={s} className="about-skill-tag">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The About flight: the camera flies through a glowing portal ring into a
 * real 3D starfield (three.js — the camera genuinely travels forward),
 * the two panels cross right → left mid-flight, and a second ring marks
 * the way out. The "About" title is crisp DOM text — it fades, never
 * scales, so it can't blur.
 */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* approach: 0 while the section is still below, 1 the moment it pins.
     Drives the hand-off from hero → space so there's no hard seam. */
  const { scrollYProgress: approach } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  /* stars grow in while approaching, fade after the exit ring */
  const spaceIn = useTransform(approach, [0.25, 0.9], [0, 1]);
  const spaceOut = useTransform(scrollYProgress, [0.93, 1], [1, 0]);
  const spaceOpacity = useTransform(() => spaceIn.get() * spaceOut.get());

  /* panels fly right → left */
  const panel1X = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.44, 0.54],
    ["112vw", "0vw", "0vw", "-118vw"]
  );
  const panel2X = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.74, 0.82],
    ["112vw", "0vw", "0vw", "-118vw"]
  );

  if (prefersReduced) {
    /* static fallback: plain stacked panels, no pin, no flight */
    return (
      <section id="about" className="about-static">
        <div className="about-editorial-panel">
          <span className="about-ghost-number" aria-hidden="true">01</span>
          <h3 className="about-editorial-title">About</h3>
          <p className="about-editorial-body">{ABOUT_TEXT}</p>
        </div>
        <SkillsPanel />
      </section>
    );
  }

  return (
    <section id="about" className="about-space" ref={sectionRef}>
      <div className="about-space-stage">

        {/* 3D flight: portal rings + traveling starfield */}
        <motion.div className="about-space-layer" style={{ opacity: spaceOpacity }} aria-hidden="true">
          <Suspense fallback={null}>
            <AboutSpaceCanvas progress={scrollYProgress} approach={approach} />
          </Suspense>
        </motion.div>

        {/* 01 — About, crossing mid-flight */}
        <motion.div className="about-space-panel" style={{ x: panel1X }}>
          <div className="about-editorial-panel">
            <span className="about-ghost-number" aria-hidden="true">01</span>
            <h3 className="about-editorial-title">About</h3>
            <ScrubWords
              className="about-editorial-body"
              progress={scrollYProgress}
              range={[0.29, 0.44]}
              text={ABOUT_TEXT}
            />
          </div>
        </motion.div>

        {/* 02 — Skills, crossing mid-flight */}
        <motion.div className="about-space-panel" style={{ x: panel2X }}>
          <SkillsPanel />
        </motion.div>

      </div>
    </section>
  );
}
