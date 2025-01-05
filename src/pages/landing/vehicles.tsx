import DefaultLayout from "@/layouts/default";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@nextui-org/table";

import { type Field, vehicle } from "@/config/sim";

export default function Vehicles() {
  return (
    <DefaultLayout>
        <h1 className="text-foreground text-3xl tracking-tigher p-2 font-bold">Vehicles Page</h1>
        
        <div className="w-full" >
            <Table aria-label="Vehicle Table" selectionMode="single"
                classNames={{
                    table: "bg-background text-foreground",
                    thead: "border-1",
                    th: "text-foreground bg-transparent",
                    td: "border-none",
                    tbody: "bg-transparent",
                    wrapper: "p-0 rounded-none",
                }}>
                <TableHeader columns={Object.values(vehicle)}>
                    {(column: Field) => <TableColumn key={column.label}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"No rows to display."}>
                </TableBody>
            </Table>
        </div>
    </DefaultLayout>
  );
}