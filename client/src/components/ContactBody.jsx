import React from "react";
import { motion } from "framer-motion";

export default function ContactBody() {
    return <div className="contact">
        <motion.div
            className="contact-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                className="reach-out-container"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
                <h1>Let's get in touch !</h1>
                <h2>I'd love to hear from you.<br/> Here's how you can reach out...</h2>
            </motion.div>

            <motion.div
                className="information-container"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
                <div>
                    <h2>Contact me at</h2>
                    <p>bradeu01@gmail.com</p>
                </div>
                <div>
                    <h2>Based in</h2>
                    <p>Vancouver, <br/>British Columbia, Canada</p>
                </div>
            </motion.div>
        </motion.div>
    </div>
}