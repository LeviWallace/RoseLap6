import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { title } from "process";

const schema = a.schema({
  Vehicle: a
    .model({
      name: a.string(),
      mass: a.float(),
      frontMassDistribution: a.float(),
      wheelbase: a.float(),
      steeringRackRatio: a.float(),
      
      tireId: a.id(),
      aerodynamicsId: a.id(),
      brakesId: a.id(),
      engineId: a.id(),
      transmissionId: a.id(),
      torqueCurveId: a.id(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Tire: a
    .model({
      name: a.string(),
      wheelBase: a.float(),
      stearingRackRatio: a.float(),
      gripFactorMultiplier: a.float(),
      tireRadius: a.float(),
      rollingResistance: a.float(),
      longitudinalFrictionCoefficient: a.float(),
      longitudinalFrictionLoadRating: a.float(),
      longitudinalFrictionSensitivity: a.float(),
      lateralFrictionCoefficient: a.float(),
      lateralFrictionLoadRating: a.float(),
      lateralFrictionSensitivity: a.float(),
      frontCorneringStiffness: a.float(),
      rearCorneringStiffness: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  
  Aerodynamics: a
    .model({
      name: a.string(),
      liftCoefficientCL: a.float(),
      dragCoefficientCD: a.float(),
      clScaleMultiplier: a.float(),
      cdScaleMultiplier: a.float(),
      frontAeroDistribution: a.float(),
      frontalArea: a.float(),
      airDensity: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),


  Brakes: a
    .model({
      name: a.string(),
      discOuterDiameter: a.float(),
      padHeight: a.float(),
      padFrictionCoefficient: a.float(),
      caliperNumberOfPistons: a.float(),
      caliperPistonDiameter: a.float(),
      masterCylinderPistonDiameter: a.float(),
      pedalRatio: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
  
  Engine: a
    .model({
      name: a.string(),
      powerFactorMultiplier: a.float(),
      thermalEfficiency: a.float(),
      fuelLowerHeatingValue: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Transmission: a
    .model({
      name: a.string(),
      driveType: a.enum(["FrontWheelDrive", "RearWheelDrive", "AllWheelDrive"]),
      finalDriveRatio: a.float(),
      gearShiftTime: a.float(),
      primaryGearEfficiency: a.float(),
      finalGearEfficiency: a.float(),
      gearboxEfficiency: a.float(),
      primaryGearReduction: a.float(),
      finalGearReduction: a.float(),
      gearRatios: a.float().array(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  TorqueCurve: a
    .model({
      name: a.string(),
      rpms: a.float().array(),
      torques: a.float().array(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Shape: a.customType({
    type: a.enum(["Straight", "LeftTurn", "RightTurn"]),
    length: a.float(),
    cornerRadius: a.float()
  }),

  Elevation: a.customType({
    point: a.float(),
    elevation: a.float(),
  }),

  Banking: a.customType({
    point: a.float(),
    banking: a.float(),
  }),

  Track: a
    .model({
      name: a.string(),
      country: a.string(),
      city: a.string(),
      direction: a.boolean(),
      mirror: a.boolean(),

      shape: a.ref('Shape').array(),
      elevation: a.ref('Elevation').array(),
      banking: a.ref('Banking').array(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>