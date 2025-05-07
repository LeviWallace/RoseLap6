import { Card, CardHeader, CardBody } from "@heroui/card";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';


type SimulationGraphCardProps = {
    title: string,
    data: {
        rpm: number,
        torque: number,
        power: number
    }[]
}

export default function SimulationGraphCard({ title, data }: SimulationGraphCardProps) {
    return (
            <Card className="w-[59%] bg-white">
                <CardHeader className="pb-2">
                    <h1 className="font-bold text-black px-3 pt-2">
                        {title}
                    </h1>
                </CardHeader>
                <CardBody className="pb-0 pt-0">
                <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data} margin={{ top: 20, right: 50, left: 20, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="10 10" />
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

                            <Tooltip />
                            <Legend />

                            <Line yAxisId="left" type="monotone" dataKey="torque" stroke="red" name="Torque" />
                            <Line yAxisId="right" type="monotone" dataKey="power" stroke="black" name="Power" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardBody>
            </Card>
    );
}