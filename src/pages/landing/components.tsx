import DefaultLayout from "@/layouts/default";
// import ComponentsContainer from "@/components/components/components-container";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/../amplify/data/resource';
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import ComponentAddModal from "@/components/components/component-add-modal";
import ComponentContainer from "@/components/components/component-container";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";


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
        type: ""
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

    
    function handleComponentsAddModal(type: string): void {
        setComponentData((prevData) => ({ ...prevData, type: type}));
        onOpen();
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComponentData((prevData) => ({ ...prevData, search: e.target.value}));
    }

    return (
        <>
        <ComponentAddModal isOpen={isOpen} onClose={onClose} updateCallback={handleGetComponents} type={componentData.type}></ComponentAddModal>
        <DefaultLayout>
            <div className="grid grid-cols-12"></div>
                <div className="flex justify-between items-center space-x-2">
                    <Input
                        name="component-search"
						label="Components"
                        value={componentData.search}
                        onChange={handleInputChange}
                        className="my-7 px-4"
                        placeholder="Search All Components..."
                        type="text"
                        variant="underlined"
                    />
                    <Dropdown
                        showArrow
                        classNames={{
                            base: "before:", // change arrow background
                            content: "border border-white bg-background",
                        }}>
                        <DropdownTrigger>
                            <Button>
                                Add Component
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key={"tire"} onPress={() => handleComponentsAddModal("tire")}>
                                Tire
                            </DropdownItem>
                            <DropdownItem key={"brakes"} onPress={() => handleComponentsAddModal("brakes")}>
                                Brakes
                            </DropdownItem>
                            <DropdownItem key={"aerodynamics"} onPress={() => handleComponentsAddModal("aerodynamics")}>
                                Aerodynamics
                            </DropdownItem>
                            <DropdownItem key={"engine"} onPress={() => handleComponentsAddModal("engine")}>
                                Engine
                            </DropdownItem>
                            <DropdownItem key={"transmission"} onPress={() => handleComponentsAddModal("transmission")}>
                                Transmission
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <ComponentContainer components={componentData.components} updateCallback={handleGetComponents}/>
        </DefaultLayout>
        </>
    )
}
