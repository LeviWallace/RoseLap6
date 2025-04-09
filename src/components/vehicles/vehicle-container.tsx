import { Schema } from "../../../amplify/data/resource";
import VehicleCard from "./vehicle-card";

type Vehicle = Schema['Vehicle']['type'];

interface VehicleContainerProps {
	vehicles: Vehicle[];
	updateCallback: (vehicle: Vehicle) => void;
}


export default function VehicleContainer({ vehicles, updateCallback }: VehicleContainerProps) {
	return (
		<div className="grid grid-cols-3 justify-between m-2 p-2">
			{vehicles.map((vehicle, index) => (
				<VehicleCard
					key={index}
					vehicle={vehicle}
					updateCallback={updateCallback}
				/>
			))}
		</div>
	);
}

