import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import bg from "@/assets/bg.mp4";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  return (
    <div className="bg-background">
      <div className="h-screen w-full">
        <video className="absolute top-0 object-cover -z-5 mix-blend-difference" src={bg} loop muted autoPlay></video>
        <Navbar />

        <div className="flex flex-row m-10 mx-20 z-10 relative">
          <div className="bg-background rounded-radius z-20 p-4 rounded-radius border-1 border-foreground w-1/3">
            <h1 className="text-4xl text-left font-bold font-foreground">Experience our breath-taking simulation technology</h1>
            <div className="mt-10 flex justify-start">
              <Button as={Link} href="/login" className="text-black text-md" color="primary" size="lg" radius="full">&nbsp;Check it out&nbsp;</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
