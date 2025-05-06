import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

const transmissionDriveTypes = [
  {
    label: "Front Wheel Drive",
    value: "FrontWheelDrive",
    key: "FrontWheelDrive",
  },
  {
    label: "Rear Wheel Drive",
    value: "RearWheelDrive",
    key: "RearWheelDrive",
  },
  {
    label: "All Wheel Drive",
    value: "AllWheelDrive",
    key: "AllWheelDrive",
  },
];

type TransmissionType = {
  name: string | undefined;
  driveType: string | undefined;
  gearShiftTime: string | undefined;
  primaryGearEfficiency: string | undefined;
  finalGearEfficiency: string | undefined;
  gearboxEfficiency: string | undefined;
  primaryGearReduction: string | undefined;
  finalGearReduction: string | undefined;
  gearRatios: string[];
  gearRatioSize: number;
};

export default function AddTransmissionComponent({
  onClose,
  updateCallback,
}: {
  onClose: () => void;
  updateCallback: () => void;
}) {
  const [transmission, setTransmission] = useState<TransmissionType>({
    name: undefined,
    driveType: undefined,
    gearShiftTime: undefined,
    primaryGearEfficiency: undefined,
    finalGearEfficiency: undefined,
    gearboxEfficiency: undefined,
    primaryGearReduction: undefined,
    finalGearReduction: undefined,
    gearRatios: [],
    gearRatioSize: 3,
  });

  async function handleAddTransmission() {
    console.log(transmission);
    const { errors } = await client.models.Transmission.create({
      name: transmission.name,
      driveType: transmission.driveType as
        | "FrontWheelDrive"
        | "RearWheelDrive"
        | "AllWheelDrive",
      gearShiftTime: parseInt(transmission.gearShiftTime || "0"),
      primaryGearEfficiency: parseFloat(
        transmission.primaryGearEfficiency || "0",
      ),
      finalGearEfficiency: parseFloat(transmission.finalGearEfficiency || "0"),
      gearboxEfficiency: parseFloat(transmission.gearboxEfficiency || "0"),
      primaryGearReduction: parseFloat(
        transmission.primaryGearReduction || "0",
      ),
      finalGearReduction: parseFloat(transmission.finalGearReduction || "0"),
      gearRatios: transmission.gearRatios.map((ratio, index) => {
        if (index < transmission.gearRatioSize) {
          return parseFloat(ratio || "0");
        }

        return 0;
      }),
    });

    if (errors) {
      console.log(errors);
    }

    return;
  }

  const handleAddGearRatioSize = () => {
    setTransmission((prev) => ({
      ...prev,
      gearRatioSize: prev.gearRatioSize + 1,
    }));
  };

  return (
    <>
      <ModalHeader className="justify-center">Add Transmission</ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"name"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Name"}
            name={"name"}
            value={transmission.name}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Autocomplete
            key={"driveType"}
            isRequired
            classNames={{
              listbox: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
            }}
            defaultItems={transmissionDriveTypes}
            label="Drive Type"
            value={transmission.driveType as string}
            variant="bordered"
            onSelectionChange={(item) => {
              const selectedItem = transmissionDriveTypes.find(
                (i) => i.value === item,
              );

              setTransmission((prev) => ({
                ...prev,
                driveType: selectedItem?.value,
              }));
            }}
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Input
            key={"gearShiftTime"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Gear Shift Time"}
            name={"gearShiftTime"}
            value={transmission.gearShiftTime}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"primaryGearEfficiency"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Primary Gear Efficiency"}
            name={"primaryGearEfficiency"}
            value={transmission.primaryGearEfficiency}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"finalGearEfficiency"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Final Gear Efficiency"}
            name={"finalGearEfficiency"}
            value={transmission.finalGearEfficiency}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"gearboxEfficiency"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Gearbox Efficiency"}
            name={"gearboxEfficiency"}
            value={transmission.gearboxEfficiency}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"primaryGearReduction"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Primary Gear Reduction"}
            name={"primaryGearReduction"}
            value={transmission.primaryGearReduction}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"finalGearReduction"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Final Gear Reduction"}
            name={"finalGearReduction"}
            value={transmission.finalGearReduction}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTransmission((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <Input
            key={"1st Gear Ratio"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"1st Gear Ratio"}
            value={transmission.gearRatios[0]}
            onChange={(e) => {
              const { value } = e.target;
              const newGearRatios = [...transmission.gearRatios];

              newGearRatios[0] = value;
              setTransmission((prev) => ({
                ...prev,
                gearRatios: newGearRatios,
              }));
            }}
          />
          <Input
            key={"2nd Gear Ratio"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"2nd Gear Ratio"}
            value={transmission.gearRatios[1]}
            onChange={(e) => {
              const { value } = e.target;
              const newGearRatios = [...transmission.gearRatios];

              newGearRatios[1] = value;
              setTransmission((prev) => ({
                ...prev,
                gearRatios: newGearRatios,
              }));
            }}
          />

          <Input
            key={"3rd Gear Ratio"}
            isRequired
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"3rd Gear Ratio"}
            value={transmission.gearRatios[2]}
            onChange={(e) => {
              const { value } = e.target;
              const newGearRatios = [...transmission.gearRatios];

              newGearRatios[2] = value;
              setTransmission((prev) => ({
                ...prev,
                gearRatios: newGearRatios,
              }));
            }}
          />
          {Array.from({ length: transmission.gearRatioSize - 3 }).map(
            (_: any, index: number) => {
              const i = index + 4;

              return (
                <Input
                  key={`${i}th Gear Ratio`}
                  classNames={{
                    input: [
                      "bg-transparent",
                      "text-foreground",
                      "placeholder:text-grey",
                    ],
                    inputWrapper: "border-1 border-foreground rounded-none",
                  }}
                  label={`${i}th Gear Ratio`}
                  value={transmission.gearRatios[i - 1]}
                  onChange={(e) => {
                    const { value } = e.target;
                    const newGearRatios = [...transmission.gearRatios];

                    newGearRatios[i - 1] = value;
                    setTransmission((prev) => ({
                      ...prev,
                      gearRatios: newGearRatios,
                    }));
                  }}
                />
              );
            },
          )}
          <div className="flex flex-col items-center justify-center">
            <Button
              className="w-1/2"
              color="primary"
              radius="full"
              onPress={handleAddGearRatioSize}
            >
              +
            </Button>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          color="primary"
          onPress={async () => {
            await handleAddTransmission();
            onClose();
            updateCallback();
          }}
        >
          Add Transmission
        </Button>
      </ModalFooter>
    </>
  );
}
