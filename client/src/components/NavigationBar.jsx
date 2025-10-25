import React, { useState, useEffect } from "react";
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
} from "@nextui-org/react";
import profileImage from '../public/bradley.jpg'


export default React.memo(function NavigationBar() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once to set initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

  return (
    <Navbar shouldHideOnScroll color="primary" className="navbar-mobile-responsive">
      {/* Mobile: Avatar as dropdown button */}
      <div className="sm:hidden">
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Avatar showFallback isBordered color="primary" src={profileImage} size="md" className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Navigation">
            <DropdownItem key="home" onClick={() => scrollToSection("home")}>
              Home
            </DropdownItem>
            <DropdownItem key="about" onClick={() => scrollToSection("about")}>
              About
            </DropdownItem>
            <DropdownItem key="contact" onClick={() => scrollToSection("contact")}>
              Contact
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Desktop: Regular avatar and name */}
      <div className="hidden sm:flex items-center gap-3">
        <Avatar showFallback isBordered color="primary" src={profileImage} size="md" />
      </div>
      <NavbarBrand className="hidden sm:flex">
        <p className="font-bold text-inherit">Bradley Eugene Sakran</p>
      </NavbarBrand>
      <NavbarContent className="flex gap-4 max-sm:hidden" justify="center">
        <NavbarItem
          isActive={activeSection === "home"}
        >
          <button onClick={() => scrollToSection("home")} className="nav-link-button">
            <span className={activeSection === "home" ? "link" : ""}>
              Home
            </span>
          </button>
        </NavbarItem>
        <NavbarItem
          isActive={activeSection === "about"}
        >
          <button onClick={() => scrollToSection("about")} className="nav-link-button">
            <span className={activeSection === "about" ? "link" : ""}>
              About
            </span>
          </button>
        </NavbarItem>
        <NavbarItem
          isActive={activeSection === "contact"}
        >
          <button onClick={() => scrollToSection("contact")} className="nav-link-button">
            <span className={activeSection === "contact" ? "link" : ""}>
              Contact
            </span>
          </button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Dropdown backdrop="blur">
      <DropdownTrigger>
      <Button color="primary" variant="flat">
            Connect
          </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="github" href="https://github.com/bradeu" target="_blank">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg fill="currentColor" height="20" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="20">
              <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
            </svg>
            <span>GitHub</span>
          </div>
        </DropdownItem>
        <DropdownItem key="linkedin" href="https://linkedin.com/in/besakran" target="_blank">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
            <span>LinkedIn</span>
          </div>
        </DropdownItem>
        <DropdownItem key="instagram" href="https://instagram.com/bradley.eugene/" target="_blank">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg aria-label="Instagram" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
              <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
            </svg>
            <span>Instagram</span>
          </div>
        </DropdownItem>
        <DropdownItem key="X" href="https://x.com/bradeudev" target="_blank">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="20" height="20">
              <path d="M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z"></path>
            </svg>
            <span>X</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
})
