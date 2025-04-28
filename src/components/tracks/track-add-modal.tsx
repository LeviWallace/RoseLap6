import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { type Schema } from '@/../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { useState } from 'react';
import { Input } from '@heroui/input';
import { Divider } from '@heroui/divider';
import {Checkbox} from "@heroui/checkbox";

const client = generateClient<Schema>();



/**
 * TrackAddModal component allows users to add a new track by providing necessary details
 * such as name, country, state, and city. It displays a modal with input fields for each
 * detail and a button to submit the form.
 *
 **/
export default function TrackAddModal({ isOpen, onClose, updateCallback }: { isOpen: boolean, onClose: () => void, updateCallback: () => void }) {
	const [track, setTrack] = useState({
		name: "",
		country: "",
		state: "",
		city: "",
		direction: false,
		mirror: false,
		shape: [],
		elevation: [],
		banking: [],
		shapesSize: 1
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

	function handleAddShapeSize() {
		setTrack((prev) => ({ ...prev, shapesSize: prev.shapesSize + 1 }));
	}


	return (
		<Modal isOpen={isOpen} size='4xl' onClose={onClose} radius='none'>
			<ModalContent className="border-white border-1 bg-background">
				{(onClose) => (
					<>
						<ModalHeader className="justify-center">Add Track</ModalHeader>
						<ModalBody>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<Input
									name="name"
									value={track.name}
									onChange={handleChange}
									placeholder="Enter track name"
									type="text"
									label="Name"
									variant="bordered"
									classNames={{
										input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
										inputWrapper: "border-1 border-foreground rounded-none",
									}}
								/>
								<Input
									name="country"
									value={track.country}
									onChange={handleChange}
									placeholder="Enter country name"
									type="text"
									label="Country"
									variant="bordered"
									classNames={{
										input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
										inputWrapper: "border-1 border-foreground rounded-none",
									}}
								/>
								<Input
									name="state"
									value={track.state}
									onChange={handleChange}
									placeholder="Enter state name"
									type="text"
									label="State"
									variant="bordered"
									classNames={{
										input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
										inputWrapper: "border-1 border-foreground rounded-none",
									}}
								/>
								<Input
									name="city"
									value={track.city}
									onChange={handleChange}
									placeholder="Enter city name"
									type="text"
									label="City"
									variant="bordered"
									classNames={{
										input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
										inputWrapper: "border-1 border-foreground rounded-none",
									}}
								/>
							</div>
							<Divider />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Checkbox defaultSelected radius="none" color="primary" size="sm">
									Direction Forward?
								</Checkbox>
								<Checkbox radius="none" color="primary" size="sm">
									Mirror?
								</Checkbox>
							</div>
							<Divider />
							<div className="flex flex-col gap-2">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-xl font-bold">Track Shape</h2>
										<h5 className="text-sm text-gray">Add points elevation and banking to the track shape</h5>
									</div>
									<Button color="primary" className="mt-2" radius="full" size="sm" onPress={handleAddShapeSize}> 
										+
									</Button>
								</div>
								<div className="grid md:grid-cols-2 gap-2">
									{Array.from({ length: track.shapesSize }, (_, i) => (	   
										<div key={i} className="flex flex-row gap-2 items-center">
											<div className="flex absolute justify-center items-center w-5 h-5 bg-primary rounded-full">
												<h1>{i + 1}</h1>
											</div>
											<div className="flex flex-row gap-2 px-4 mx-4">
												<Input className="h-1/6"
													name="x"
													label="X Coord"
													key={'x' + i}
													isRequired
													variant="bordered"	
													classNames={{
														input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
														inputWrapper: "border-1 border-foreground rounded-none",
													}}
												/>
												<Input className="h-1/6"
													name="x"
													label="Y Coord"
													key={'y' + i}
													isRequired
													variant="bordered"	
													classNames={{
														input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
														inputWrapper: "border-1 border-foreground rounded-none",
													}}
												/>
												<Input className="h-1/6"
													name="x"
													label="Elevation"
													key={'e' + 1}
													isRequired
													variant="bordered"	
													classNames={{
														input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
														inputWrapper: "border-1 border-foreground rounded-none",
													}}
												/>
												<Input className="h-1/6"
													name="x"
													label="Banking"
													key={'b' + 1}
													isRequired
													variant="bordered"	
													classNames={{
														input: ["bg-transparent", "text-foreground", "placeholder:text-gray"],
														inputWrapper: "border-1 border-foreground rounded-none",
													}}
												/>
											</div>
										</div>
																						))}
								</div>
							</div>

						</ModalBody>
						<ModalFooter className="justify-end">
							<Button color="primary" onPress={() => { handleAddTrack(); onClose(); }}>
								Add
							</Button>
						</ModalFooter>
					</>
				)
				}
			</ModalContent >
		</Modal >
	)
}
