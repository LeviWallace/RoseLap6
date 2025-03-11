import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function OverlayLayout({
  children,
  source,
  isVideo,
}: {
  children: React.ReactNode;
  source: string;
  isVideo: boolean;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <div className="absolute w-full z-10">
        <Navbar />
      </div>

      <div className="relative">
        {isVideo ? <video /> : <img src={source} />}
      </div>

      <main>{children}</main>

      <Footer />
    </div>
  );
}
