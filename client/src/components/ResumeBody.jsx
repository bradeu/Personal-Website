import React from "react";
import {Card, CardHeader, CardBody, Divider, Button, Image} from "@nextui-org/react";
import BradleysResume from "../public/Bradley's Resume.pdf"
import PrefectLogo from "../public/prefect-logo.png"
import ExcelsiorLogo from "../public/excelsior-logo.png"
import BBSWLogo from "../public/bbsw-logo.png"
import TedXLogo from "../public/tedx-logo.png"
import QSiteLogo from "../public/qsite-logo.png"

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
          src={PrefectLogo}
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
          src={ExcelsiorLogo}
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
          src={BBSWLogo}
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
          src={TedXLogo}
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
        <Card className="card max-w-3xl">
          <CardHeader className="flex gap-3">
          <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={QSiteLogo}
          width={40}
        />
            <div className="flex flex-col">
              <p className="text-md">QSITE | 09/2021 – 09/2023</p>
              <p className="text-small text-default-500">Front Desk</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Manages check in on a spreadsheet and provide instructions for guests and speakers</p>
          </CardBody>
        </Card>
        <Button className="anchor-container">
        <a href={BradleysResume}>View More...</a>
        </Button>
        </div>
      );
}