import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { Amplify } from "aws-amplify";

import outputs from "./../../amplify_outputs.json";

import bg from "@/assets/bg.mp4";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

Amplify.configure(outputs);

/**
 * The `IndexPage` component serves as the main landing page for the application.
 * It includes a full-screen background video, a navigation bar, and a call-to-action section.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function IndexPage() {
  return (
    <div className="bg-background">
      <div className="h-screen w-full">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 object-cover -z-5 mix-blend-difference min-h-screen"
          src={bg}
        />
        <Navbar />

        <div className="flex flex-row m-10 mx-20 z-10 relative h-max">
          <div className="bg-background rounded-radius z-20 p-8 rounded-radius border-1 border-foreground sm:w-4/5 md:w-3/5 lg:w-2/5">
            <h1 className="text-5xl text-left font-bold text-foreground">
              Experience our breath-taking simulation technology
            </h1>
            <div className="mt-10 flex justify-start">
              <Button
                as={Link}
                className="text-foreground text-md px-6"
                color="primary"
                radius="full"
                size="lg"
                to="/landing"
              >
                Check it out
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
