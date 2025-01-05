export type Vehicle = typeof vehicle;

export type Field = {
    type: string;
    label: string;
    unit: string;
}

export const vehicle = {
    name: {
        type: "String",
        label: "Name",
        unit: "String",
    },
    mass: {
        type: "Number",
        label: "Mass",
        unit: "kg",
    },
    frontMassDistriubtion: {
        type: "Number",
        label: "Front Mass Distribution",
        unit: "%",
    },
    driveType: {
        type: "String",
        label: "Drive Type",
        unit: "String",
    },
    /* COMPONENTS */
    tireId: {
        label : "Tire",
        type: "Number",
        unit: "",
    },
    aerodynamicsId: {
        label: "Aerodynamics",
        type: "Number",
        unit: "",
    },
    brakesId: {
        label: "Brakes",
        type: "Number",
        unit: "",
    },
    engineId: {
        label: "Engine",
        type: "Number",
        unit: "",
    },
    drivetrainId: {
        label: "Drivetrain",
        type: "Number",
        unit: "",
    }
}

export type Tire = typeof track;

export const track = {
    name: {
        type: "String",
        label: "Name",
        unit: "String",
    },
    wheelBase: {
        type: "Number",
        label: "Wheel Base",
        unit: "mm",
    },
    stearingRackRatio: {
        type: "Number",
        label: "Stearing Rack Ratio",
        unit: "%",
    },
    gripFactorMultiplier: {
        type: "Number",
        label: "Grip Factor Multiplier",
        unit: "",
    },
    tireRadius: {
        type: "Number",
        label: "Tire Radius",
        unit: "mm",
    }
}