import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { Input } from "@heroui/input";
import { useEffect } from "react";

import { type Schema } from "@/../amplify/data/resource";

const client = generateClient<Schema>();

type Component = { id: string; name: string };
type TorqueCurve = { engineSpeed: number; torque: number };
type VehicleConfig = {
  name: string | undefined;
  mass: string | undefined;
  frontMassDistribution: string | undefined;
  tire: Component | undefined;
  aerodynamics: Component | undefined;
  brakes: Component | undefined;
  engine: Component | undefined;
  transmission: Component | undefined;
  torqueCurves: TorqueCurve[];
  torqueCurveSize: number;
};

export default function VehicleAddModal({
  isOpen,
  onClose,
  updateCallback,
}: {
  isOpen: boolean;
  onClose: () => void;
  updateCallback: () => void;
}) {
  const [vehicle, setVehicle] = useState<VehicleConfig>({
    name: "",
    mass: undefined,
    frontMassDistribution: undefined,

    tire: undefined,
    aerodynamics: undefined,
    brakes: undefined,
    engine: undefined,
    transmission: undefined,
    torqueCurves: [],
    torqueCurveSize: 1,
  });

  const [components, setComponents] = useState({
    tires: [] as Component[],
    aerodynamics: [] as Component[],
    brakes: [] as Component[],
    engines: [] as Component[],
    transmissions: [] as Component[],
  });

  async function handleGetComponents() {
    const options: any = {
      selectionSet: ["id", "name"],
    };
    const { data: tires } = await client.models.Tire.list(options);
    const { data: aerodynamics } =
      await client.models.Aerodynamics.list(options);
    const { data: brakes } = await client.models.Brakes.list(options);
    const { data: engines } = await client.models.Engine.list(options);
    const { data: transmissions } =
      await client.models.Transmission.list(options);

    setComponents({
      tires: tires.map((tire) => ({ id: tire.id, name: tire.name as string })),
      aerodynamics: aerodynamics.map((aerodynamic) => ({
        id: aerodynamic.id,
        name: aerodynamic.name as string,
      })),
      brakes: brakes.map((brake) => ({
        id: brake.id,
        name: brake.name as string,
      })),
      engines: engines.map((engine) => ({
        id: engine.id,
        name: engine.name as string,
      })),
      transmissions: transmissions.map((transmission) => ({
        id: transmission.id,
        name: transmission.name as string,
      })),
    });
  }

  useEffect(() => {
    handleGetComponents();
  }, [isOpen]);

  async function handleAddVehicle() {
    if (
      vehicle.tire === undefined ||
      vehicle.aerodynamics === undefined ||
      vehicle.brakes === undefined ||
      vehicle.engine === undefined ||
      vehicle.transmission === undefined ||
      vehicle.torqueCurves === undefined
    ) {
      console.error("Missing components");

      return;
    }

    console.log(vehicle);

    const { errors, data } = await client.models.Vehicle.create({
      name: vehicle.name,
      mass: vehicle.mass ? parseInt(vehicle.mass) : undefined,
      frontMassDistribution: vehicle.frontMassDistribution
        ? parseFloat(vehicle.frontMassDistribution)
        : undefined,
      tireId: vehicle.tire.id,
      aerodynamicsId: vehicle.aerodynamics.id,
      brakesId: vehicle.brakes.id,
      engineId: vehicle.engine.id,
      transmissionId: vehicle.transmission.id,
      torqueCurves: vehicle.torqueCurves,
    });

    console.log(errors, data);
    updateCallback();

    return;
  }

  function handleAddTorqueCurveSize() {
    setVehicle((prev) => ({
      ...prev,
      torqueCurveSize: prev.torqueCurveSize + 1,
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setVehicle((prev) => ({ ...prev, [name]: value }));
  }

  function handleClearData() {
    setVehicle({
      name: "",
      mass: undefined,
      frontMassDistribution: undefined,
      tire: undefined,
      aerodynamics: undefined,
      brakes: undefined,
      engine: undefined,
      transmission: undefined,
      torqueCurves: [],
      torqueCurveSize: 1,
    });
  }

  return (
    <Modal
      isKeyboardDismissDisabled
      isDismissable={false}
      isOpen={isOpen}
      radius="none"
      size="4xl"
      onClose={onClose}
    >
      <ModalContent className="border-white border-1 bg-background">
        {(onClose) => (
          <>
            <ModalHeader className="justify-center">Add Vehicle</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-foreground",
                      "placeholder:text-grey",
                    ],
                    inputWrapper: "border-1 border-foreground rounded-none",
                  }}
                  label="Name"
                  name="name"
                  type="text"
                  value={vehicle.name}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-foreground",
                      "placeholder:text-grey",
                    ],
                    inputWrapper: "border-1 border-foreground rounded-none",
                  }}
                  label="Mass"
                  name="mass"
                  type="text"
                  value={vehicle.mass}
                  variant="bordered"
                  onChange={handleChange}
                />
                <Input
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-foreground",
                      "placeholder:text-grey",
                    ],
                    inputWrapper: "border-1 border-foreground rounded-none",
                  }}
                  label="Front Mass Distribution"
                  name="frontMassDistribution"
                  type="text"
                  value={vehicle.frontMassDistribution}
                  variant="bordered"
                  onChange={handleChange}
                />
              </div>
              <Divider />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Autocomplete
                  isRequired
                  className="max-w-xs"
                  defaultItems={components.tires}
                  label="Tire"
                  placeholder="Select Tire"
                  value={vehicle.tire?.name}
                  variant="bordered"
                  onSelectionChange={(key) => {
                    const selectedTire = components.tires.find(
                      (t) => t.id === key,
                    );

                    setVehicle((prev) => ({ ...prev, tire: selectedTire }));
                  }}
                >
                  {(tire) => (
                    <AutocompleteItem key={tire.id}>
                      {tire.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  isRequired
                  className="max-w-xs"
                  defaultItems={components.brakes}
                  label="Brake"
                  placeholder="Select Brake"
                  variant="bordered"
                  onSelectionChange={(key) => {
                    const selectedBrake = components.brakes.find(
                      (t) => t.id === key,
                    );

                    setVehicle((prev) => ({ ...prev, brakes: selectedBrake }));
                  }}
                >
                  {(brake) => (
                    <AutocompleteItem key={brake.id}>
                      {brake.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  isRequired
                  className="max-w-xs"
                  defaultItems={components.aerodynamics}
                  label="Aerodynamics"
                  placeholder="Select Aerodynamics"
                  variant="bordered"
                  onSelectionChange={(key) => {
                    const selectedAerodynamic = components.aerodynamics.find(
                      (t) => t.id === key,
                    );

                    setVehicle((prev) => ({
                      ...prev,
                      aerodynamics: selectedAerodynamic,
                    }));
                  }}
                >
                  {(aerodynamic) => (
                    <AutocompleteItem key={aerodynamic.id}>
                      {aerodynamic.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  isRequired
                  className="max-w-xs"
                  defaultItems={components.engines}
                  label="Engine"
                  placeholder="Select Engine"
                  variant="bordered"
                  onSelectionChange={(key) => {
                    const selectedEngine = components.engines.find(
                      (t) => t.id === key,
                    );

                    setVehicle((prev) => ({ ...prev, engine: selectedEngine }));
                  }}
                >
                  {(engine) => (
                    <AutocompleteItem key={engine.id}>
                      {engine.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  isRequired
                  className="max-w-xs"
                  defaultItems={components.transmissions}
                  label="Transmission"
                  placeholder="Select Transmission"
                  variant="bordered"
                  onSelectionChange={(key) => {
                    const selectedTransmission = components.transmissions.find(
                      (t) => t.id === key,
                    );

                    setVehicle((prev) => ({
                      ...prev,
                      transmission: selectedTransmission,
                    }));
                  }}
                >
                  {(transmission) => (
                    <AutocompleteItem key={transmission.id}>
                      {transmission.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <Divider />
              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Torque Curve</h2>
                    <h5 className="text-sm text-gray">
                      Add Engine Speed and Torque
                    </h5>
                  </div>
                  <Button
                    className="mt-2"
                    color="primary"
                    radius="full"
                    size="sm"
                    onPress={handleAddTorqueCurveSize}
                  >
                    +
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {Array.from(
                    { length: vehicle.torqueCurveSize },
                    (_, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-2 items-center"
                      >
                        <div className="flex absolute justify-center items-center w-5 h-5 bg-primary rounded-full">
                          <h1>{index + 1}</h1>
                        </div>
                        <div className="flex flex-row gap-2 px-4 mx-4">
                          <Input
                            classNames={{
                              input: [
                                "bg-transparent",
                                "text-foreground",
                                "placeholder:text-grey",
                              ],
                              inputWrapper:
                                "border-1 border-foreground rounded-none",
                            }}
                            label="Engine Speed"
                            name={`e-${index}`}
                            type="text"
                            variant="bordered"
                            onChange={(e) => {
                              const newTorqueCurves = [...vehicle.torqueCurves];

                              newTorqueCurves[index] = {
                                ...newTorqueCurves[index],
                                engineSpeed: parseInt(e.target.value),
                              };
                              setVehicle((prev) => ({
                                ...prev,
                                torqueCurves: newTorqueCurves,
                              }));
                            }}
                          />
                          <Input
                            classNames={{
                              input: [
                                "bg-transparent",
                                "text-foreground",
                                "placeholder:text-grey",
                              ],
                              inputWrapper:
                                "border-1 border-foreground rounded-none",
                            }}
                            label="Torque"
                            name={`t-${index}`}
                            type="text"
                            variant="bordered"
                            onChange={(e) => {
                              const newTorqueCurves = [...vehicle.torqueCurves];

                              newTorqueCurves[index] = {
                                ...newTorqueCurves[index],
                                torque: parseInt(e.target.value),
                              };
                              setVehicle((prev) => ({
                                ...prev,
                                torqueCurves: newTorqueCurves,
                              }));
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="justify-end">
              <Button
                color="primary"
                onPress={() => {
                  handleAddVehicle();
                  handleClearData();
                  onClose();
                }}
              >
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
