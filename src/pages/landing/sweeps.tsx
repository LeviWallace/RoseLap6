import DefaultLayout from "@/layouts/default";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue } from "@heroui/table";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

const client = generateClient<Schema>();

type Simulation = Schema['Simulation']['type'];
type SimulationRow = {
	key: string;
	vehicle: string;
	track: string;
	completed: string;
	updatedAt: string;
	goTo: string;
}

const columns = [
	{ key: "vehicle", label: "Vehicle" },
	{ key: "track", label: "Track" },
	{ key: "completed", label: "Completed" },
	{ key: "dateCreated", label: "Date Created" },
	{ key: "goTo", label: "Go To" },
];

export default function SweepsPage() {

	const [rows, setRows] = useState<SimulationRow[]>([]);

	async function handleFetchSweeps() {
		const { data, errors } = await client.models.Simulation.list();
		console.log(data, errors);
		
		const rowData: SimulationRow[] = await Promise.all(data.map(async (sweep: Simulation) => {
			const vehicle = await client.models.Vehicle.get({ id: sweep.vehicle });
			const track = await client.models.Track.get({ id: sweep.track });
			return {
				key: sweep.id,
				vehicle: vehicle.data?.name ?? "Missing Vehicle",
				track: track.data?.name ?? "Missing Track",
				completed: sweep.completed ? "Yes" : "No",
				updatedAt: sweep.updatedAt,
				goTo: `/simulation?id=${sweep.id}`
			}
		}));

		setRows(rowData);
	}

	useEffect(() => {
		handleFetchSweeps();
	}, []);

	return (
		<DefaultLayout>
			<Table aria-label="Sweeps Table"
				classNames={{
					table: "bg-white rounded-xl bg-transparent",
					wrapper: "rounded-none bg-transparent",
					th: "rounded-none border-1 border-foreground bg-transparent text-foreground font-bold",
				}}
				layout="fixed">
				<TableHeader columns={columns}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={rows}>
					{(item) => (
						<TableRow key={item.key}>
							{(columnKey) => 
								<TableCell>
									{columnKey === "goTo" ? 
									  (
										<Button 
											size="sm"
											className="w-full rounded-sm bg-foreground text-black font-semibold"
											as={Link} to={item.goTo}
											>
											Go to Simulation
										</Button>
										) 
									: (
										getKeyValue(item, columnKey)
										)
									}
								</TableCell>
							}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</DefaultLayout>
	);
}
