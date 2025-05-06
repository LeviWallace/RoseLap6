import { Divider } from "@heroui/divider";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import bg from "@/assets/history-bg.jpg";

export default function HistoryPage() {
  return (
    <div className="bg-background">
      <div
        className="flex flex-col center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Navbar />
        <div className="flex flex-col justify-center h-3/4 items-center text-center">
          <div>
            <h2 className="text-5xl font-bold text-primary font-italianno italic">
              the
            </h2>
            <h1 className="text-9xl font-bold text-primary font-italianno italic">
              HISTORY
            </h1>
            <h2 className="text-5xl font-bold text-primary font-italianno italic">
              of
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen items-center text-center">
        <div className="w-4/5">
          <h1 className="mt-4 text-8xl font-bold font-geist tracking-tighter text-primary">
            ROSE-HULMAN GRAND PRIX ENGINEERING
          </h1>
          <Divider />
        </div>
        <p className="text-white text-2xl font-geist m-6">
          Founded in 2011, the Rose-Hulman Grand Prix Engineering team is a
          student-driven competition team, offering hands-on experience in
          designing, building, and racing formula-style cars.
        </p>
      </div>
      <div className="absolute w-full b-0">
        <Footer />
      </div>
    </div>
  );
}
