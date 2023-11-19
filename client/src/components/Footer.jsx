import React from "react";
import githubLogo from "../public/github-logo.png"
import linkedinLogo from "../public/linkedin-logo.png"
import instagramLogo from "../public/instagram-logo.png"

export default function Footer(){
    return (
        <>
        <footer className="rounded-lg shadow m-4">
            <div className="footer-container">
                <p>© 2023 Bradley Eugene Sakran</p>
                <ul className="links">
                    <li>
                        <a href="https://github.com/bradeu">
                            <img src={githubLogo} />
                            </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/besakran" >
                            <img src={linkedinLogo} />
                            </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/bradley.eugene/" >
                            <img src={instagramLogo} />
                            </a>
                    </li>
                </ul>
            </div>
        </footer>
        </>
    )
}