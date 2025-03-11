import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import bg from "@/assets/bg.mp4";
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { Amplify } from "aws-amplify"
import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/api"
import outputs from "./../../amplify_outputs.json"

Amplify.configure(outputs)

const client = generateClient<Schema>()

export default function IndexPage() {

  const test = () => {
    client.queries.test({
      name: "Amplify",
    })
  }

  return (
    <div className="bg-background">
      <div className="h-screen w-full">
        <video className="absolute top-0 object-cover -z-5 mix-blend-difference" src={bg} loop muted autoPlay></video>
        <Navbar />

        <div className="flex flex-row m-10 mx-20 z-10 relative h-max">
          <div className="bg-background rounded-radius z-20 p-8 rounded-radius border-1 border-foreground w-2/5">
            <h1 className="text-5xl text-left font-bold text-foreground">Experience our breath-taking simulation technology</h1>
            <div className="mt-10 flex justify-start">
              <Button as={Link}
                      onPress={test}
                      href="/login" className="text-foreground text-md px-6" color="primary" size="lg" radius="full">Check it out</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
