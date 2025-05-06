import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { type Schema } from '@/../amplify/data/resource';
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import {CircularProgress} from "@heroui/progress";

const client = generateClient<Schema>();

type Simulation = Schema['Simulation']['type'];

export default function SimulationPage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "Error: No ID found";
    const [simulation, setSimulation] = useState<Simulation | null>(null);

    async function handleGenerateSimulation() {
        const { data, errors } = await client.models.Simulation.get({ id });
        if (errors) {
            console.error(errors);
            return;
        }
        const simulationData = data as Simulation;
        setSimulation(simulationData);
        console.log(data, simulationData);
    }

    useEffect(() => {
        handleGenerateSimulation();
    }, []);

    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <div className="m-2 border-1 border-gray-200 rounded-xl shadow-lg min-h-[98vh]">
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
                        <Button as={Link} to="/" className="text-foreground text-md px-6" color="primary" size="lg" radius="lg">Back Home</Button>
                    </div>
                </div>
                <div className="p-5 h-full">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-black">Simulation Dashboard</h1>
                        <div className="flex flex-row space-x-4 items-center">
                            <a className="text-black">Date Time</a>
                            <Button className="bg-black text-white">Download</Button>
                        </div>
                    </div>
                    <div className="mt-5 h-full">
                        {!(simulation && simulation.completed) ? (
                            <Tabs aria-label="Options" defaultValue="photos" className="w-full" classNames={{ tabContent: "text-black group-data-[selected=true]:text-white", tabList: "bg-gray-100", tab: "bg-transparent" }}>
                                <Tab key="vehicle" title="Vehicle" color="primary">
                                    <div className="flex flex-row justify-between items-center mt-5">
                                        <Card className="w-[24%] bg-white">
                                            <CardHeader className="pb-2">
                                                <h1 className="font-semibold text-black px-3 pt-2">Total Revenue</h1>
                                            </CardHeader>
                                            <CardBody className="pb-0 pt-0">
                                                <h1 className="text-2xl font-bold text-black px-3">$45,231.89</h1>
                                            </CardBody>
                                            <CardFooter className="pb-5 pt-0">
                                                <h1 className="font-thin text-black px-3">+20.1% from last month</h1>
                                            </CardFooter>
                                        </Card>
                                        <Card className="w-[24%] bg-white">
                                            <CardHeader className="pb-2">
                                                <h1 className="font-semibold text-black px-3 pt-2">Total Revenue</h1>
                                            </CardHeader>
                                            <CardBody className="pb-0 pt-0">
                                                <h1 className="text-2xl font-bold text-black px-3">$45,231.89</h1>
                                            </CardBody>
                                            <CardFooter className="pb-5 pt-0">
                                                <h1 className="font-thin text-black px-3">+20.1% from last month</h1>
                                            </CardFooter>
                                        </Card>
                                        <Card className="w-[24%] bg-white">
                                            <CardHeader className="pb-2">
                                                <h1 className="font-semibold text-black px-3 pt-2">Total Revenue</h1>
                                            </CardHeader>
                                            <CardBody className="pb-0 pt-0">
                                                <h1 className="text-2xl font-bold text-black px-3">$45,231.89</h1>
                                            </CardBody>
                                            <CardFooter className="pb-5 pt-0">
                                                <h1 className="font-thin text-black px-3">+20.1% from last month</h1>
                                            </CardFooter>
                                        </Card>
                                        <Card className="w-[24%] bg-white">
                                            <CardHeader className="pb-2">
                                                <h1 className="font-semibold text-black px-3 pt-2">Total Revenue</h1>
                                            </CardHeader>
                                            <CardBody className="pb-0 pt-0">
                                                <h1 className="text-2xl font-bold text-black px-3">$45,231.89</h1>
                                            </CardBody>
                                            <CardFooter className="pb-5 pt-0">
                                                <h1 className="font-thin text-black px-3">+20.1% from last month</h1>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                    <div className="flex flex-row justify-between items-center mt-5">
                                        <Card className="w-[59%] bg-white">
                                            <CardHeader className="pb-2">
                                                <h1 className="font-bold text-black px-3 pt-2">GGV Plot</h1>
                                            </CardHeader>
                                            <CardBody className="pb-0 pt-0">
                                                <div>
                                                    <img src="https://placehold.co/600x400/EEE/31343C" alt="GGV Plot" className="w-full h-auto" />
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card className="w-[39%] bg-white">
                                            <CardHeader className="pb-2">
                                                <div className="flex-row justify-between items-center">
                                                    <h1 className="font-bold text-black px-3 pt-2">Recent Sales</h1>
                                                    <h2 className="font-thin text-black px-3">Last 30 days</h2>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="pb-0 pt-0">

                                            </CardBody>
                                        </Card>
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
                            </Tabs>)
                            :
                            <div className="flex flex-col justify-center items-center h-fit">
                                <CircularProgress
                                    classNames={{
                                        svg: "w-36 h-36 drop-shadow-md",
                                        indicator: "stroke-black",
                                        track: "stroke-white/90",
                                        value: "text-1xl font-semibold text-black",
                                    }}
                                    showValueLabel={true}
                                    strokeWidth={1}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

}