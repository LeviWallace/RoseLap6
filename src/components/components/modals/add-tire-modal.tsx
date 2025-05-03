import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/divider";
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
						name={"name"}
						label={"Name"}
						value={tire.name}
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
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Input
						key={"wheelBase"}
						name={"wheelBase"}
						label={"Wheel Base"}
						value={tire.wheelBase}
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
					<Input
						key={"stearingRackRatio"}
						name={"stearingRackRatio"}
						label={"Stearing Rack Ratio"}
						value={tire.stearingRackRatio}
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
					<Input
						key={"gripFactorMultiplier"}
						name={"gripFactorMultiplier"}
						label={"Grip Factor Multiplier"}
						value={tire.gripFactorMultiplier}
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
					<Input
						key={"tireRadius"}
						name={"tireRadius"}
						label={"Tire Radius"}
						value={tire.tireRadius}
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
					<Input
						key={"rollingResistance"}
						name={"rollingResistance"}
						label={"Rolling Resistance"}
						value={tire.rollingResistance}
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
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Input
						key={"longitudinalFrictionCoefficient"}
						name={"longitudinalFrictionCoefficient"}
						label={"Longitudinal Friction Coefficient"}
						value={tire.longitudinalFrictionCoefficient}
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
					<Input
						key={"longitudinalFrictionLoadRating"}
						name={"longitudinalFrictionLoadRating"}
						label={"Longitudinal Friction Load Rating"}
						value={tire.longitudinalFrictionLoadRating}
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
					<Input
						key={"longitudinalFrictionSensitivity"}
						name={"longitudinalFrictionSensitivity"}
						label={"Longitudinal Friction Sensitivity"}
						value={tire.longitudinalFrictionSensitivity}
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
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Input
						key={"lateralFrictionCoefficient"}
						name={"lateralFrictionCoefficient"}
						label={"Lateral Friction Coefficient"}
						value={tire.lateralFrictionCoefficient}
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
					<Input
						key={"lateralFrictionLoadRating"}
						name={"lateralFrictionLoadRating"}
						label={"Lateral Friction Load Rating"}
						value={tire.lateralFrictionLoadRating}
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
					<Input
						key={"lateralFrictionSensitivity"}
						name={"lateralFrictionSensitivity"}
						label={"Lateral Friction Sensitivity"}
						value={tire.lateralFrictionSensitivity}
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
				</div>
				<Divider />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Input
						key={"frontCorneringStiffness"}
						name={"frontCorneringStiffness"}
						label={"Front Cornering Stiffness"}
						value={tire.frontCorneringStiffness}
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
					<Input
						key={"rearCorneringStiffness"}
						name={"rearCorneringStiffness"}
						label={"Rear Cornering Stiffness"}
						value={tire.rearCorneringStiffness}
						variant="bordered"
						classNames={{
							input: ["bg-transparent", "text-foreground", "placeholder:text-grey"],
							inputWrapper: "border-1 border-foreground rounded-none",
						}}
						onChange={(e) => {
							const { name, value } = e.target;
							setTire((prev) => ({ ...prev, [name]: value }));
						}
						}
					/>
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
