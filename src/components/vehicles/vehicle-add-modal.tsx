import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@heroui/modal';
import { type Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import { Input } from '@heroui/input';

const client = generateClient<Schema>();

export default function VehicleAddModal({isOpen, onClose, updateCallback}: {isOpen: boolean, onClose: () => void, updateCallback: () => void}) {
    const [vehicle, setVehicle] = useState({
        name: undefined,
        mass: undefined,
        frontMassDistribution: undefined,

        tireId: undefined,
        aerodynamicsId: undefined,
        brakesId: undefined,
        engineId: undefined,
        transmissionId: undefined,
        torqueCurveId: undefined,
    });
    
    async function handleAddTrack() {
        const { errors, data } = await client.models.Vehicle.create({
            name: vehicle.name,
            mass: vehicle.mass,
            frontMassDistribution: vehicle.frontMassDistribution,

            tireId: vehicle.tireId,
            aerodynamicsId: vehicle.aerodynamicsId,
            brakesId: vehicle.brakesId,
            engineId: vehicle.engineId,
            transmissionId: vehicle.transmissionId,
            torqueCurveId: vehicle.torqueCurveId,
        })
        console.log(errors, data);
        updateCallback();
        return;
    }



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setVehicle((prev) => ({ ...prev, [name]: value }));
    } 

    return (
        <Modal isOpen={isOpen} size='4xl' onClose={onClose} radius='none'>
        <ModalContent className="border-white border-1 bg-background">
          {(onClose) => (
            <>
              <ModalHeader className="justify-center">Add Vehicle</ModalHeader>
              <ModalBody>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  name="name"
                  value={vehicle.name}
                  onChange={handleChange}
                  className="mb-4"
                  type="text"
                  label="Name"
                  variant="underlined"
                />
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  name="mass"
                  value={vehicle.mass}
                  onChange={handleChange}
                  className="mb-4"
                  type="text"
                  label="Mass"
                  variant="underlined"
                />
                <Input
                  name="fmd"
                  value={vehicle.frontMassDistribution}
                  onChange={handleChange}
                  className="mb-4"
                  type="text"
                  label="Front Mass Distribution"
                  variant="underlined"
                />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				
				</div>
              </ModalBody>
              <ModalFooter className="justify-end">
                <Button color="primary" onPress={() => { handleAddTrack(); onClose(); }}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )

}
