import { Divider } from "@heroui/divider"
import DefaultLayout from "@/layouts/default";
import outputs from "../../../amplify_outputs.json"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/api"
import { Schema } from "../../../amplify/data/resource";
import VehicleCard from "@/components/vehicles/vehicle-card";
import TrackCard from "@/components/tracks/track-card";
import { useMount } from "@/hooks/use-mount";
import { useState, useEffect } from "react";
import TrackContainer from "@/components/tracks/track-container";
import VehicleContainer from "@/components/vehicles/vehicle-container";
import { Button } from "@heroui/button";

Amplify.configure(outputs)

const client = generateClient<Schema>()

type Track = Schema['Track']['type']
type Vehicle = Schema['Vehicle']['type']

export default function SweepsPage(){
	const {vehicle, track} = useMount();

	const [vehicles, setVehicles] = useState<Vehicle[]>();
	const [tracks, setTracks] = useState<Track[]>();

	async function handleGetTracks() {
		const {data, errors} = await client.models.Track.list();

		if (errors) {
			console.error(errors);
			return;
		}
		const allTracks = data as Track[];
		setTracks(allTracks);
	}	
	
	async function handleGetVehicles() {
		const {data, errors} = await client.models.Vehicle.list();

		if (errors) {
			console.error(errors);
			return;
		}
		const allVehicles = data as Vehicle[];
		setVehicles(allVehicles);
	}

	async function handleClick() {
		return 1;
	}


	useEffect(() => {
		handleGetTracks();
		handleGetVehicles();
	}, []);

	return (
		<DefaultLayout>
			<div className="flex flex-col w-full h-full">
				<div className="flex flex-col w-full text-center">
					<h1 className="text-7xl font-bold">Sweeps</h1>
				</div>
				<div className="flex w-full flex-col justify-around item-center my-10">
					<div className="w-full text-center">
						{(track && vehicle) ?

						<Button className="my-2" onPress={handleClick}>Simulate</Button>	
						:
						<h2 className="text-3xl font-bold">Mounted</h2>

						}
					</div>

					<div className="flex flex-row w-full justify-around">
						<div className="w-1/3 text-center">
							{vehicle ? <VehicleCard vehicle={vehicle}/> : <h1>No Mounted Vehicle</h1>}
						</div>
						<div className="w-1/3 text-center">
							{track ? <TrackCard track={track}/> : <h1>No Mounted Track</h1>}
						</div>
					</div>
				</div>
				<div className="flex flex-row w-full justify-around">
					<div className="w-1/3 text-center">
						<h1 className="text-3xl font-bold">Vehicles</h1>
						<Divider />			
						<div className="flex flex-col gap-2 my-2">
							{vehicles && <VehicleContainer vehicles={vehicles} updateCallback={handleGetVehicles}/>}
						</div>
					</div>
					<div className="w-1/3 text-center">
						<h1 className="text-3xl font-bold">Tracks</h1>
						<Divider />
						<div className="flex flex-col gap-2 my-2">
							{tracks && <TrackContainer tracks={tracks} updateCallback={handleGetTracks}/>}
						</div>
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
