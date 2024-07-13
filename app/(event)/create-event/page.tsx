import Button from "@/components/Button/Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import FormEvent from "../components/FormEvent/FormEvent";

const CreateEvent: React.FC = () => {
    return (
        <div className="flex items-center justify-center m-auto p-5 w-full">
            <div className="flex flex-col max-w-[800px]">
                <div className="">
                    <Button>
                        <Link href="/" className="flex items-center">
                            <FaArrowLeft className="mr-2" /> Back
                        </Link>
                    </Button>
                    <h1 className="font-bold text-head3 mt-4">Create Your Own Event</h1>
                </div>
                <FormEvent />
            </div>
        </div>
    );
}

export default CreateEvent;