import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function ResumeBody() {
    return (
        <div className="card-container">
        <h1>Activities</h1>
        <Card className="card max-w-3xl">
          <CardHeader className="flex gap-3">
          <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
            <div className="flex flex-col">
              <p className="text-md">Bina Bangsa School Prefectorial Board | 09/2019 – 10/2022</p>
              <p className="text-small text-default-500">Head of Publication & Documentation Committee</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Working as a leader to help and guide members to move forward as one of the committees in the Prefectorial Board. Specifically on aspects of photography as well as videography.</p>
          </CardBody>
        </Card>
        <Card className="card max-w-3xl">
          <CardHeader className="flex gap-3">
          <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
            <div className="flex flex-col">
              <p className="text-md">Excelsior ! | 01/2022 – 10/2022</p>
              <p className="text-small text-default-500">Chief of Staff</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Planning and managing coordination within the organization as Bina Bangsa School magazine publisher.</p>
          </CardBody>
        </Card>
        <Card className="card max-w-3xl">
          <CardHeader className="flex gap-3">
          <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
            <div className="flex flex-col">
              <p className="text-md">BBS World | 10/2021 – 10/2022</p>
              <p className="text-small text-default-500">Director of Editorial</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Planning and managing coordination in the video editing aspects within the organization as a Bina Bangsa School news video publisher.</p>
          </CardBody>
        </Card>
        <Card className="card max-w-3xl">
          <CardHeader className="flex gap-3">
          <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
            <div className="flex flex-col">
              <p className="text-md">TEDx Pasar Baru | 09/2021 – 01/2022</p>
              <p className="text-small text-default-500">Video Editor</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Video editor for a universally known TED event that allows people to share interesting stories in different aspects of their lives.</p>
          </CardBody>
        </Card>
        </div>
      );
}