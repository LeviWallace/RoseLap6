import { Button } from "@heroui/button";

type SimulationPageProps = {
    id: string;
}


export default function SimulationPage(props: SimulationPageProps) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="m-2 border-1 border-gray-200 rounded-xl shadow-lg">
                <div className="flex flex-row justify-between items-center p-4 border-b-1 border-gray-200">
                    <h1>{props.id}</h1>
                    <div className="flex flex-row space-x-4">
                        <a className="font-thin">Overview</a>
                        <a className="font-thin">Results</a>
                        <a className="font-thin">Settings</a>
                        <a className="font-thin">Logs</a>
                    </div>
                    <div className="flex flex-row">
                        <Button>Go Back</Button>
                    </div>

                </div>
                <div className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight">Simulation Dashboard</h1>
                        <div className="flex flex-row space-x-4 items-center">
                            <a>Date Time</a>
                            <Button>Download</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}