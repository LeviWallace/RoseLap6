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
		key: "FrontWheelDrive"
	},
	{
		label: "Rear Wheel Drive",
		value: "RearWheelDrive",
		key: "RearWheelDrive"
	},
	{
		label: "All Wheel Drive",
		value: "AllWheelDrive",
		key: "AllWheelDrive"
	},
]

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
      gearRatios: [],
    });


    
    async function handleAddTransmission() {
      const { errors } = await client.models.Transmission.create({
        name: transmission.name,
        driveType: transmission.driveType,
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
		<Autocomplete
			key={"driveType"}
			classNames={{
				listbox: ["bg-transparent", "text-foreground", "placeholder:text-grey", "borderd-1", "border-foreground", "rounded-none"],
				listboxWrapper: ["bg-background", "text-foreground", "placeholder:text-grey", "rounded-none"],
				base: ["rounded-none", "border-1", "border-foreground", "bg-transparent"],
			}}
			variant="bordered"
			label="Drive Type"
			defaultItems={transmissionDriveTypes}
			value={transmission.driveType}
		>
			{(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
		</Autocomplete>
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
		</div>	
		<Divider />
		<div className="grid grid-cols-3 md:grid-cols-6 gap-4">
		<Input
		 key={"1st Gear Ratio"}
		 label={"1st Gear Ratio"} 
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		 onChange={(e) => {
			const { name, value } = e.target;
			setTransmission((prev) => ({ ...prev, [name]: value }));
			}
		 }
		 value={transmission.gearRatios[0]}
		/>

		<Input
		 key={"2nd Gear Ratio"}
		 label={"2nd Gear Ratio"} 
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		 onChange={(e) => {
			const { name, value } = e.target;
			setTransmission((prev) => ({ ...prev, [name]: value }));
			}
		 }
		 value={transmission.gearRatios[1]}
		/>

		<Input
		 key={"3rd Gear Ratio"}
		 label={"3rd Gear Ratio"} 
		classNames={{
		input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
		inputWrapper: "border-1 border-foreground rounded-none",
		}}
		 onChange={(e) => {
			const { name, value } = e.target;
			setTransmission((prev) => ({ ...prev, [name]: value }));
			}
		 }
		 value={transmission.gearRatios[2]}
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
