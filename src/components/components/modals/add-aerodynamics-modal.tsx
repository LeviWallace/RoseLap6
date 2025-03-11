import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
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
            {Object.entries(aerodynamics).map(([key, value]) => (
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
                setAerodynamics((prev) => ({ ...prev, [name]: value }));
              }}
              />
            ))}
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
