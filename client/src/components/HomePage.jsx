import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import bradleyPic from "../public/bradley_profile.jpg";
import BradleysResume from "../public/Bradley_s_Resume.pdf";

export default function HomePage() {
    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = BradleysResume;
        link.download = "Bradley_Eugene_Sakran_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            <div className="home-container">
                <motion.div
                    className="home-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        className="home-image-wrapper"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <motion.img
                            src={bradleyPic}
                            alt="Bradley Eugene Sakran"
                            className="home-profile-image"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    </motion.div>

                    <motion.h1
                        className="home-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    >
                        Bradley Eugene Sakran
                    </motion.h1>

                    <motion.p
                        className="home-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                        Engineer | Builder | Student
                    </motion.p>

                    <motion.p
                        className="home-description"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    >
                        {/* Crafting elegant web applications with Express and React. */}
                        {/* Quite good with AI I guess... */}
                        Currently studying at the University of British Columbia,<br />
                        and building some cool stuff in my free time.
                    </motion.p>

                    <motion.div
                        className="home-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    >
                        <Button
                            size="lg"
                            className="home-btn-primary"
                            onClick={() => scrollToSection('contact')}
                        >
                            Get in Touch
                        </Button>
                        <Button
                            size="lg"
                            variant="bordered"
                            className="home-btn-secondary"
                            onClick={handleViewResume}
                        >
                            View Resume
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                    onClick={() => scrollToSection('about')}
                >
                    <span>Scroll to explore</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
