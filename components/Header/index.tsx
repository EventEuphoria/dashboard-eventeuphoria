import Link from "next/link"
import { IoIosArrowDown } from "react-icons/io"
import { RiAdminFill } from "react-icons/ri"

const Header: React.FC = () => {
    return(
        <>
        <div className="bg-dspDarkPurple my-5 mr-5 rounded-xl text-white flex justify-between items-center py-2 px-5 w-full gap-5 shadow-eventBox shadow-gray-500">
            <h1 className="font-bold text-tLg"><Link href="/">EventEuphoria</Link></h1>
            <div className="flex items-center gap-5  ">
                <Link href="" className="flex border border-white gap-2 items-center bg-black hover:bg-dspPurple p-1 rounded-full"><RiAdminFill className="rounded-full text-tXxl" /> Amalia <span className="p-2 rounded-full bg-dspDarkPurple text-white"><IoIosArrowDown /></span> </Link>
            </div>
        </div>
        </>
    )
}

export default Header