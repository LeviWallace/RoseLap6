import DefaultLayout from "@/layouts/default";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

import { type Field, vehicle } from "@/config/sim";
import { Button } from "@nextui-org/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@nextui-org/drawer";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();


export default function Vehicles() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [vehicles, setVehicles] = useState([]);

  
  
  const fetchVehicles = async () => {
    const { data: vehicles, errors } = await client.models.Vehicle.list(
      { selectionSet: ["title", "mass", "frontMassDistribution", "wheelbase", "steeringRackRatio", "tireId", "aerodynamicsId", "brakesId", "engineId", "transmissionId", "torqueCurveId"]
      });
    if (errors) {
      console.error(errors);
      return;
    }
    console.log(vehicles);
    if (typeof vehicles === vehicle) return;
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

  return (
    <>
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="full" placement="bottom">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Log in</DrawerHeader>
              <DrawerBody>
                <div className="flex flex-row gap-y-3 flex-wrap">
                    {Object.values(vehicle).map((field: Field) => (
                        <Input key={field.label} label={field.label} placeholder={field.label} className="w-1/3 p-2"/>
                    ))} 
                </div>
              </DrawerBody>
              <DrawerFooter className="flex justify-between">
                <Button className="bg-foreground text-background" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {handleAddVehicle(); onClose()}}>
                  Submit
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    <DefaultLayout>
        <h1 className="text-foreground text-3xl tracking-tigher p-2 font-bold">Vehicle Page</h1>
        <div className="flex justify-between py-2">
            <Input isClearable className="w-1/3" placeholder="Search for a vehicle"/>
            <Button color="primary" onClick={onOpen}>Add Vehicle</Button>
        </div>
        <div className="w-full border-foregroud border-1" >
            <Table aria-label="Vehicle Table" selectionMode="single"
                classNames={{
                    table: "bg-background text-foreground",
                    thead: "border-1",
                    th: "text-foreground bg-transparent",
                    td: "border-none border-1 border-foreground",
                    tbody: "bg-transparent",
                    wrapper: "p-0 rounded-none",
                }}>
                <TableHeader columns={Object.values(vehicle)}>
                    {(column: Field) => <TableColumn key={column.label}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent="">
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle}>
                        {Object.values(vehicle).map((field: any, index) => (
                          <TableCell key={index}>{field}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <div>
              <h1 className="text-foreground text-3xl tracking-tigher p-2 font-bold">Vehicle Components</h1>
              <div className="flex justify-between py-2">
                  <Input isClearable className="w-1/3" placeholder="Search for a vehicle"/>
                  <Button color="primary" onClick={onOpen}>Add Vehicle</Button>
              </div>
            </div>
    </DefaultLayout>
    </>
  );
}
