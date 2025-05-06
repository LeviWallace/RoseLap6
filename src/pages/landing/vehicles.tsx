import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/use-disclosure";
import { generateClient } from "aws-amplify/api";
import { useState, useEffect } from "react";

import { Schema } from "../../../amplify/data/resource";

import DefaultLayout from "@/layouts/default";
import VehicleAddModal from "@/components/vehicles/vehicle-add-modal";
import VehicleContainer from "@/components/vehicles/vehicle-container";

const client = generateClient<Schema>();

type Vehicle = Schema["Vehicle"]["type"];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    setSearch(e.target.value);
  }

  useEffect(() => {
    handleGetVehicles();
  }, []);

  return (
    <>
      <VehicleAddModal
        isOpen={isOpen}
        updateCallback={handleGetVehicles}
        onClose={onClose}
      />
      <DefaultLayout>
        <div className="flex justify-between items-center space-x-2">
          <Input
            className="my-7 px-4"
            label="Vehicles"
            name="vehicles"
            placeholder="Search All Vehicles..."
            type="text"
            value={search}
            variant="underlined"
            onChange={handleInputChange}
          />
          <Button
            className="border-1 rounded-sm border-foreground"
            size="lg"
            variant="bordered"
            onPress={handleGetVehicles}
          >
            Search
          </Button>
          <Button
            className="border-1 rounded-sm border-foreground"
            size="lg"
            variant="bordered"
            onPress={onOpen}
          >
            Add Vehicle
          </Button>
        </div>
        <div className="grid grid-cols-3 justify-between m-2 p-2">
          <VehicleContainer
            updateCallback={handleGetVehicles}
            vehicles={vehicles}
          />
        </div>
      </DefaultLayout>
    </>
  );
}
