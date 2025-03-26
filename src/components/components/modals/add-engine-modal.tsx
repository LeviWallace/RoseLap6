import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddEngineComponent({ onClose, updateCallback }: { onClose: () => void, updateCallback: () => void }) {
    const [engine, setEngine] = useState({
        name: undefined,
        powerFactorMultiplier: undefined,
        thermalEfficiency: undefined,
        fuelLowerHeatingValue: undefined,
    });

    async function handleAddEngine() {
        const { errors } = await client.models.Engine.create({
            name: engine.name,
            powerFactorMultiplier: engine.powerFactorMultiplier,
            thermalEfficiency: engine.thermalEfficiency,
            fuelLowerHeatingValue: engine.fuelLowerHeatingValue,
        });
        if (errors) {
            console.log(errors);
        }
        return;
    }

    return (
        <>
            <ModalHeader className="justify-center">Add Engine</ModalHeader>
            <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Input
					key={"name"}
					name={"name"}
					label={"Name"}
					value={engine.name}
					variant="bordered"
					classNames={{
					input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
					inputWrapper: "border-1 border-foreground rounded-none",
					}}
					onChange={(e) => {
					const { name, value } = e.target;
					setEngine((prev) => ({ ...prev, [name]: value }));
					}}
				/>
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Input
				 key={"powerFactorMultiplier"}
				 name={"powerFactorMultiplier"}
				 label={"Power Factor Multiplier"}
				 value={engine.powerFactorMultiplier}
				 variant="bordered"
				 classNames={{
					input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
					inputWrapper: "border-1 border-foreground rounded-none",
				 }}
				 onChange={(e) => {
					const { name, value } = e.target;
					setEngine((prev) => ({ ...prev, [name]: value }));
				 }
				 }
				 />
				<Input
				 key={"thermalEfficiency"}
				 name={"thermalEfficiency"}
				 label={"Thermal Efficiency"}
				 value={engine.thermalEfficiency}
				 variant="bordered"
				 classNames={{
					input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
					inputWrapper: "border-1 border-foreground rounded-none",
				 }}
				 onChange={(e) => {
					const { name, value } = e.target;
					setEngine((prev) => ({ ...prev, [name]: value }));
				 }
				 }
				 />
				<Input
				 key={"fuelLowerHeatingValue"}
				 name={"fuelLowerHeatingValue"}
				 label={"Fuel Lower Heating Value"}
				 value={engine.fuelLowerHeatingValue}
				 variant="bordered"
				 classNames={{
					input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
					inputWrapper: "border-1 border-foreground rounded-none",
				 }}
				 onChange={(e) => {
					const { name, value } = e.target;
					setEngine((prev) => ({ ...prev, [name]: value }));
				 }
				 }
				 />
		</div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button color="primary" onPress={async () => { await handleAddEngine(); onClose(); updateCallback(); }}>
            Add Engine
          </Button>
        </ModalFooter>
      </>
    )
  }
