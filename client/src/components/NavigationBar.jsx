import React from "react";
import { Link } from "react-router-dom"
import { usePageContext } from "../PageContext";
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
  Link as NextUILink
} from "@nextui-org/react";
import profileImage from '../public/profile.jpg'


export default React.memo(function NavigationBar() {

    const { page, handleSetActivePage } = usePageContext();

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
          <Link to="/" onClick={() => handleSetActivePage("about")} preventScrollReset={false}>
          <span
          className={page === "about" ? "link" : ""} 
          aria-current={page === "about" ? "page" : ""}>

            About
          </span>
          </Link>
        </NavbarItem>
        <NavbarItem 

        isActive={page === "resume"}
        
        >
          <Link to="/resume" onClick={() => handleSetActivePage("resume")} preventScrollReset={false} >
          <span
          className={page === "resume" ? "link" : ""} 
          aria-current={page === "resume" ? "page" : ""}>

            Resume
          </span>
          </Link>
        </NavbarItem>
        <NavbarItem

        isActive={page === "contact"}
        
        >
          <Link to="/contact" onClick={() => handleSetActivePage("contact")} preventScrollReset={false}>
          <span
          className={page === "contact" ? "link" : ""} 
          aria-current={page === "contact" ? "page" : ""}>

            Contact
          </span>
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
