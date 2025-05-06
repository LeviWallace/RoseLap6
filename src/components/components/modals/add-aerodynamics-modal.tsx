import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddAerodynamicsComponent({
  onClose,
  updateCallback,
}: {
  onClose: () => void;
  updateCallback: () => void;
}) {
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
            value={aerodynamics.name}
            variant="bordered"
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
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Lift Coefficient CL"}
            name={"liftCoefficientCL"}
            value={aerodynamics.liftCoefficientCL}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setAerodynamics((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"dragCoefficientCD"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Drag Coefficient CD"}
            name={"dragCoefficientCD"}
            value={aerodynamics.dragCoefficientCD}
            variant="bordered"
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
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"CL Scale Multiplier"}
            name={"clScaleMultiplier"}
            value={aerodynamics.clScaleMultiplier}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setAerodynamics((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"cdScaleMultiplier"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"CD Scale Multiplier"}
            name={"cdScaleMultiplier"}
            value={aerodynamics.cdScaleMultiplier}
            variant="bordered"
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
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Front Aero Distribution"}
            name={"frontAeroDistribution"}
            value={aerodynamics.frontAeroDistribution}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setAerodynamics((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"frontalArea"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Frontal Area"}
            name={"frontalArea"}
            value={aerodynamics.frontalArea}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setAerodynamics((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"airDensity"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Air Density"}
            name={"airDensity"}
            value={aerodynamics.airDensity}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setAerodynamics((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          color="primary"
          onPress={async () => {
            await handleAddAerodynamics();
            onClose();
            updateCallback();
          }}
        >
          Add Aerodynamics
        </Button>
      </ModalFooter>
    </>
  );
}
