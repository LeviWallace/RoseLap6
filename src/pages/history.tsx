import OverlayLayout from "@/layouts/overlay";
import Profile from "@/components/profile";

export default function HistoryPage() {
  const profiles = [
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
    {
      picture: "../src/assets/historypage/profiles/axel.jpg",
      name: "Axel Johnson",
      role: "Unsprung, Data & Sim Lead",
    },
  ];

  return (
    <OverlayLayout
      source="../src/assets/historypage/team2024.jpg"
      isVideo={false}
    >
      {/* Banner Text */}

      <div className="text-center">
        <h2 className="text-5xl text-white my-[20px] font-mono">
          Our Team Members
        </h2>
      </div>

      {/* Profiles */}
      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-4 gap-8 max-w-8xl">
          {profiles.map((profile, index) => (
            <Profile
              key={index}
              picture={profile.picture}
              name={profile.name}
              role={profile.role}
            />
          ))}
        </div>
      </div>
    </OverlayLayout>
  );
}
