import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";

import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddTireComponent({
  onClose,
  updateCallback,
}: {
  onClose: () => void;
  updateCallback: () => void;
}) {
  const [tire, setTire] = useState({
    name: undefined,
    wheelBase: undefined,
    stearingRackRatio: undefined,
    gripFactorMultiplier: undefined,
    tireRadius: undefined,
    rollingResistance: undefined,
    longitudinalFrictionCoefficient: undefined,
    longitudinalFrictionLoadRating: undefined,
    longitudinalFrictionSensitivity: undefined,
    lateralFrictionCoefficient: undefined,
    lateralFrictionLoadRating: undefined,
    lateralFrictionSensitivity: undefined,
    frontCorneringStiffness: undefined,
    rearCorneringStiffness: undefined,
  });

  async function handleAddTire() {
    const { errors } = await client.models.Tire.create({
      name: tire.name,
      wheelBase: tire.wheelBase,
      stearingRackRatio: tire.stearingRackRatio,
      gripFactorMultiplier: tire.gripFactorMultiplier,
      tireRadius: tire.tireRadius,
      rollingResistance: tire.rollingResistance,
      longitudinalFrictionCoefficient: tire.longitudinalFrictionCoefficient,
      longitudinalFrictionLoadRating: tire.longitudinalFrictionLoadRating,
      longitudinalFrictionSensitivity: tire.longitudinalFrictionSensitivity,
      lateralFrictionCoefficient: tire.lateralFrictionCoefficient,
      lateralFrictionLoadRating: tire.lateralFrictionLoadRating,
      lateralFrictionSensitivity: tire.lateralFrictionSensitivity,
      frontCorneringStiffness: tire.frontCorneringStiffness,
      rearCorneringStiffness: tire.rearCorneringStiffness,
    });

    if (errors) {
      console.log(errors);
    }

    return;
  }

  return (
    <>
      <ModalHeader className="justify-center">Add Tire</ModalHeader>
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
            value={tire.name}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"wheelBase"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Wheel Base"}
            name={"wheelBase"}
            value={tire.wheelBase}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"stearingRackRatio"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Stearing Rack Ratio"}
            name={"stearingRackRatio"}
            value={tire.stearingRackRatio}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"gripFactorMultiplier"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Grip Factor Multiplier"}
            name={"gripFactorMultiplier"}
            value={tire.gripFactorMultiplier}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"tireRadius"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Tire Radius"}
            name={"tireRadius"}
            value={tire.tireRadius}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"rollingResistance"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Rolling Resistance"}
            name={"rollingResistance"}
            value={tire.rollingResistance}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"longitudinalFrictionCoefficient"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Longitudinal Friction Coefficient"}
            name={"longitudinalFrictionCoefficient"}
            value={tire.longitudinalFrictionCoefficient}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"longitudinalFrictionLoadRating"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Longitudinal Friction Load Rating"}
            name={"longitudinalFrictionLoadRating"}
            value={tire.longitudinalFrictionLoadRating}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"longitudinalFrictionSensitivity"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Longitudinal Friction Sensitivity"}
            name={"longitudinalFrictionSensitivity"}
            value={tire.longitudinalFrictionSensitivity}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"lateralFrictionCoefficient"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Lateral Friction Coefficient"}
            name={"lateralFrictionCoefficient"}
            value={tire.lateralFrictionCoefficient}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"lateralFrictionLoadRating"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Lateral Friction Load Rating"}
            name={"lateralFrictionLoadRating"}
            value={tire.lateralFrictionLoadRating}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"lateralFrictionSensitivity"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Lateral Friction Sensitivity"}
            name={"lateralFrictionSensitivity"}
            value={tire.lateralFrictionSensitivity}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            key={"frontCorneringStiffness"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Front Cornering Stiffness"}
            name={"frontCorneringStiffness"}
            value={tire.frontCorneringStiffness}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
          <Input
            key={"rearCorneringStiffness"}
            classNames={{
              input: [
                "bg-transparent",
                "text-foreground",
                "placeholder:text-grey",
              ],
              inputWrapper: "border-1 border-foreground rounded-none",
            }}
            label={"Rear Cornering Stiffness"}
            name={"rearCorneringStiffness"}
            value={tire.rearCorneringStiffness}
            variant="bordered"
            onChange={(e) => {
              const { name, value } = e.target;

              setTire((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          color="primary"
          onPress={async () => {
            await handleAddTire();
            onClose();
            updateCallback();
          }}
        >
          Add Tire
        </Button>
      </ModalFooter>
    </>
  );
}
