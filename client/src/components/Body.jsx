import React from "react";

export default function Body() {
    return (
        <div className="body-container">
            <h1 className="flex items-center justify-center font-extrabold p-4">Hello, I'm Bradley</h1>
            <div className="content-container grid grid-cols-2 gap-4">
                <img className="flex justify-center items-center p-4 rounded-full" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"/>
                <h2 className="flex justify-center items-center p-4 border-left-purple">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia sem at mollis tempus. Vivamus lacinia lacus eget fringilla ultricies. Nam maximus arcu et dui sodales, quis euismod libero luctus. Ut eleifend eleifend orci, eget interdum sem. Donec tincidunt in sapien nec bibendum. Fusce at mi facilisis, luctus neque a, tempor eros. Donec tortor velit, vehicula vel pharetra et, commodo et orci. Sed at mauris massa. Cras congue justo sem, eget dictum ipsum accumsan nec. Etiam sed nulla mollis, pulvinar ipsum nec, luctus mi. Sed ac metus eu enim pretium vulputate. Vivamus feugiat convallis tortor, et interdum metus varius non. Nulla lobortis mauris id nunc pellentesque placerat. Proin non turpis eu erat cursus vestibulum in sed felis. Praesent diam elit, semper at pretium eget, vehicula eget ex. Nulla vitae lorem magna.</h2>
            </div>
            <div className="background-container">
            <h2 className="flex justify-center items-center p-4 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia sem at mollis tempus. Vivamus lacinia lacus eget fringilla ultricies. Nam maximus arcu et dui sodales, quis euismod libero luctus. Ut eleifend eleifend orci, eget interdum sem. Donec tincidunt in sapien nec bibendum. Fusce at mi facilisis, luctus neque a, tempor eros. Donec tortor velit, vehicula vel pharetra et, commodo et orci. Sed at mauris massa. Cras congue justo sem, eget dictum ipsum accumsan nec. Etiam sed nulla mollis, pulvinar ipsum nec, luctus mi. Sed ac metus eu enim pretium vulputate. Vivamus feugiat convallis tortor, et interdum metus varius non. Nulla lobortis mauris id nunc pellentesque placerat. Proin non turpis eu erat cursus vestibulum in sed felis. Praesent diam elit, semper at pretium eget, vehicula eget ex. Nulla vitae lorem magna.</h2>
            </div>
        </div>
    )
}