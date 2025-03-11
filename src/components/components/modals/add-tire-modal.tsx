import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { generateClient } from "aws-amplify/api";
import { useState } from "react";
import { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

export default function AddTireComponent({onClose, updateCallback}: { onClose: () => void, updateCallback: () => void }) {
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
            {Object.entries(tire).map(([key, value]) => (
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
                setTire((prev) => ({ ...prev, [name]: value }));
              }}
              />
            ))}
            </div>
        </ModalBody>
        <ModalFooter className="justify-end">
          <Button color="primary" onPress={async () => { await handleAddTire(); onClose(); updateCallback(); }}>
            Add Tire
          </Button>
        </ModalFooter>
      </>
    )
  }