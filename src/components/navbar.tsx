import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { siteConfig } from "@/config/site";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { ThemeSwitch } from "./theme-switch";
import { useEffect, useState } from "react";
import { signOut, fetchUserAttributes } from "aws-amplify/auth";

// New import to change the color of the navbar items depending on which page
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const [username, setUsername] = useState<string | null>("");

  const handleGetLoginUser = async () => {
    try {
      const user: any = await fetchUserAttributes();
      setUsername(user["custom:firstName"]);
    } catch (error) {
      setUsername(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUsername(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetLoginUser();
  }, []);

  //New variables for navbar item color
  const location = useLocation();
  const isHistoryPage = location.pathname === "/history";
  const navTextColor = isHistoryPage ? "text-black" : "text-white";

  return (
    <NextUINavbar
      className="bg-transparent"
      isBlurred={false}
      shouldHideOnScroll
      maxWidth="full"
      position="sticky"
    >
      <NavbarBrand>
        <Link className="flex justify-start items-center" href="/">
          <h1 className="text-foreground text-3xl italic tracking-tight inline font-semibold">
            Rose
          </h1>
          <h1 className="text-primary text-3xl italic tracking-tight inline font-semibold">
            Lap
          </h1>
          <h1 className="text-foreground text-3xl italic tracking-tight inline font-semibold">
            6
          </h1>
        </Link>
      </NavbarBrand>

      <NavbarContent
        justify="center"
        className="relative z-10 bg-inherit mix-blend-difference"
      >
        <div className="hidden lg:flex gap-6 justify-center w-fit mix-blend-difference">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                color="foreground"
                className={`text-lg font-semibold tracking-tight ${navTextColor}`}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent justify="end" className="isolate">
        <NavbarItem>
          {username == null ? (
            <Button
              as={Link}
              color="primary"
              size="lg"
              radius="full"
              href="/login"
            >
              Log In
            </Button>
          ) : (
            <Dropdown
              showArrow
              classNames={{
                base: "before:", // change arrow background
                content: "border border-white bg-background",
              }}
            >
              <DropdownTrigger>
                <Button color="primary" size="lg" radius="full">
                  {username !== "" ? `Hello, ${username}` : "Loading..."}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownSection showDivider className="">
                  {siteConfig.dropdownAccountItems.map((item) => (
                    <DropdownItem
                      color="primary"
                      key={item.href}
                      description="View Account Settings"
                    >
                      <Link color="foreground" href={item.href}>
                        {item.label}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownSection>
                <DropdownSection showDivider>
                  {siteConfig.dropdownItems.map((item) => (
                    <DropdownItem color="primary" key={item.href}>
                      <Link color="foreground" href={item.href}>
                        {item.label}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownSection>
                <DropdownItem
                  key="delete"
                  className="text-primary"
                  color="secondary"
                  onPress={handleLogout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
