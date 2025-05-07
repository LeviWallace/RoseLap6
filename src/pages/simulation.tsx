import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { CircularProgress } from "@heroui/progress";
import { DateInput } from "@heroui/date-input";
import { parseAbsoluteToLocal} from "@internationalized/date";

import { Schema } from "@/../amplify/data/resource";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const client = generateClient<Schema>();

type Simulation = Schema["Simulation"]["type"];

export default function SimulationPage() {
  const params = new URLSearchParams(window.location.search);
  const [id, setId] = useState(params.get("id") || "Error fetching simulation data");
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  async function handleGetSimulation() {
    const { data, errors } = await client.models.Simulation.get({ id });

    if (errors || !data) {
      console.error(errors);
      setId("Error fetching simulation data");
      return;
    }

    if (!data.completed) {
      handleSimulate(data.id)

      const { data: newData, errors: newErrors } = await client.models.Simulation.get({ id });

      if (newErrors || !newData) {
        console.error(newErrors);
        setId("Error fetching simulation data");
        return;
      }

      const simulationData = newData as Simulation;
      setSimulation(simulationData);
    } else {
      const simulationData = data as Simulation;
      setSimulation(simulationData);
    }

    console.log(simulation);
    // console.log(simulation?.enginePowerCurve)
    // console.log(simulation?.engineTorqueCurve);
  }

  async function handleSimulate(id: string) {
    client.queries.simulate({
      id: id
    }).then((response) => {
      console.log("Simulation started", response);
    }).catch((error) => {
      console.error("Error starting simulation", error);
    });

  }

  useEffect(() => {
    handleGetSimulation();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="m-2 border-1 border-gray-200 rounded-xl shadow-lg min-h-[98vh]">
        <div className="flex flex-row justify-between items-center p-4 border-b-1 border-gray-200">
          <div className="flex flex-row items-center space-x-8">
            <h1 className="font-geist font-bold text-black tracking-tighter text-xl">
              {id}
            </h1>
            <div className="flex flex-row space-x-4">
              <a className="text-black">Overview</a>
              <a className="text-black">Results</a>
              <a className="text-black">Settings</a>
              <a className="text-black">Logs</a>
            </div>
          </div>
          <div className="flex flex-row">
            <Button
              as={Link}
              className="text-foreground text-md px-6"
              color="primary"
              radius="lg"
              size="lg"
              to="/"
            >
              Back Home
            </Button>
          </div>
        </div>
        <div className="p-5 h-full">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-black">
              Simulation Dashboard
            </h1>
            <div className="flex flex-row space-x-4 items-center">
              {simulation?.createdAt && <DateInput
                        defaultValue={parseAbsoluteToLocal(simulation?.createdAt)}
                        isDisabled
                        classNames={
                          {
                            inputWrapper: "bg-white",
                            segment: "!text-black",
                            input: "font-semibold",
                            base: "opacity-100"
}
                          }
              />}
              <Button className="bg-black text-white">Download</Button>
            </div>
          </div>
          <div className="mt-5 h-full">
            {(simulation && simulation.completed) ? (
              <Tabs
                defaultSelectedKey="benchmarking"
                // disabledKeys={["track", "vehicle"]}
                aria-label="Options"
                className="w-full"
                classNames={{
                  tabContent:
                    "text-black group-data-[selected=true]:text-white",
                  tabList: "bg-gray-100",
                }}

              >
                <Tab key="vehicle" title="Vehicle">
                  <div className="grid grid-cols-2 gap-4 justify-between items-center mt-5">
                    {(simulation.engineSpeedCurve) &&
                    <Card className="bg-white">
                      <CardHeader className="pb-2">
                        <h1 className="font-bold text-black px-3 pt-2">
                          Engine Power Curve
                        </h1>
                      </CardHeader>
                      <CardBody className="pb-0 pt-0">
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart data={simulation.engineSpeedCurve.map((rpm, index) => ({
                            rpm,
                            torque: (simulation.engineTorqueCurve ?? [])[index],
                            power: (simulation.enginePowerCurve ?? [])[index],
                          }))} margin={{ top: 20, right: 50, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="rpm" label={{ value: "Engine Speed [RPM]", position: "insideBottom", offset: -5 }} />
                            {/* Left Y-axis: Torque */}
                            <YAxis
                              yAxisId="left"
                              label={{ value: "Torque [Nm]", angle: -90, position: "insideLeft" }}
                            />

                            {/* Right Y-axis: Power */}
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              label={{ value: "Power [Hp]", angle: 90, position: "insideRight" }}
                            />

                            <Tooltip labelStyle={{color: 'black'}}
                                labelFormatter={(label) => { return label.toFixed(2) }}
                                formatter={(value: number) => { return value.toFixed(2) }}/>
                            <Legend />

                            <Line yAxisId="left" type="monotone" dataKey="torque" stroke="red" name="Torque" />
                            <Line yAxisId="right" type="monotone" dataKey="power" stroke="black" name="Power" />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardBody>
                    </Card>
      }
                    <Card className="bg-white">
                      <CardHeader className="pb-2">
                        <h1 className="font-bold text-black px-3 pt-2">
                          Engine Tractive Force vs. Vehicle Speed
                        </h1>
                      </CardHeader>
                      <CardBody className="pb-0 pt-0">
                        <ResponsiveContainer width="100%" height={400}>
                          <LineChart data={(simulation.vehicleSpeed ?? []).map((speed, index) => ({
                            speed: speed ? speed * 3.6 : 0,
                            force: (simulation.fxEngine ?? [])[index]
                          }))} margin={{ top: 20, right: 50, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="speed" label={{ value: 'Vehicle Speed [km/h]', position: 'insideBottomRight', offset: -5 }} tickFormatter={(value) => value.toFixed(0)}/>
                              <YAxis label={{ value: 'Tractive Force [N]', angle: -90, position: 'insideLeft' }} tickFormatter={(value) => value.toFixed(0)}/>
                              <Tooltip 
                                labelStyle={{color: 'black'}}
                                labelFormatter={(label) => { return label.toFixed(2) }}
                                formatter={(value: number) => { return value.toFixed(2) }}/>
                              <Legend />
                              <Line type="monotone" dataKey="force" stroke="red" strokeWidth={2} name="Engine Force" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                      </CardBody>
                    </Card>
                  </div>
                </Tab>
                <Tab key="track" title="Track">
                  <div>

                  </div>
                </Tab>
                <Tab key="benchmarking" title="Benchmarking">
                  <div className="grid grid-cols-5 gap-4 justify-between items-center mt-5">
                    {[
                      { label: "Database Fetch Time", value: simulation.tFetchTime, description: "Time taken to fetch data from the database" },
                      { label: "Brake Model Time", value: simulation.tBrakeModel, description: "Time taken for brake model calculations" },
                      { label: "Steering Model Time", value: simulation.tSteeringModel, description: "Time taken for steering model calculations" },
                      { label: "Driveline Model Time", value: simulation.tDrivelineModel, description: "Time taken for driveline model calculations" },
                      { label: "Shifting Model Time", value: simulation.tShitingModel, description: "Time taken for shifting model calculations" },
                      { label: "Force Model Time", value: simulation.tForceModel, description: "Time taken for force model calculations" },
                      { label: "GGV Map Model Time", value: simulation.tGGVMapModel, description: "Time taken for GGV map model calculations" },
                      { label: "Simulation Time", value: simulation.tSimulationTime, description: "Total simulation time" },
                    ].map((item, index) => (
                      <Card key={index} className="bg-white">
                        <CardHeader className="pb-2">
                          <h1 className="font-semibold text-black px-3 pt-2">
                            {item.label}
                          </h1>
                        </CardHeader>
                        <CardBody className="pb-0 pt-0">
                          <h1 className="text-2xl font-bold text-black px-3">
                            {item.value?.toFixed(4)} ms
                          </h1>
                        </CardBody>
                        <CardFooter className="pb-5 pt-1">
                          <h1 className="font-thin text-sm text-black px-3">
                            {item.description}
                          </h1>
                        </CardFooter>
                      </Card>
                    ))}

                  </div>
                </Tab>
              </Tabs>
            ) : (
              <div className="flex flex-col justify-center items-center h-fit">
                <CircularProgress
                  aria-label="Loading"
                  classNames={{
                    svg: "w-36 h-36 drop-shadow-md",
                    indicator: "stroke-black",
                    track: "stroke-white/90",
                    value: "text-1xl font-semibold text-black",
                  }}
                  showValueLabel={true}
                  strokeWidth={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
