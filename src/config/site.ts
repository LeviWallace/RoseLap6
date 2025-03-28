export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "RoseLap6",
  description: "A Laptime Simulation Tool used for Rose-Hulman's GPE Team",
  login: {
    label: "Sign In",
    href: "/auth",
  },
  logout: {
    label: "Sign Out",
    href: "/",
  },
  account: {
    label: "My Account",
    sublabel: "View Account Settings",
    href: "/landing",
  },
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "My Account",
      href: "/landing",
    },
    {
      label: "History",
      href: "/history",
    },
  ],
  accountItems: [
    {
      label: "Vehicles",
      href: "/landing/vehicles",
    },
    {
      label: "Tracks",
      href: "/landing/tracks",
    },
    {
      label: "Previous Sweeps",
      href: "/landing/sweeps",
    },
  ],
  links: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/rosegpeofficial",
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@rosegpeofficial",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/RoseGPE",
   },
   {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/rosegpe/",
   },
    {
      label: "LinkTree",
      href: "https://linktr.ee/rosegpeofficial",
   },
  ],
  help: [
    {
      label: "Q&As",
      href: "/somewhere",
    },
  ],
};
