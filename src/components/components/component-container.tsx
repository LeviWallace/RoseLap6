import { Schema } from "../../../amplify/data/resource";

import ComponentCard from "./component-card";

type BrakeComponent = Schema["Brakes"]["type"];
type EngineComponent = Schema["Engine"]["type"];
type TireComponent = Schema["Tire"]["type"];
type TransmissionComponent = Schema["Transmission"]["type"];
type AerodynamicsComponent = Schema["Aerodynamics"]["type"];

type Component =
  | BrakeComponent
  | EngineComponent
  | TireComponent
  | TransmissionComponent
  | AerodynamicsComponent;

interface ComponentContainerProps {
  components: Component[];
  updateCallback: () => void;
}

export default function ComponentContainer({
  components,
  updateCallback,
}: ComponentContainerProps) {
  return (
    <div className="grid grid-cols-3 justify-between m-2 p-2">
      {components.map((component, index) => (
        <ComponentCard
          key={index}
          component={component}
          updateCallback={updateCallback}
        />
      ))}
    </div>
  );
}
