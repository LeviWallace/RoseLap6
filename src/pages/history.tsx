import OverlayLayout from "@/layouts/overlay";
import Profile from "@/components/profile";
import { profileConfig } from "@/config/profiles";

export default function HistoryPage() {
  return (
    <OverlayLayout
      source="../src/assets/historypage/team2024.jpg"
      isVideo={false}
    >
      <div className="relative bg-[#800000] p-[20px] w-full my-0 mx-auto">
        <h2 className="text-center text-5xl text-white pt-[20px] font-mono">
          What is Formula SAE?
        </h2>
        <p className="text-left text-2xl py-[10px] px-[150px] pb-[30px] text-white font-mono">
          Formula SAE or FSAE is a student design competition organized and
          managed by SAE International. The goal is for students to develop,
          construct, and race a small Formula-style racecar. This competition
          enables engineering students to put their engineering design and
          project management skills to use, which culminates in a challenging
          series of static and dynamic events that test numerous aspects of the
          racecar, including design, cost, acceleration, endurance, skid pad,
          autocross, and trackdrive.
        </p>
        <p className="text-left text-2xl py-[10px] px-[150px] pb-[30px] text-white font-mono">
          Since FSAE's inception in 1981, the competition has garnered
          tremendous engagement from universities across the world. Currently,
          there are over 20 FSAE competitions managed by SAE International
          around the world. In just the US, there are 120 different universities
          competing at Formula SAE Michigan 2024, which takes place at the
          Michigan International Speedway.
        </p>
      </div>

      <div className="relative bg-white p-[20px] w-full my-0 mx-auto">
        <h2 className="text-center text-5xl text-[#800000] pt-[20px] font-mono">
          Rose-Hulman Grand Prix Engineering
        </h2>
        <p className="text-left text-2xl py-[10px] px-[150px] pb-[30px] text-[#800000] font-mono">
          Rose-Hulman Grand Prix Engineering or RoseGPE is a student-operated
          team that represents Rose-Hulman's participation in FSAE. Founded in
          2011, RoseGPE is comprised of young and motivated engineers who share
          a passion for formula racing. The team is divided into several
          subteams which each focus on a specific aspect of the racecar, such as
          chassis, powertrain, electrical, aerodynamics, and more. All of the
          components from each subteam come together in tandem to bring the
          entire system to competition. We promote an Agile framework to plan,
          manage, and execute our projects. Team members can start individual
          projects, such as engineering a laptimer solution, and also work on
          the larger systems, such as welding the chassis or wiring up the
          harness.
        </p>
      </div>

      {/* Banner Text */}
      <div className="text-center">
        <h2 className="text-5xl text-white my-[20px] font-mono">
          Our Team Members
        </h2>
      </div>

      {/* Profiles */}
      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-4 gap-8 max-w-8xl">
          {profileConfig.map((profile, index) => (
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
