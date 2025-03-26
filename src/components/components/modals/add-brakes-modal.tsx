import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddBrakesComponent({onClose, updateCallback}: { onClose: () => void, updateCallback: () => void }) {
    const [brakes, setBrakes] = useState({
      name: undefined,
      discOuterDiameter: undefined,
      padHeight: undefined,
      padFrictionCoefficient: undefined,
      caliperNumberOfPistons: undefined,
      caliperPistonDiameter: undefined,
      masterCylinderPistonDiameter: undefined,
      pedalRatio: undefined,
    });
  
    async function handleAddBrakes() {
      const { errors } = await client.models.Brakes.create({
        name: brakes.name,
        discOuterDiameter: brakes.discOuterDiameter,
        padHeight: brakes.padHeight,
        padFrictionCoefficient: brakes.padFrictionCoefficient,
        caliperNumberOfPistons: brakes.caliperNumberOfPistons,
        caliperPistonDiameter: brakes.caliperPistonDiameter,
        masterCylinderPistonDiameter: brakes.masterCylinderPistonDiameter,
        pedalRatio: brakes.pedalRatio,
      });
      if (errors) {
        console.log(errors);
      }
      return;
    }
  
    return (
      <>
        <ModalHeader className="justify-center">Add Brakes</ModalHeader>
        <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
              key={"name"}
              name={"name"}
              label={"Name"}
              value={brakes.name}
              variant="bordered"
              classNames={{
                input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
                inputWrapper: "border-1 border-foreground rounded-none",
              }}
              onChange={(e) => {
                const { name, value } = e.target;
                setBrakes((prev) => ({ ...prev, [name]: value }));
              }}
              />
            </div>
			<Divider />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			 <Input
			 key={"discOuterDiameter"}
			 name={"discOuterDiameter"}
			 label={"Disc Outer Diameter"}
			 value={brakes.discOuterDiameter}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }}
			 />
			 <Input
			 key={"padHeight"}
			 name={"padHeight"}
			 label={"Pad Height"}
			 value={brakes.padHeight}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }
			 }
			 />
			 <Input
			 key={"padFrictionCoefficient"}
			 name={"padFrictionCoefficient"}
			 label={"Pad Friction Coefficient"}
			 value={brakes.padFrictionCoefficient}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }
			 }
			 />
			 </div>
			 <Divider />
			 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			 <Input
			 key={"caliperNumberOfPistons"}
			 name={"caliperNumberOfPistons"}
			 label={"Caliper Number Of Pistons"}
			 value={brakes.caliperNumberOfPistons}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }
			 }
			 />
			 <Input
			 key={"caliperPistonDiameter"}
			 name={"caliperPistonDiameter"}
			 label={"Caliper Piston Diameter"}
			 value={brakes.caliperPistonDiameter}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }
			 }
			 />
			 <Input
			 key={"masterCylinderPistonDiameter"}
			 name={"masterCylinderPistonDiameter"}
			 label={"Master Cylinder Piston Diameter"}
			 value={brakes.masterCylinderPistonDiameter}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }
			 }
			 />
			 <Input
			 key={"pedalRatio"}
			 name={"pedalRatio"}
			 label={"Pedal Ratio"}
			 value={brakes.pedalRatio}
			 variant="bordered"
			 classNames={{
				input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
				inputWrapper: "border-1 border-foreground rounded-none",
			 }}
			 onChange={(e) => {
				const { name, value } = e.target;
				setBrakes((prev) => ({ ...prev, [name]: value }));
			 }
			 }
			 />
			</div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button color="primary" onPress={async () => { await handleAddBrakes(); onClose(); updateCallback(); }}>
            Add Brakes
          </Button>
        </ModalFooter>
      </>
    )
  }
