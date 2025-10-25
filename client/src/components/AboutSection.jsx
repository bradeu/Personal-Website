import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
    const sectionRef = useRef(null);
    const journeyRef = useRef(null);
    const backgroundRef = useRef(null);
    const skillsRef = useRef(null);

    // Scroll progress for the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Transform scroll progress to scale and opacity for each subsection
    // Journey: visible from 0 to 0.33
    const journeyScale = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.4], [0.7, 1, 1, 0.7]);
    const journeyOpacity = useTransform(scrollYProgress, [0, 0.15, 0.33, 0.4], [0, 1, 1, 0]);

    // Background: visible from 0.33 to 0.66
    const backgroundScale = useTransform(scrollYProgress, [0.3, 0.45, 0.66, 0.73], [0.7, 1, 1, 0.7]);
    const backgroundOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.66, 0.73], [0, 1, 1, 0]);

    // Skills: visible from 0.66 to 1
    const skillsScale = useTransform(scrollYProgress, [0.63, 0.78, 1], [0.7, 1, 1]);
    const skillsOpacity = useTransform(scrollYProgress, [0.63, 0.78, 1], [0, 1, 1]);

    return (
        <section id="about" className="about-section-scroll" ref={sectionRef}>
            <div className="about-scroll-container">
                <motion.div
                    className="about-scroll-item"
                    ref={journeyRef}
                    style={{ scale: journeyScale, opacity: journeyOpacity }}
                >
                    <div className="about-text-content">
                        <h3 className="about-heading">My Journey</h3>
                        <p className="about-paragraph">
                            Hi! 👋
                            I’m a Computer Science student at the University of British Columbia, 
                            happened to be obsessed with building things that feel alive — tools that remember, learn, and make people go “wait, that was smart.” 
                            I started as a curious kid hacking together websites, and now I'm deep into crafting full-stack, AI-powered experiences that scale.
                            Every project is a chance to push further into creating value for people. <br />
                            <br />
                            <strong>Experimenting. Shipping. Just getting started.</strong>
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="about-scroll-item"
                    ref={backgroundRef}
                    style={{ scale: backgroundScale, opacity: backgroundOpacity }}
                >
                    <div className="about-text-content">
                        <h3 className="about-heading">Background</h3>
                        <p className="about-paragraph">
                            I was born and raised in Indonesia and now call Vancouver my second home.
                            I’ve grown by stepping into many roles — from organizing student communities to building and shipping software used in real settings. 
                            Being in a fast-paced environment surrounded by diverse people and ideas shaped how I think: 
                            stay curious, stay adaptable, and keep creating. I’m passionate about crafting technology that feels reliable, intuitive, and genuinely helpful.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="about-scroll-item"
                    ref={skillsRef}
                    style={{ scale: skillsScale, opacity: skillsOpacity }}
                >
                    <div className="about-text-content about-skills">
                        <h3 className="about-heading">Skills & Technologies</h3>
                        <div className="skills-grid">
                            <div className="skill-category">
                                <h4>Frontend</h4>
                                <p>React, Next.js, TypeScript, Tailwind</p>
                            </div>
                            <div className="skill-category">
                                <h4>Backend & Infrastructure</h4>
                                <p>FastAPI, Gin, Node.js, PostgreSQL, Redis, Celery, Docker</p>
                            </div>
                            <div className="skill-category">
                                <h4>Languages</h4>
                                <p>Python, Go, JavaScript, TypeScript, Java, C++, C</p>
                            </div>
                            <div className="skill-category">
                                <h4>AI/ML & Data Systems</h4>
                                <p>Data & AI Pipelines, RAG, Pinecone/Qdrant, NLP tooling</p>
                            </div>
                            <div className="skill-category">
                                <h4>Tools</h4>
                                <p>Git, Postman, VS Code, Linux</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
