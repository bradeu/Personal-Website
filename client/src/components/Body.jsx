import React from "react";
import {Card, CardBody, Divider, Image} from "@nextui-org/react";

export default function Body() {
    return (
        <div>
            <h1 className="flex items-center justify-center font-bold text-inherit">Hello, I'm Bradley</h1>
            <Divider className="my-4" />
            <Image
            width={300}
            alt="NextUI hero Image"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            />
            <Divider orientation="vertical" />
            <h2>I am a full stack developer, I built this website using react and a couple of libraries.</h2>
        </div>
    )
}