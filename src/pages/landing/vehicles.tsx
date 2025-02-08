import DefaultLayout from "@/layouts/default";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

import { vehicleConfig } from "@/config/sim";
import { Button } from "@nextui-org/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@nextui-org/drawer";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { generateClient, SelectionSet } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem
  } from "@nextui-org/autocomplete";

const client = generateClient<Schema>();

const vehicleFields = ["title", "mass", "frontMassDistribution", "wheelbase", "steeringRackRatio", "tireId", "aerodynamicsId", "brakesId", "engineId", "transmissionId", "torqueCurveId"] as const;
type Vehicle = SelectionSet<Schema["Vehicle"]['type'], typeof vehicleFields>;


export default function Vehicles() {
  const { isOpen: isAddVehicleOpen, onOpen: onAddVehicleOpen, onOpenChange: onVehicleOpenChange } = useDisclosure();
  const { isOpen: isAddComponentOpen, onOpen: onAddComponentOpen, onOpenChange: onAddComponentOpenChange } = useDisclosure();
  
  const [ addComponent, setAddComponent ] = useState("");
  const [ addComponentFields, setAddComponentFields ] = useState([]);
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  
  const fetchVehicles = async () => {
    const { data: vehicles, errors } = await client.models.Vehicle.list(
      {
        selectionSet: vehicleFields
      });
    if (errors) {
      console.error(errors);
      return;
    }
    console.log(vehicles);
    setVehicles(vehicles);
  }

  const handleAddVehicle = async () => {
    const { data: newVehicle, errors } = await client.models.Vehicle.create({
      title: "new vehicle",
      mass: 0,
      frontMassDistribution: 0,
      wheelbase: 0,
      steeringRackRatio: 0,

      tireId: "0",
      aerodynamicsId: "0",
      brakesId: "0",
      engineId: "0",
      transmissionId: "0",
      torqueCurveId: "0"
    });
    console.log(newVehicle);
    console.warn(errors);
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  function handleAddComponent() {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      { /* Add Vehicle Drawer */}
      <Drawer isOpen={isAddVehicleOpen} onOpenChange={onVehicleOpenChange} size="full" placement="bottom">
        <DrawerContent>
          {(onAddVehicleClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-foreground">Create Vehicle</DrawerHeader>
              <DrawerBody>
                <div className="flex flex-row gap-y-3 flex-wrap">
                  {Object.values(vehicleConfig).map((field: any) => (
                    <Input key={field.label} label={field.label} placeholder={field.label} className="w-1/3 p-2" />
                  ))}
                </div>
              </DrawerBody>
              <DrawerFooter className="flex justify-between">
                <Button className="bg-foreground text-background" onPress={onAddVehicleClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { handleAddVehicle(); onAddVehicleClose() }}>
                  Submit
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      { /* Add Component Drawer */}
      <Drawer isOpen={isAddComponentOpen} onOpenChange={onAddComponentOpenChange} size="full" placement="bottom">
        <DrawerContent>
          {(onAddComponentClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-foreground">Create Vehicle Componenet</DrawerHeader>
              <DrawerBody>
                <Autocomplete
                  defaultItems={[
                    { key: "tireId", label: "Tire" },
                    { key: "aerodynamicsId", label: "Aerodynamics" },
                    { key: "brakesId", label: "Brakes" },
                    { key: "engineId", label: "Engine" },
                    { key: "transmissionId", label: "Transmission" },
                    { key: "torqueCurveId", label: "Torque Curve" }
                  ]}
                  label="Select a Component"
                  variant="bordered"
                  onInputChange={(value: string) => { setAddComponent(value); }}
                  className="w-2/3"
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <div>
                  {addComponentFields.map((field: any) => (
                    <Input key={field.label} label={field.label} placeholder={field.label} className="w-1/3 p-2" />
                  ))}
                </div>
              </DrawerBody>
              <DrawerFooter className="flex justify-between">
                <Button className="bg-foreground text-background" onPress={onAddComponentClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { handleAddComponent(); onAddComponentClose() }}>
                  Submit
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      { /* Vehicle Page */}
      <DefaultLayout>
        <div className="flex flex-col space-y-10 h-screen">
          <div>
            <h1 className="text-foreground text-3xl tracking-tigher p-2 font-bold">Vehicle Page</h1>
            <div className="flex justify-between py-2">
              <Input isClearable className="w-1/3" placeholder="Search for a vehicle" />
              <Button color="primary" onPress={onAddVehicleOpen}>Add Vehicle</Button>
            </div>
            <div className="w-full border-foregroud border-1" >
            
             </div>
            </div>
             <div>
              <div>
                <h1 className="text-foreground text-3xl tracking-tigher p-2 font-bold">Vehicle Components</h1>
                <div className="flex justify-between py-2">
                  <Input isClearable className="w-1/3" placeholder="Search for a vehicle" />
                  <Button color="primary" onPress={onAddComponentOpen}>Add Vehicle Component</Button>
                </div>
              </div>
              <div className="flex gap-4 p-4">
                  <Card className="max-w-[400px] w-[400px] bg-secondary">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-lg text-foreground">DSX1000</p>
                        <p className="text-small text-default-500 text-foreground">Tire</p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div className="flex justify-end">
                        <Button className="text-sm bg-foreground text-background w-1/4 rounded-sm" >Go To</Button>
                      </div>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                  </Card>
              </div>
            </div>
          </div>
      </DefaultLayout>
    </>
  );
}
