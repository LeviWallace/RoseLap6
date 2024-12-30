import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";

function Footer() {
    return (
        <div className="min-h-[175px] w-full bg-background grid grid-cols-12 absolute">
            <div className="col-span-4 my-10 mx-6">
                <div className="flex flex-row">
                    <h1 className="text-foreground text-3xl italic tracking-tight inline font-semibold">Rose</h1>
                    <h1 className="text-primary text-3xl italic tracking-tight inline font-semibold">Lap</h1>
                    <h1 className="text-foreground text-3xl italic tracking-tight inline font-semibold">6</h1>
                </div>
                <h3 className="italic text-foreground font-thin">Rose-Hulman Institute of Technology's Formula SAE Team</h3>
                <h4 className="italic text-foreground font-thin">© RoseLap 2024</h4>
            </div>
            <div className="col-start-9 grid-col col-span-1 my-5 mx-10">
                <h5 className="font-bold text-foreground">Help</h5>
                <ul>
                    { siteConfig.help.map((item)  => (
                        <li key={item.label} className="text-xs text-foreground my-2 font-thin capitalize">
                            <Link key={item.label} to={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-start-11 grid-col col-span-1 my-5 mx-10">
                <h5 className="font-bold text-foreground">Platforms</h5>
                <ul>
                    { siteConfig.links.map((item)  => (
                    <li key={item.label} className="text-xs text-foreground my-2 font-thin capitalize">
                        <a href={item.href}>{item.label}</a>
                    </li>
                    ))}
                </ul>
            </div>
            
        </div>
    );
}

export default Footer;











