import SideNavList from "./SideNavList/SideNavList"

const SideNav: React.FC = () => {
    return(
        <>
        <div className="m-5 lg:sticky lg:top-5 lg:mb-5 mb-0 bg-dspDarkPurple rounded-xl text-white shadow-boxed shadow-gray-400">
            <div className="sidenav h-[93vh] flex flex-col justify-between p-5">
                <SideNavList />
            </div>
        </div>
        </>
    )
}

export default SideNav