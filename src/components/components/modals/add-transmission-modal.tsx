import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddTransmissionComponent({onClose, updateCallback}: { onClose: () => void, updateCallback: () => void }) {
    const [transmission, setTransmission] = useState({
      name: undefined,
      driveType: undefined,
      finalDriveRatio: undefined,
      gearShiftTime: undefined,
      primaryGearEfficiency: undefined,
      finalGearEfficiency: undefined,
      gearboxEfficiency: undefined,
      primaryGearReduction: undefined,
      finalGearReduction: undefined,
      gearRatios: undefined,
    });
    
    async function handleAddTransmission() {
      const { errors } = await client.models.Transmission.create({
        name: transmission.name,
        driveType: transmission.driveType,
        finalDriveRatio: transmission.finalDriveRatio,
        gearShiftTime: transmission.gearShiftTime,
        primaryGearEfficiency: transmission.primaryGearEfficiency,
        finalGearEfficiency: transmission.finalDriveRatio,
        gearboxEfficiency: transmission.gearboxEfficiency,
        primaryGearReduction: transmission.primaryGearReduction,
        finalGearReduction: transmission.finalGearReduction,
        gearRatios: transmission.gearRatios,
      });
      if (errors) {
      console.log(errors);
      }
      return;
    }
    
    return (
      <>
      <ModalHeader className="justify-center">Add Transmission</ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(transmission).map(([key, value]) => (
          <Input
          key={key}
          name={key}
          label={key}
          value={value}
          variant="bordered"
          classNames={{
          input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
          inputWrapper: "border-1 border-foreground rounded-none",
          }}
          onChange={(e) => {
          const { name, value } = e.target;
          setTransmission((prev) => ({ ...prev, [name]: value }));
          }}
          />
        ))}
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button color="primary" onPress={async () => { await handleAddTransmission(); onClose(); updateCallback(); }}>
        Add Transmission
        </Button>
      </ModalFooter>
      </>
    )
  }