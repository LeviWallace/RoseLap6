import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/use-disclosure";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useState, useEffect } from "react";
import VehicleAddModal from "@/components/vehicles/vehicle-add-modal";
import VehicleContainer from "@/components/vehicles/vehicle-container";

const client = generateClient<Schema>();

type Vehicle = Schema['Vehicle']['type'];

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState<string>("");

    const {isOpen, onOpen, onClose} = useDisclosure();

    async function handleGetVehicles() {
        const { data, errors } = await client.models.Vehicle.list();
        if (errors) {
            console.error(errors);
            return;
        }
        const allVehicles = data as Vehicle[];
        setVehicles(allVehicles);
        console.log(data, vehicles); 
    }


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

	useEffect(() => {
		handleGetVehicles();
	}, []);

    return (
        <>
            <VehicleAddModal isOpen={isOpen} onClose={onClose} updateCallback={handleGetVehicles}></VehicleAddModal>
            <DefaultLayout>
                    <div className="flex justify-between items-center space-x-2">
                        <Input
                            name="vehicles"
                            value={search}
                            onChange={handleInputChange}
                            className="my-7 px-4"
                            placeholder="Search All Vehicles..."
                            type="text"
                            label="Vehicles"
                            variant="underlined"
                        />
                        <Button 
							onPress={handleGetVehicles}
							variant="bordered"
							size="lg"
							className="border-1 rounded-sm border-foreground"
						>
							Search
						</Button>
                        <Button 
							onPress={onOpen}
							variant="bordered"
							size="lg"
							className="border-1 rounded-sm border-foreground"
						>
							Add Vehicle 
						</Button>
                    </div>
					<div className="grid grid-cols-3 justify-between m-2 p-2">
						<VehicleContainer vehicles={vehicles} updateCallback={handleGetVehicles}/>
					</div>
            </DefaultLayout>
        </>
    )
}
