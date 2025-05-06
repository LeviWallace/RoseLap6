import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddBrakesComponent({
  onClose,
  updateCallback,
}: {
  onClose: () => void;
  updateCallback: () => void;
}) {
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
            value={brakes.name}
            variant="bordered"
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
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Disc Outer Diameter"}
            name={"discOuterDiameter"}
            value={brakes.discOuterDiameter}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"padHeight"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Pad Height"}
            name={"padHeight"}
            value={brakes.padHeight}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"padFrictionCoefficient"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Pad Friction Coefficient"}
            name={"padFrictionCoefficient"}
            value={brakes.padFrictionCoefficient}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"caliperNumberOfPistons"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Caliper Number Of Pistons"}
            name={"caliperNumberOfPistons"}
            value={brakes.caliperNumberOfPistons}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"caliperPistonDiameter"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Caliper Piston Diameter"}
            name={"caliperPistonDiameter"}
            value={brakes.caliperPistonDiameter}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"masterCylinderPistonDiameter"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Master Cylinder Piston Diameter"}
            name={"masterCylinderPistonDiameter"}
            value={brakes.masterCylinderPistonDiameter}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"pedalRatio"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Pedal Ratio"}
            name={"pedalRatio"}
            value={brakes.pedalRatio}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setBrakes((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          color="primary"
          onPress={async () => {
            await handleAddBrakes();
            onClose();
            updateCallback();
          }}
        >
          Add Brakes
        </Button>
      </ModalFooter>
    </>
  );
}
