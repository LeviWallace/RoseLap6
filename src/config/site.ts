export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "RoseLap6",
  description: "A Laptime Simulation Tool used for Rose-Hulman's GPE Team",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "My Account",
      href: "/my",
    },
    {
      label: "History",
      href: "/history",
    }
  ],
  accountItems: [
    {
      label: "Vehicles",
      href: "/my/vehicles",
    },
    {
      label: "Tracks",
      href: "/my/tracks",
    },
    {
      label: "Previous Sweeps",
      href: "/my/sweeps",
    }
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
  dropdownAccountItems: [
    {
      label: "My Account",
      href: "/my/account",
    },
  ],
  dropdownItems: [
    {
      label: "Vehicles",
      href: "/my/vehicles",
    },
    {
      label: "Tracks",
      href: "/my/tracks",
   },
   {
      label: "Sweeps",
      href: "/my/sweeps",
   },
  ]
};
