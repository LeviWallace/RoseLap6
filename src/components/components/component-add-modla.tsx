import { Button } from '@heroui/button';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@heroui/modal';
import { type Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import { Input } from '@heroui/input';

const client = generateClient<Schema>();

/**
 * ComponentAddModal component allows users to add a new track by providing necessary details
 * such as name, country, state, and city. It displays a modal with input fields for each
 * detail and a button to submit the form.
 *
**/
export default function ComponentAddModal({isOpen, onClose, updateCallback}: {isOpen: boolean, onClose: () => void, updateCallback: () => void}) {
    const [component, setComponent] = useState({
        type: "",
        tire: {
            name: "",
            wheelBase: 0,
            stearingRackRatio: 0,
            gripFactorMultiplier: 0,
            tireRadius:  0,
            rollingResistance: 0,
            longitudinalFrictionCoefficient:  0,
            longitudinalFrictionLoadRating:  0,
            longitudinalFrictionSensitivity:  0,
            lateralFrictionCoefficient:  0,
            lateralFrictionLoadRating:  0,
            lateralFrictionSensitivity:  0,
            frontCorneringStiffness:  0,
            rearCorneringStiffness:  0,
        },
        aerodynamics: {
              name: "",
              liftCoefficientCL: 0,
              dragCoefficientCD: 0,
              clScaleMultiplier: 0,
              cdScaleMultiplier: 0,
              frontAeroDistribution: 0,
              frontalArea: 0,
              airDensity: 0,
            },
        brakes: {
            name: "",
            discOuterDiameter: 0,
            padHeight: 0,
            padFrictionCoefficient: 0,
            caliperNumberOfPistons: 0,
            caliperPistonDiameter: 0,
            masterCylinderPistonDiameter: 0,
            pedalRatio: 0,
        },
        
        engine: {
            name: "",
            powerFactorMultiplier: 0,
            thermalEfficiency: 0,
            fuelLowerHeatingValue: 0,
        },
    
        transmission: {
            name: "",
            driveType: "",
            finalDriveRatio: 0,
            gearShiftTime: 0,
            primaryGearEfficiency: 0,
            finalGearEfficiency: 0,
            gearboxEfficiency: 0,
            primaryGearReduction: 0,
            finalGearReduction: 0,
            gearRatios: [],
        },
    
        torqueCurve: {
            name: "",
            rpms: [],
            torques: [],
        }

    });
    
    async function handleAddTrack() {
        const { errors, data } = await client.models.Track.create({
            name: track["name"],
            country: track["country"],
            state: track["state"],
            city: track["city"],
            direction: track["direction"],
            mirror: track["mirror"],
            shape: track["shape"],
            elevation: track["elevation"],
            banking: track["banking"],
        })
        console.log(errors, data);
        updateCallback();
        return;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setTrack((prev) => ({ ...prev, [name]: value }));
    }


    return (
        <Modal isOpen={isOpen} size='lg' onClose={onClose} radius='none'>
        <ModalContent className="border-white border-1 bg-background">
          {(onClose) => (
            <>
              <ModalHeader className="justify-center">Add Track</ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  value={track.name}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Enter track name"
                  type="text"
                  label="Name"
                  variant="underlined"
                />
                <Input
                  name="country"
                  value={track.country}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Enter country name"
                  type="text"
                  label="Country"
                  variant="underlined"
                />
                <Input
                  name="state"
                  value={track.state}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Enter state name"
                  type="text"
                  label="State"
                  variant="underlined"
                />
                <Input
                  name="city"
                  value={track.city}
                  onChange={handleChange}
                  className="mb-4"
                  placeholder="Enter city name"
                  type="text"
                  label="City"
                  variant="underlined"
                />
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