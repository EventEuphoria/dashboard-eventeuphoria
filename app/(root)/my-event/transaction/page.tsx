import Attendees from "../components/Attendees";
import Transaction from "./components/Transaction";

const TransactionPage: React.FC = () => {
  return (
    <>
    <div className="flex flex-col gap-5 ">

        <h2 className="font-bold text-tXxl">Transaction for This Event</h2>
        <hr />
        <div>
            <Transaction />    
        </div>
    </div>
    </>
  );
};

export default TransactionPage;
