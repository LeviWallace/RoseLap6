import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
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
          <Input
          key={"name"}
          name={"name"}
          label={"Name"}
          value={transmission.name}
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
        </div>
		<Divider />
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
		<Input
		key={"driveType"}
		name={"driveType"}
		label={"Drive Type NEED FIX"}
		value={transmission.driveType}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		<Input
		key={"finalDriveRatio"}
		name={"finalDriveRatio"}
		label={"Final Drive Ratio"}
		value={transmission.finalDriveRatio}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		<Input
		key={"gearShiftTime"}
		name={"gearShiftTime"}
		label={"Gear Shift Time"}
		value={transmission.gearShiftTime}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		</div>
		<Divider />
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
		<Input
		key={"primaryGearEfficiency"}
		name={"primaryGearEfficiency"}
		label={"Primary Gear Efficiency"}
		value={transmission.primaryGearEfficiency}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		<Input
		key={"finalGearEfficiency"}
		name={"finalGearEfficiency"}
		label={"Final Gear Efficiency"}
		value={transmission.finalGearEfficiency}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		<Input
		key={"gearboxEfficiency"}
		name={"gearboxEfficiency"}
		label={"Gearbox Efficiency"}
		value={transmission.gearboxEfficiency}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		</div>
		<Divider />
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
		<Input
		key={"primaryGearReduction"}
		name={"primaryGearReduction"}
		label={"Primary Gear Reduction"}
		value={transmission.primaryGearReduction}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		<Input
		key={"finalGearReduction"}
		name={"finalGearReduction"}
		label={"Final Gear Reduction"}
		value={transmission.finalGearReduction}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
		<Input
		key={"gearRatios"}
		name={"gearRatios"}
		label={"Gear Ratios"}
		value={transmission.gearRatios}
		variant="bordered"
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		onChange={(e) => {
		const { name, value } = e.target;
		setTransmission((prev) => ({ ...prev, [name]: value }));
		}
		}
		/>
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
