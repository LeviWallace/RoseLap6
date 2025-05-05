import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";


export default function SimulationPage() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "Simulation ID";

    return (
        <div className="flex flex-col w-full h-screen bg-white">
            <div className="m-2 border-1 border-gray-200 rounded-xl shadow-lg">
                <div className="flex flex-row justify-between items-center p-4 border-b-1 border-gray-200">
                    <div className="flex flex-row items-center space-x-8">
                        <h1 className="font-geist font-bold text-black tracking-tighter text-xl">{id}</h1>
                        <div className="flex flex-row space-x-4">
                            
                            <a className="text-black">Overview</a>
                            <a className="text-black">Results</a>
                            <a className="text-black">Settings</a>
                            <a className="text-black">Logs</a>
                        </div>
                    </div>
                    <div className="flex flex-row">
                    <Button as={Link} to="/" className="text-foreground text-md px-6" color="primary" size="lg" radius="sm">Back Home</Button>
                    </div>

                </div>
                <div className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-black">Simulation Dashboard</h1>
                        <div className="flex flex-row space-x-4 items-center">
                            <a className="text-black">Date Time</a>
                            <Button>Download</Button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <Tabs aria-label="Options" color="foreground" defaultValue="photos" className="w-full" classNames={{ tabContent: "text-black group-data-[selected=true]:text-black", tabList: "bg-gray-100" }}>
                            <Tab key="photos" title="Photos" color="primary">
                                <div>

                                </div>
                            </Tab>
                            <Tab key="music" title="Music">
                                <div>
                                    
                                </div>
                            </Tab>
                            <Tab key="videos" title="Videos">
                                <div>
                                    
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )

}