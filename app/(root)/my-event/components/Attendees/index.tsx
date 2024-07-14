import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { AttendeesEvent } from "@/data/data"

const Attendees: React.FC = () =>{
    return (
        <Table>
          <TableCaption>A list of your recent attendees registration.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="">Event Attended</TableHead>
              <TableHead className="">Date & Location</TableHead>
              <TableHead className="text-right">Ticket Bought</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AttendeesEvent.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>{attendee.eventAttended}</TableCell>
                <TableCell>August 20th 2024, Jakarta</TableCell>
                <TableCell className="text-right">{attendee.ticketBought}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )
}

export default Attendees