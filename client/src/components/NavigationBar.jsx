import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button, 
  Avatar,
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Link} from "@nextui-org/react";
import profileImage from '../public/profile.jpg'


export default React.memo(function NavigationBar({page, handleSetActivePage}) {

  return (
    <Navbar shouldHideOnScroll color="primary">
      <Avatar showFallback isBordered color="primary" src={profileImage} size="md" />
      <NavbarBrand>
        <p className="font-bold text-inherit">Bradley Eugene Sakran</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem 

        isActive={page === "about"}
        
        >
          <Link 
          onClick={() => handleSetActivePage("about")}
          color={page !== "about" ? "foreground" : ""} 
          aria-current={page === "about" ? "page" : ""}
          href="/">

            About
          </Link>
        </NavbarItem>
        <NavbarItem 

        isActive={page === "resume"}
        
        >
          <Link 
          onClick={() => handleSetActivePage("resume")}
          color={page !== "resume" ? "foreground" : ""} 
          aria-current={page === "resume" ? "page" : ""}
          href="/resume">

            Resume
          </Link>
        </NavbarItem>
        <NavbarItem
        
        isActive={page === "contact"}
        
        >
          <Link 
          onClick={() => handleSetActivePage("contact")}
          color={page !== "contact" ? "foreground" : ""} 
          aria-current={page === "contact" ? "page" : ""}
          href="/contact">

            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
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
})
