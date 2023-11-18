import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Avatar} from "@nextui-org/react";
import profileImage from '../public/profile.jpg'

export default function NavigationBar() {
  return (
    <Navbar shouldHideOnScroll color="primary">
      <Avatar showFallback isBordered color="primary" src={profileImage} size="md" />
      <NavbarBrand>
        <p className="font-bold text-inherit">Bradley Eugene Sakran</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link color="foreground" href="#">
            Resume
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
