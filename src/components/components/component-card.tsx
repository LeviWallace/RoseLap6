import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

type BrakeComponent = Schema['Brakes']['type'];
type EngineComponent = Schema['Engine']['type'];
type TireComponent = Schema['Tire']['type'];
type TransmissionComponent = Schema['Transmission']['type'];
type AerodynamicsComponent = Schema['Aerodynamics']['type'];

type Component = BrakeComponent | EngineComponent | TireComponent | TransmissionComponent | AerodynamicsComponent;

interface ComponentProps {
    component: Component;
    updateCallback: () => void;
}

const client = generateClient<Schema>();


export default function ComponentCard({component, updateCallback}: ComponentProps) {

    async function handleDeleteComponent() {
		console.log(component);
		switch (component.type) {
			case 'Brake': 
				await client.models.Brakes.delete({ id: component.id });
				break;
			case 'Engine':
				await client.models.Engine.delete({ id: component.id });
				break;
			case 'Tire':
				await client.models.Tire.delete({ id: component.id });
				break;
			case 'Transmission':
				await client.models.Transmission.delete({ id: component.id });
				break;
			case 'Aerodynamic':
				await client.models.Aerodynamics.delete({ id: component.id });
				break;
		}
        updateCallback();
    }

    return (
        <Card className="border rounded-lg m-2 bg-background">
            <CardHeader className="justify-between">
                <h2 className="text-xl tracking-tighter font-bold">TYPE: {component.type}</h2>
            </CardHeader>
            <CardBody className="flex-row justify-between">
                <h1 className="text-2xl font-extrabold uppercase">{component.name}</h1>
            </CardBody>
            <CardFooter className="justify-between">
                <Button color="danger" size="sm" onPress={handleDeleteComponent}>
                    Delete {component.type}
                </Button>
                <Button color="primary" size="sm">
                    View {component.type}
                </Button>
            </CardFooter>
        </Card>
    )
}
