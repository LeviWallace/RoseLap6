import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useMount } from "@/hooks/use-mount";

type Vehicle = Schema["Vehicle"]['type'];

const client = generateClient<Schema>();

interface VehicleProps {
	vehicle: Vehicle;
	updateCallback?: (vehicle: Vehicle) => void;
}

export default function VehicleCard({vehicle, updateCallback}: VehicleProps) {
	const { vehicle: v, mountVehicle, unmountVehicle } = useMount();

	async function handleDeleteComponent() {
		await client.models.Vehicle.delete({ id: vehicle.id });

		if (updateCallback) {
			if (v?.id === vehicle.id) {
				unmountVehicle();
			}
			updateCallback(vehicle);
		}
	}


	return (
		<Card className="border rounded-xl m-2 bg-background min-w-[450px] w-[450px] min-h-[200px] h-[200px]">
			<CardHeader className="justify-between pb-1">
				<h1 className="text-2xl font-extrabold">{vehicle.name}</h1>
			</CardHeader>
			<CardBody className="flex flex-col justify-between pt-0">
				<div className="flex flex-row gap-2 w-full justify-evenly">
					<div className="flex flex-col gap-2 text-center">
						<p className="text-xl font-bold tracking-tigher">Vehicle Mass</p>
						<p className="text-xl font-thin">{vehicle.mass}</p>
					</div>
					<div className="flex flex-col gap-2 text-center">
						<p className="text-xl font-bold tracking-tighter">Front Mass Distribution</p>
						<p className="text-xl font-thin">{vehicle.frontMassDistribution}</p>
					</div>
				</div>
			</CardBody>
			<CardFooter className="justify-between">
				{ updateCallback &&
				<Button color="primary" size="sm" onPress={handleDeleteComponent}>
					Delete
				</Button>
				}
				{ v?.id === vehicle.id ?
					<Button color="secondary" size="sm" onPress={() => { unmountVehicle() }}>
						Dismount
					</Button>
					:
					<Button color="secondary" size="sm" onPress={() => { mountVehicle(vehicle) }}>
						Mount
					</Button>
				}
			</CardFooter>
		</Card>
	)
}

