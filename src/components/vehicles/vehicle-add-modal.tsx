import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from '@heroui/modal';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { type Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import { Input } from '@heroui/input';
import { useEffect } from 'react';

const client = generateClient<Schema>();
type Component = { id: string, name: string };
type VehicleConfig = {name: string | undefined, mass: string | undefined, frontMassDistribution: string | undefined, tire: Component | undefined, aerodynamics: Component | undefined, brakes: Component | undefined, engine: Component | undefined, transmission: Component | undefined, torqueCurve: Component | undefined};

export default function VehicleAddModal({isOpen, onClose, updateCallback}: {isOpen: boolean, onClose: () => void, updateCallback: () => void}) {
    const [vehicle, setVehicle] = useState<VehicleConfig>({
        name: "",
        mass: undefined,
        frontMassDistribution: undefined,

        tire: undefined,
        aerodynamics: undefined,
        brakes: undefined,
        engine: undefined,
        transmission: undefined,
        torqueCurve: undefined,
    });

	const [components, setComponents] = useState({
		tires: [] as Component[],
		aerodynamics: [] as Component[],
		brakes: [] as Component[],
		engines: [] as Component[],
		transmissions: [] as Component[],
		torqueCurves: [] as Component[],
	});
   

	async function handleGetComponents() {
		const options: any = {
			selectionSet: ['id', 'name'],
		}
		const { data: tires } = await client.models.Tire.list(options);
		const { data: aerodynamics } = await client.models.Aerodynamics.list(options);
		const { data: brakes } = await client.models.Brakes.list(options);
		const { data: engines } = await client.models.Engine.list(options);
		const { data: transmissions } = await client.models.Transmission.list(options);
		const { data: torqueCurves } = await client.models.TorqueCurve.list(options);
		
		setComponents({
			tires: tires.map((tire) => ({ id: tire.id, name: tire.name as string })),
			aerodynamics: aerodynamics.map((aerodynamic) => ({ id: aerodynamic.id, name: aerodynamic.name as string })),
			brakes: brakes.map((brake) => ({ id: brake.id, name: brake.name as string })),
			engines: engines.map((engine) => ({ id: engine.id, name: engine.name as string })),
			transmissions: transmissions.map((transmission) => ({ id: transmission.id, name: transmission.name as string })),
			torqueCurves: torqueCurves.map((torqueCurve) => ({ id: torqueCurve.id, name: torqueCurve.name as string })),
		});
	}

	useEffect(() => {
		handleGetComponents();
	}, [isOpen]);

    async function handleAddVehicle() {
		console.log(vehicle);
		if (vehicle.tire === undefined || vehicle.aerodynamics === undefined || vehicle.brakes === undefined || vehicle.engine === undefined || vehicle.transmission === undefined || vehicle.torqueCurve === undefined) {
			console.error('Missing components');
			return
		}
        const { errors, data } = await client.models.Vehicle.create({
            name: vehicle.name,
            mass: vehicle.mass ? parseInt(vehicle.mass) : undefined,
            frontMassDistribution: vehicle.frontMassDistribution ? parseFloat(vehicle.frontMassDistribution) : undefined,
            tireId: vehicle.tire.id,
            aerodynamicsId: vehicle.aerodynamics.id,
            brakesId: vehicle.brakes.id,
            engineId: vehicle.engine.id,
            transmissionId: vehicle.transmission.id,
            torqueCurveId: vehicle.torqueCurve.id,
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
    <Modal isOpen={isOpen} size='4xl' onClose={onClose} radius='none' isDismissable={false} isKeyboardDismissDisabled>
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
                  variant="bordered"
				  classNames={{
					  input: ['bg-transparent', 'text-foreground', 'placeholder:text-grey'],
					  inputWrapper: "border-1 border-foreground rounded-none",
				  }}
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
				  variant="bordered"
				  classNames={{
					  input: ['bg-transparent', 'text-foreground', 'placeholder:text-grey'],
					  inputWrapper: "border-1 border-foreground rounded-none",
				  }}
                />
                <Input
                  name="fmd"
                  value={vehicle.frontMassDistribution}
                  onChange={handleChange}
                  className="mb-4"
                  type="text"
                  label="Front Mass Distribution"
                  variant="bordered"
			   	  classNames={{
					  input: ['bg-transparent', 'text-foreground', 'placeholder:text-grey'],
					  inputWrapper: "border-1 border-foreground rounded-none",
				  }} 
				  />
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Autocomplete
						className="max-w-xs"
						defaultItems={components.tires}
						label="Tire"
						placeholder="Select Tire"
						variant="bordered"
						value={vehicle.tire}
						isRequired
					>
						{(tire) => <AutocompleteItem key={tire.id}>{tire.name}</AutocompleteItem>}
					</Autocomplete>
					
					<Autocomplete
						className="max-w-xs"
						defaultItems={components.brakes}
						label="Brake"
						placeholder="Select Brake"
						variant="bordered"
						isRequired
					>
					{(brake) => <AutocompleteItem key={brake.id}>{brake.name}</AutocompleteItem>}
					</Autocomplete>
				
					
					<Autocomplete
						className="max-w-xs"
						defaultItems={components.aerodynamics}
						label="Aerodynamics"
						placeholder="Select Aerodynamics"
						variant="bordered"
						isRequired
					>
					{(aerodynamic) => <AutocompleteItem key={aerodynamic.id}>{aerodynamic.name}</AutocompleteItem>} 
					</Autocomplete>

					<Autocomplete
						className="max-w-xs"
						defaultItems={components.engines}
						label="Engine"
						placeholder="Select Engine"
						variant="bordered"
						isRequired
					>
					{(engine) => <AutocompleteItem key={engine.id}>{engine.name}</AutocompleteItem>}
					</Autocomplete>
					
					<Autocomplete
						className="max-w-xs"
						defaultItems={components.transmissions}
						label="Transmission"
						placeholder="Select Transmission"
						variant="bordered"
						isRequired
					>
					{(transmission) => <AutocompleteItem key={transmission.id}>{transmission.name}</AutocompleteItem>}
					</Autocomplete>

				</div>

              </ModalBody>
              <ModalFooter className="justify-end">
                <Button color="primary" onPress={() => { handleAddVehicle(); onClose(); }}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )

}
