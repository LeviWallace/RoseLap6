import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
type Vehicle = Schema["Vehicle"]['type'];

const client = generateClient<Schema>();

interface VehicleProps {
	vehicle: Vehicle;
	updateCallback: (vehicle: Vehicle) => void;
}

export default function VehicleCard({vehicle, updateCallback}: VehicleProps) {

	async function handleDeleteComponent() {
		await client.models.Vehicle.delete({ id: vehicle.id });
		updateCallback(vehicle);
	}


	return (
		<Card className="border rounded-none m-2 bg-background">
			<CardHeader>
				{vehicle.name}
			</CardHeader>
			<CardBody>
				{vehicle.mass}
			</CardBody>
			<CardFooter className="justify-between">
				<Button color="danger" size="sm" onPress={handleDeleteComponent}>
					Delete
				</Button>
				<Button color="primary" size="sm">
					Update
				</Button>
			</CardFooter>
		</Card>
	)
}

