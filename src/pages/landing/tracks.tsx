import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";

export default function TracksPage() {
    return (
        <DefaultLayout>
            <div className="w-full h-screen">
                <div className="flex flex-row gap-5 h-full">
                    <div className="w-1/4 h-1/2 border-1 border-white">
                        <div className="space-y-1 p-2 pb-1 m-2 border-b-1 border-white">
                            <h1 className="tracking-tighter font-bold text-xl">Banana Republic</h1>
                            <h2 className="tracking-wide font-thin">-Levi Wallace</h2>
                        </div>
                        <div className="h-80 bg-white m-2">

                        </div>
                        <div className="p-2">
                            <Button>View Track</Button>
                        </div>
                    </div>
                    <div className="w-1/4 h-1/2 border-1 border-white"></div>
                    <div className="w-1/4 h-1/2 border-1 border-white"></div>
                    <div className="w-1/4 h-1/2 border-1 border-white"></div>
                    <div className="w-1/4 h-1/2 border-1 border-white"></div>
                </div>
            </div>
        </DefaultLayout>
    )
}