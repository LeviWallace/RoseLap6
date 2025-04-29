import { Button } from "@heroui/button"
import DefaultLayout from "@/layouts/default";
import outputs from "../../../amplify_outputs.json"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../../amplify/data/resource";
import VehicleCard from "@/components/vehicles/vehicle-card";
import TrackCard from "@/components/tracks/track-card";
import { useMount } from "@/hooks/use-mount";

Amplify.configure(outputs)

const client = generateClient<Schema>()

export default function SweepsPage(){
	const [vehicle, track] = useMount();
	
	async function handleClick() {
		console.log(client);
		const status = client.queries.sayHello({
			name: "Amplify"
		});
		console.log(status);
		console.log("Hello from Amplify!")
	}

	return (
		<DefaultLayout>
			<div className="flex flex-col w-full h-full">
				<div className="flex w-full flex-row justify-around item-center m-8">
					<div>
						{vehicle ? <VehicleCard vehicle={vehicle}/> : <h1>No Mounted Vehicle</h1>}
					</div>
					<div>
						{track ? <TrackCard track={track}/> : <h1>No Mounted Track</h1>}
					</div>
				</div>
				<div className="flex flex-row w-full justify-around">
					<div>
						<h1>Vehicles</h1>
						
					</div>
					<div>
						<h1>Tracks</h1>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
