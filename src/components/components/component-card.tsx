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

    async function handleDeleteTrack() {
        const { errors, data } = await client.models.Tire.delete({ id: component.id });
        console.log(errors, data);
        updateCallback();
    }

    return (
        <Card className="border rounded-none m-2 bg-background">
            <CardHeader className="justify-between">
                <h1 className="text-2xl font-extrabold">{component.name}</h1>
            </CardHeader>
            <CardBody className="flex-row justify-between">
                <h2>{component.type}</h2>
            </CardBody>
            <CardFooter className="justify-between">
                <Button color="danger" size="sm" onPress={handleDeleteTrack}>
                    Delete Track
                </Button>
                <Button color="secondary" size="sm">
                    Mount Track
                </Button>
                <Button color="primary" size="sm">
                    View Track
                </Button>
            </CardFooter>
        </Card>
    )
}