import Button from "@/components/Button/Button";
import Link from "next/link";

interface NavList {
  links: string;
  name: string;
}

const navList: NavList[] = [
  { links: "/", name: "Dashboard" },
  { links: "/my-event", name: "My Event" },
  { links: "/my-event/transaction", name: "Transaction" },
  { links: "/my-event/attendees", name: "Attendees" },
];

const SideNavList: React.FC = () => {
  return (
    <>
      <ul className="flex flex-col gap-5">
        {navList.map((item, index) => (
          <li
            key={index}
            className="hover:scale-105 transition-all duration-300 hover:text-purple-200"
          >
            <Link href={item.links}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <Button className=""><Link href="/create-event">Create Event</Link></Button>
    </>
  );
};

export default SideNavList;
