import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { DateInput } from "@heroui/date-input";
import { parseAbsoluteToLocal} from "@internationalized/date";

import { Schema } from "../../../amplify/data/resource";

import DefaultLayout from "@/layouts/default";

const client = generateClient<Schema>();

type Simulation = Schema["Simulation"]["type"];
type SimulationRow = {
  key: string;
  vehicle: string;
  track: string;
  completed: string;
  dateCreated: string;
  goTo: string;
};

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

    const rowData: SimulationRow[] = await Promise.all(
      data.map(async (sweep: Simulation) => {
        const vehicle = await client.models.Vehicle.get({ id: sweep.vehicle });
        const track = await client.models.Track.get({ id: sweep.track });

        return {
          key: sweep.id,
          vehicle: vehicle.data?.name ?? "Missing Vehicle",
          track: track.data?.name ?? "Missing Track",
          completed: sweep.completed ? "Yes" : "No",
          dateCreated: sweep.createdAt,
          goTo: `/simulation?id=${sweep.id}`,
        };
      }),
    );

    setRows(rowData);
  }

  useEffect(() => {
    handleFetchSweeps();
  }, []);

  return (
    <DefaultLayout>
      <Table
        aria-label="Sweeps Table"
        classNames={{
          table: "bg-white rounded-xl bg-transparent",
          wrapper: "rounded-none bg-transparent",
          th: "rounded-none border-1 border-foreground bg-transparent text-foreground font-bold",
        }}
        layout="fixed"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  {(() => {
                  switch (columnKey) {
                    case "goTo":
                    return (
                      <Button
                      as={Link}
                      className="w-full rounded-sm bg-foreground text-black font-semibold"
                      size="sm"
                      to={item.goTo}
                      >
                      Go to Simulation
                      </Button>
                    );
                    case "dateCreated":
                      return (
                      <DateInput
                        aria-label="Simulation Date"
                        defaultValue={parseAbsoluteToLocal(item.dateCreated)}
                        isDisabled
                        classNames={
                          { inputWrapper: "bg-transparent ",
                            input: "text-foreground",
                            base: "opacity-100" }
                        }
                      />);
                    default:
                    return getKeyValue(item, columnKey);
                  }
                  })()}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DefaultLayout>
  );
}
