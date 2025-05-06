import { Schema } from "../../../amplify/data/resource";

import VehicleCard from "./vehicle-card";

type Vehicle = Schema["Vehicle"]["type"];

interface VehicleContainerProps {
  vehicles: Vehicle[];
  updateCallback: (vehicle: Vehicle) => void;
}

export default function VehicleContainer({
  vehicles,
  updateCallback,
}: VehicleContainerProps) {
  return (
    <>
      {vehicles.map((vehicle, index) => (
        <VehicleCard
          key={index}
          updateCallback={updateCallback}
          vehicle={vehicle}
        />
      ))}
    </>
  );
}
