import { siteConfig } from "@/config/site";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { Link } from "@heroui/link";
import { signOut } from "aws-amplify/auth";
import { useState } from "react";
import { useMount } from "@/hooks/use-mount";


function handleGetUsername()
{
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
	const [vehicle, track] = useMount();

    async function handleLogout() {
        localStorage.removeItem("username");
        setUsername("");
        await signOut();
        // TODO: Redirect to home page
    }

    return (
        (!username) ?
        <Button as={Link} color="primary" size="lg" radius="full" href={siteConfig.login.href}>{siteConfig.login.label}</Button>
        :
        <Dropdown
            showArrow
            classNames={{
                base: "before:", // change arrow background
                content: "border border-white bg-background",
            }}>
            <DropdownTrigger>
                <Button
                    color="primary" size="lg" radius="full"
                >
                    Hello, {username}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownSection showDivider className="">
                    <DropdownItem color="primary" key={siteConfig.account.href} description={siteConfig.account.sublabel}>
                        <Link
                            color="foreground"
                            href={siteConfig.account.href}
                        >
                            {siteConfig.account.label}
                        </Link>
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    {siteConfig.accountItems.map((item) => (
                        <DropdownItem color="primary" key={item.href}>
                            <Link
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </Link>
                        </DropdownItem>
                    ))}
                </DropdownSection>
				<DropdownSection>
					<DropdownItem key="vehicle" isDisabled={vehicle == undefined}>
						Mounted: {vehicle != undefined ? vehicle.name : "Missing Vehicle"}	
					</DropdownItem>

					<DropdownItem color="secondary" key="track" isDisabled={track == undefined}showDivider>
						Mounted: {track != undefined ? track.name : "Missing Track"}
					</DropdownItem>
				</DropdownSection>
                <DropdownItem key="delete" className="text-primary" color="secondary" onPress={handleLogout}>
                    {siteConfig.logout.label}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
