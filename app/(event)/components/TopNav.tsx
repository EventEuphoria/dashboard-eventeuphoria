import Link from "next/link"

const TopNav: React.FC = () => {
    return(
        <>
        <div className="w-full flex items-center justify-center p-2 shadow-eventBox ">
            <h1 className="font-bold text-tXl tracking-tighter"><Link href="/">EventEuphoria</Link></h1>
        </div>
        </>
    )
}

export default TopNav