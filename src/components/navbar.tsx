import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
  return (
    <NextUINavbar className="bg-transparent" isBlurred={false} shouldHideOnScroll maxWidth="full" position="sticky">
      <NavbarBrand>
        <Link
          className="flex justify-start items-center"
          href="/"
        >
          <h1 className="text-foreground text-3xl italic tracking-tight inline font-semibold">Rose</h1>
          <h1 className="text-primary text-3xl italic tracking-tight inline font-semibold">Lap</h1>
          <h1 className="text-foreground text-3xl italic tracking-tight inline font-semibold">6</h1>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center" className="relative z-10">
        <div className="hidden lg:flex gap-6 justify-center w-fit">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                color="foreground"
                className="text-lg font-semibold tracking-tight"
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
          <Button as={Link} color="primary" size="lg" radius="full" href="/login">Log In</Button>
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
