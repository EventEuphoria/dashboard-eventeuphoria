import EventList from "./components/EventList"

const MyEvent: React.FC = () => {
    return(
        <>
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-tXxl">List of Event You Created</h1>
            <hr />
            <div>
                <EventList />
            </div>
        </div>
        </>
    )
}

export default MyEvent