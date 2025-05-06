import { Link } from "@heroui/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import { ThemeSwitch } from "./theme-switch";
import NavbarDropdown from "./navbar-dropdown";

import { siteConfig } from "@/config/site";

/**
 * Navbar component that renders a navigation bar with brand name, navigation items, and additional controls.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @component
 * @example
 * // Example usage:
 * <Navbar />
 */

export default function Navbar() {
  return (
    <NextUINavbar
      shouldHideOnScroll
      className="bg-transparent"
      classNames={{ item: "mix-blend-difference" }}
      isBlurred={false}
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

      <NavbarContent className="relative z-10" justify="center">
        <div className="hidden lg:flex gap-6 justify-center w-fit">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="text-lg font-semibold tracking-tight"
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="isolate" justify="end">
        <NavbarItem>
          <NavbarDropdown />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
