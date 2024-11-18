"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Appointment } from "@/lib/types"
import { formatDate } from "@/lib/dateCoverter"
import { CustomButton } from "@/components/forms/TextInput"



export const columns: ColumnDef<Appointment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  
  {
    accessorKey: "reason",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reason for Appointment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase line-clamp-1">{row.getValue("reason")}</div>,
  },
  {
    accessorKey: "doctorFullName",
    header: () => <div className="capitalize">Specialist</div>,
   
    cell: ({ row }) => <div className=" line-clamp-1 capitalize">{row.getValue("doctorFullName")}</div>,
  },
  {
    accessorKey: "appointmentDate",
    header: () => <div className="">Date</div>,
   
    cell: ({ row }) => {
      const date=row.getValue("appointmentDate")
    
    return <div className="lowercase line-clamp-1">{formatDate(new Date(date))}</div>
}
  },
  {
    accessorKey: "appointmentTime",
    header: "Time",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("appointmentTime")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
 
      return (
       
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Doctor&apos;s Profile</DropdownMenuItem>
            <DropdownMenuItem>Appoint. Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
 
