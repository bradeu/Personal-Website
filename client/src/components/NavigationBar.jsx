import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button, 
  Avatar,
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Divider} from "@nextui-org/react";
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
        <Dropdown backdrop="blur">
      <DropdownTrigger>
      <Button as={Link} color="primary" href="#" variant="flat">
            Connect
          </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="github" href="https://github.com/bradeu">GitHub</DropdownItem>
        <DropdownItem key="linkedin" href="https://linkedin.com/in/besakran">linkedIn</DropdownItem>
        <DropdownItem key="instagram" href="https://www.instagram.com/bradley.eugene/">Instagram</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
