import useEvent from "@/hooks/useEvent";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoSettings } from "react-icons/io5";
import placeholderImg from "@/public/assets/art-exhibition2.jpg"
import Link from "next/link";

const EventCard: React.FC = () => {
  return (
    <>
      <div>
        <div className="event-card flex gap-3 items-center justify-between border-dspLightPurple border-4 rounded-xl p-5">
          <p>1. </p>
          <div>
            <Image
              src={placeholderImg} //image of event if null then placeholder img
              alt="event image"
              width={100}
              height={100}
              className="rounded-xl border-2 border-dspLightPurple"
            />
          </div>
          <h3 className="font-bold text-tXl"><Link href="/my-event/transaction" className="cursor-pointer">Event for code</Link></h3>
          <p>Technology</p>
          <p>Rp50000 - Rp100000</p>
          <DropdownMenu>
            <DropdownMenuTrigger><IoSettings className="text-head3 text-dspLightGray" /> </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel> Event Name</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Event</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default EventCard;
