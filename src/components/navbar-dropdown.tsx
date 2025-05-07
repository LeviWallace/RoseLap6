import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";
import { signOut } from "aws-amplify/auth";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { useMount } from "@/hooks/use-mount";

function handleGetUsername() {
  if (localStorage.getItem("username") === null) {
    return "";
  } else {
    return localStorage.getItem("username");
  }
}

/**
 * NavbarDropdown component renders a button that either prompts the user to log in
 * or displays a dropdown menu with account-related actions if the user is logged in.
 *
 * @component
 * @example
 * // Usage example:
 * <NavbarDropdown />
 *
 * @returns {JSX.Element} The rendered NavbarDropdown component.
 */
export default function NavbarDropdown() {
  const [username, setUsername] = useState(handleGetUsername);
  const { vehicle, track } = useMount();

  async function handleLogout() {
    localStorage.removeItem("username");
    setUsername("");
    await signOut();
    // TODO: Redirect to home page
  }

  return !username ? (
    <Button
      as={Link}
      color="primary"
      href={siteConfig.login.href}
      radius="full"
      size="lg"
    >
      {siteConfig.login.label}
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
        <Button color="primary" radius="full" size="lg">
          Hello, {username}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection showDivider className="">
          <DropdownItem
            key={siteConfig.home.href}
            color="primary"
            description={siteConfig.home.sublabel}
          >
            <Link color="foreground" href={siteConfig.home.href}>
              {siteConfig.home.label}
            </Link>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          {siteConfig.accountItems.map((item) => (
            <DropdownItem key={item.href} color="primary">
              <Link color="foreground" href={item.href}>
                {item.label}
              </Link>
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection>
        <DropdownItem
            key={siteConfig.simulate.href}
            color="primary"
            description={`${vehicle?.name ?? "Missing Vehicle"} | ${track?.name ?? "Missing Track"}`}
          >
            <Link color={vehicle != null && track != null ? "warning" : "foreground"} href={siteConfig.simulate.href}>
              <h1 className={(vehicle != null && track != null) ? "font-bold tracking-tighter" : ""}>{siteConfig.simulate.label}</h1>
            </Link>
          </DropdownItem>
        
        </DropdownSection>
        <DropdownItem
          key="delete"
          className="text-primary"
          color="secondary"
          onPress={handleLogout}
        >
          {siteConfig.logout.label}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
