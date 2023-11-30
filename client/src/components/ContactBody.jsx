import React from "react";
import {Button} from "@nextui-org/react";

export default function ContactBody() {
    return <div className="contact">
        <div className="contact-container">
            <h1>Let's get in touch !</h1>
            <div className="reach-out-container">
            <h2>I'd love to connect with you. Here's how you can reach out...</h2>
            <div className="button-container">
            <a href="https://linkedin.com/in/besakran">
                <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                LinkedIn
                </Button>
            </a>
            <a href="https://www.instagram.com/bradley.eugene/">
                <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                Instagram
                </Button>
            </a>
            <a href="mailto:bradeu01@gmail.com">
                <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                Email
                </Button>
            </a>
            </div>
            </div>
        </div>
    </div>
}