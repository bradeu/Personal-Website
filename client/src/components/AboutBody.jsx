import React from "react";
import bradleyPic from "../public/bradley-picture.png"


export default function AboutBody() {
    return (
        <div className="body-container">
            <h1 className="flex items-center justify-center font-extrabold p-4">Hello, I'm Bradley</h1>
            <div className="content-container grid grid-cols-2 gap-4">
                <div className="image-container">
                <img className="flex justify-center items-center p-4 rounded-full" src={bradleyPic}/>
                </div>
                <h2 className="flex justify-center items-center p-4 border-left-purple">I’m a student enrolled in the Faculty of Science at University of British Columbia, aiming to pursue a major in computer science. Beyond my studies, I've independently delved into web development, becoming proficient as a full-stack developer. I've honed my skills during my free time, now adept at crafting web applications with an Express back end and React front end.</h2>
            </div>
            <div className="background-container">
            <h2 className="flex justify-center items-center p-4 text-base">I am an Indonesian student currently residing in Vancouver, Canada. I started my programming journey prior to the pandemic. However, I never expected myself to dive deep into the realm of web development. Despite my proficiency in Python, I chose to push my boundaries and immerse myself in this field. Throughout this journey, I acquired substantial knowledge, progressing from fundamental JavaScript to mastering MERN websites.</h2>
            </div>
        </div>
    )
}