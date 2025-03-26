import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddAerodynamicsComponent({onClose, updateCallback}: { onClose: () => void, updateCallback: () => void }) {
    const [aerodynamics, setAerodynamics] = useState({
      name: undefined,
      liftCoefficientCL: undefined,
      dragCoefficientCD: undefined,
      clScaleMultiplier: undefined,
      cdScaleMultiplier: undefined,
      frontAeroDistribution: undefined,
      frontalArea: undefined,
      airDensity: undefined,
    });
  
    async function handleAddAerodynamics() {
      const { errors } = await client.models.Aerodynamics.create({
        name: aerodynamics.name,
        liftCoefficientCL: aerodynamics.liftCoefficientCL,
        dragCoefficientCD: aerodynamics.dragCoefficientCD,
        clScaleMultiplier: aerodynamics.clScaleMultiplier,
        cdScaleMultiplier: aerodynamics.cdScaleMultiplier,
        frontAeroDistribution: aerodynamics.frontAeroDistribution,
        frontalArea: aerodynamics.frontalArea,
        airDensity: aerodynamics.airDensity,
      });
      if (errors) {
        console.log(errors);
      }
      return;
    }
  
    return (
      <>
        <ModalHeader className="justify-center">Add Aerodynamics</ModalHeader>
        <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
              key={"name"}
              name={"name"}
              label={"Name"}
              value={aerodynamics.name}
              variant="bordered"
              classNames={{
                input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                inputWrapper: "border-1 border-foreground rounded-none",
              }}
              onChange={(e) => {
                const { name, value } = e.target;
                setAerodynamics((prev) => ({ ...prev, [name]: value }));
              }}
              />
            </div>
			<Divider />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			  <Input
			  key={"liftCoefficientCL"}
			  name={"liftCoefficientCL"}
			  label={"Lift Coefficient CL"}
			  value={aerodynamics.liftCoefficientCL}
			  variant="bordered"
			  classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			  }}
			  onChange={(e) => {
				const { name, value } = e.target;
				setAerodynamics((prev) => ({ ...prev, [name]: value }));
			  }}
			  />
              <Input
              key={"dragCoefficientCD"}
              name={"dragCoefficientCD"}
              label={"Drag Coefficient CD"}
              value={aerodynamics.dragCoefficientCD}
              variant="bordered"
              classNames={{
                input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                inputWrapper: "border-1 border-foreground rounded-none",
              }}
              onChange={(e) => {
                const { name, value } = e.target;
                setAerodynamics((prev) => ({ ...prev, [name]: value }));
              }}
              />
			</div>
			<Divider />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Input
			key={"clScaleMultiplier"}
			name={"clScaleMultiplier"}
			label={"CL Scale Multiplier"}
			value={aerodynamics.clScaleMultiplier}
			variant="bordered"
			classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			}}
			onChange={(e) => {
				const { name, value } = e.target;
				setAerodynamics((prev) => ({ ...prev, [name]: value }));
			}}
			/>
			<Input
			key={"cdScaleMultiplier"}
			name={"cdScaleMultiplier"}
			label={"CD Scale Multiplier"}
			value={aerodynamics.cdScaleMultiplier}
			variant="bordered"
			classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			}}
			onChange={(e) => {
				const { name, value } = e.target;
				setAerodynamics((prev) => ({ ...prev, [name]: value }));
			}}
			/>
			</div>
			<Divider />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Input
			key={"frontAeroDistribution"}
			name={"frontAeroDistribution"}
			label={"Front Aero Distribution"}
			value={aerodynamics.frontAeroDistribution}
			variant="bordered"
			classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			}}
			onChange={(e) => {
				const { name, value } = e.target;
				setAerodynamics((prev) => ({ ...prev, [name]: value }));
			}}
			/>
			<Input
			key={"frontalArea"}
			name={"frontalArea"}
			label={"Frontal Area"}
			value={aerodynamics.frontalArea}
			variant="bordered"
			classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			}}
			onChange={(e) => {
				const { name, value } = e.target;
				setAerodynamics((prev) => ({ ...prev, [name]: value }));
			}}
			/>
			<Input
			key={"airDensity"}
			name={"airDensity"}
			label={"Air Density"}
			value={aerodynamics.airDensity}
			variant="bordered"
			classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			}}
			onChange={(e) => {
				const { name, value } = e.target;
				setAerodynamics((prev) => ({ ...prev, [name]: value }));
			}}
			/>
			</div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button color="primary" onPress={async () => { await handleAddAerodynamics(); onClose(); updateCallback(); }}>
            Add Aerodynamics
          </Button>
        </ModalFooter>
      </>
    )
  }
