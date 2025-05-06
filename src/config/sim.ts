export type Vehicle = typeof vehicleConfig;

export type Field = {
  type: string;
  label: string;
  unit: string;
};

export const vehicleConfig = {
  /* BASE */
  title: {
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
  wheelbase: {
    type: "Number",
    label: "Wheelbase",
    unit: "mm",
  },
  steeringRackRatio: {
    type: "Number",
    label: "Stearing Rack Ratio",
    unit: "",
  },

  /* COMPONENTS */
  tireId: {
    label: "Tire",
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
  transmissionId: {
    label: "Transmission",
    type: "Number",
    unit: "",
  },

  /* TORQUE CURVE */
  torqueCurveId: {
    type: "Array",
    label: "Torque Curve",
    unit: "Nm",
  },

  fields: [
    "title",
    "mass",
    "frontMassDistribution",
    "wheelbase",
    "steeringRackRatio",
    "tireId",
    "aerodynamicsId",
    "brakesId",
    "engineId",
    "transmissionId",
    "torqueCurveId",
  ],
};

export type Tire = typeof tiresConfig;

export const tiresConfig = {
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
  },
  rollingResistance: {
    type: "Number",
    label: "Rolling Resistance",
    unit: "",
  },
  longitudinalFrictionCoefficient: {
    type: "Number",
    label: "Longitudinal Friction Coefficient",
    unit: "",
  },
  longitudinalFrictionLoadRating: {
    type: "Number",
    label: "Longitudinal Friction Load Rating",
    unit: "kg",
  },
  longitudinalFrictionSensitivity: {
    type: "Number",
    label: "Longitudinal Friction Sensitivity",
    unit: "1/N",
  },
  lateralFrictionCoefficient: {
    type: "Number",
    label: "Lateral Friction Coefficient",
    unit: "",
  },
  lateralFrictionLoadRating: {
    type: "Number",
    label: "Lateral Friction Load Rating",
    unit: "kg",
  },
  lateralFrictionSensitivity: {
    type: "Number",
    label: "Lateral Friction Sensitivity",
    unit: "1/N",
  },
  frontCorneringStiffness: {
    type: "Number",
    label: "Front Cornering Stiffness",
    unit: "N/deg",
  },
  rearCorneringStiffness: {
    type: "Number",
    label: "Rear Cornering Stiffness",
    unit: "N/deg",
  },
};

export type Aerodynamics = typeof aerodynamicsConfig;

export const aerodynamicsConfig = {
  name: {
    type: "String",
    label: "Name",
    unit: "String",
  },
  liftCoefficientCL: {
    type: "Number",
    label: "Lift Coefficient CL",
    unit: "",
  },
  dragCoefficientCD: {
    type: "Number",
    label: "Drag Coefficient CD",
    unit: "",
  },
  clScaleMultiplier: {
    type: "Number",
    label: "CL Scale Multiplier",
    unit: "",
  },
  cdScaleMultiplier: {
    type: "Number",
    label: "CD Scale Multiplier",
    unit: "",
  },
  frontAeroDistribution: {
    type: "Number",
    label: "Front Aero Distribution",
    unit: "%",
  },
  frontalArea: {
    type: "Number",
    label: "Frontal Area",
    unit: "m2",
  },
  airDensity: {
    type: "Number",
    label: "Air Density",
    unit: "kg/m3",
  },
};

export type Brakes = typeof brakesConfig;

export const brakesConfig = {
  name: {
    type: "String",
    label: "Name",
    unit: "String",
  },
  discOuterDiameter: {
    type: "Number",
    label: "Disc Outer Diameter",
    unit: "mm",
  },
  padHeight: {
    type: "Number",
    label: "Pad Height",
    unit: "mm",
  },
  padFrictionCoefficient: {
    type: "Number",
    label: "Pad Friction Coefficient",
    unit: "-",
  },
  caliperNumberOfPistons: {
    type: "Number",
    label: "Caliper Number of Pistons",
    unit: "-",
  },
  caliperPistonDiameter: {
    type: "Number",
    label: "Caliper Piston Diameter",
    unit: "mm",
  },
  masterCylinderPistonDiameter: {
    type: "Number",
    label: "Master Cylinder Piston Diameter",
    unit: "mm",
  },
  pedalRatio: {
    type: "Number",
    label: "Pedal Ratio",
    unit: "-",
  },
};

export type Engine = typeof engineConfig;

export const engineConfig = {
  name: {
    type: "String",
    label: "Name",
    unit: "String",
  },
  powerFactorMultiplier: {
    type: "Number",
    label: "Power Factor Multiplier",
    unit: "-",
  },
  thermalEfficiency: {
    type: "Number",
    label: "Thermal Efficiency",
    unit: "-",
    recommendedValue: 0.3,
  },
  fuelLowerHeatingValue: {
    type: "Number",
    label: "Fuel Lower Heating Value",
    unit: "J/kg",
    recommendedValue: 4.72e7,
  },
};

export type Transmission = typeof transmissionConfig;

export const transmissionConfig = {
  name: {
    type: "String",
    label: "Name",
    unit: "String",
  },
  driveType: {
    type: "String",
    label: "Drive Type",
    unit: "",
  },
  gearShiftTime: {
    type: "Number",
    label: "Gear Shift Time",
    unit: "s",
  },
  primaryGearEfficiency: {
    type: "Number",
    label: "Primary Gear Efficiency",
    unit: "-",
    recommendedValue: 0.98,
  },
  finalGearEfficiency: {
    type: "Number",
    label: "Final Gear Efficiency",
    unit: "-",
    recommendedValue: 0.9,
  },
  gearboxEfficiency: {
    type: "Number",
    label: "Gearbox Efficiency",
    unit: "-",
    recommendedValue: 0.98,
  },
  primaryGearReduction: {
    type: "Number",
    label: "Primary Gear Reduction",
    unit: "-",
  },
  finalGearReduction: {
    type: "Number",
    label: "Final Gear Reduction",
    unit: "-",
  },
  gearRatios: {
    type: "Array",
    label: "Gear Ratios",
    unit: "-",
  },
};
