import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import bradleyPic from "../public/bradley.jpg"
import BradleysResume from "../public/Bradley_s_Resume.pdf"


export default function AboutBody() {
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

    return (
        <div className="body-container">
            <motion.h1
                className="flex items-center justify-center font-extrabold p-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                Hello, I'm Bradley
            </motion.h1>
            <div className="content-container grid grid-cols-2 gap-4">
                <motion.div
                    className="image-container"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                    <motion.img
                        className="flex justify-center items-center p-4 rounded-full"
                        src={bradleyPic}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                </motion.div>
                <motion.h2
                    className="flex justify-center items-center p-4 border-left-purple"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                    I'm a student enrolled in the Faculty of Science at University of British Columbia, aiming to pursue a major in computer science. Beyond my studies, I've independently delved into web development, becoming proficient as a full-stack developer. I've honed my skills during my free time, now adept at crafting web applications with an Express back end and React front end.
                </motion.h2>
            </div>
            <motion.div
                className="background-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
                <h2 className="flex justify-center items-center p-4 text-base">I am an Indonesian student currently residing in Vancouver, Canada. I started my programming journey prior to the pandemic. However, I never expected myself to dive deep into the realm of web development. Despite my proficiency in Python, I chose to push my boundaries and immerse myself in this field. Throughout this journey, I acquired substantial knowledge, progressing from fundamental JavaScript to mastering MERN websites.</h2>
            </motion.div>

            <motion.div
                className="resume-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
                <h2 className="resume-section-title">Want to know more?</h2>
                <p className="resume-section-subtitle">Check out my full resume for detailed experience and skills</p>
                <div className="resume-actions-about">
                    <Button
                        size="lg"
                        className="resume-btn-primary"
                        onClick={handleDownloadResume}
                    >
                        Download Resume
                    </Button>
                    <Button
                        size="lg"
                        variant="bordered"
                        className="resume-btn-secondary"
                        onClick={handleViewResume}
                    >
                        View Resume
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}