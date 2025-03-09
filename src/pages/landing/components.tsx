import DefaultLayout from "@/layouts/default";
// import ComponentsContainer from "@/components/components/components-container";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/../amplify/data/resource';
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
// import ComponentsAddModal from "@/components/components/components-add-modal";

const client = generateClient<Schema>();

type BrakeComponent = Schema['Brakes']['type'];
type EngineComponent = Schema['Engine']['type'];
type TireComponent = Schema['Tire']['type'];
type TransmissionComponent = Schema['Transmission']['type'];
type AerodynamicsComponent = Schema['Aerodynamics']['type'];

type Component = BrakeComponent | EngineComponent | TireComponent | TransmissionComponent | AerodynamicsComponent;

/**
 *  Component is responsible for displaying and managing a list of componentss.
 * It includes functionalities for fetching componentss, searching componentss, and adding new componentss.
 *
 * @component
 * @example
 * return (
 *   <ComponentsPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function ComponentsPage() {
    const [componentData, setComponentData] = useState({
        components: [] as Component[],
        search: "",
        selectedComponents: [] as boolean[],
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    async function handleGetComponents() {
        const brakes = await fetchBrakes();
        const engines = await fetchEngines();
        const tires = await fetchTires();
        const transmissions = await fetchTransmissions();
        const aerodynamics = await fetchAerodynamics();

        setComponentData((prevData) => ({
            ...prevData,
            components: [...brakes, ...engines, ...tires, ...transmissions, ...aerodynamics],
        }));
    }

    async function fetchBrakes(): Promise<Component[]> {
        const { data, errors } = await client.models.Brakes.list({
            filter: {
                name: {
                    contains: componentData.search,
                },
            },
        });
        if (errors) {
            console.log(errors);
            return [];
        }
        return data as Component[];
    }

    async function fetchEngines(): Promise<Component[]> {
        const { data, errors } = await client.models.Engine.list({
            filter: {
                name: {
                    contains: componentData.search,
                },
            },
        });
        if (errors) {
            console.log(errors);
            return [];
        }
        return data as Component[];
    }

    async function fetchTires(): Promise<Component[]> {
        const { data, errors } = await client.models.Tire.list({
            filter: {
                name: {
                    contains: componentData.search,
                },
            },
        });
        if (errors) {
            console.log(errors);
            return [];
        }
        return data as Component[];
    }

    async function fetchTransmissions(): Promise<Component[]> {
        const { data, errors } = await client.models.Transmission.list({
            filter: {
                name: {
                    contains: componentData.search,
                },
            },
        });
        if (errors) {
            console.log(errors);
            return [];
        }
        return data as Component[];
    }

    async function fetchAerodynamics(): Promise<Component[]> {
        const { data, errors } = await client.models.Aerodynamics.list({
            filter: {
                name: {
                    contains: componentData.search,
                },
            },
        });
        if (errors) {
            console.log(errors);
            return [];
        }
        return data as Component[];
    }
    
    useEffect(() => {
        handleGetComponents();
    }, [componentData.search, componentData.selectedComponents]);

    
    function handleComponentsAddModal(): void {
        onOpen();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComponentData((prevData) => ({ ...prevData, search: e.target.value}));
    }

    return (
        <>
        <ComponentsAddModal isOpen={isOpen} onClose={onClose} updateCallback={handleGetComponentss}></ComponentsAddModal>
        <DefaultLayout>
            <div className="grid grid-cols-12"></div>
                <div className="flex justify-between items-center space-x-2">
                    <Input
                        name="password"
                        value={search}
                        onChange={handleInputChange}
                        className="my-7 px-4"
                        placeholder="Search All Componentss.."
                        type="text"
                        label="Password"
                        variant="underlined"
                    />
                    <Button onPress={handleSearchComponentss}>Search</Button>
                    <Button onPress={() => handleComponentsAddModal()}>Add Components</Button>
                </div>
            <div className="grid grid-cols12">
                <ComponentsContainer componentss={componentss} updateCallback={handleGetComponentss}/>
            </div>
        </DefaultLayout>
        </>
    )
}