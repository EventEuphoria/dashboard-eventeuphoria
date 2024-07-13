"use client";

import FormEvent from "../components/FormEvent/FormEvent";
import useEvent from "@/hooks/useEvent";
import { EventValues } from "@/types/datatypes";
import { useRouter } from "next/navigation";

const CreateEventPage: React.FC = () => {
  const { postEvent } = useEvent();
  const router = useRouter();

  const initialValues = {
    eventName: "",
    description: "",
    date: "",
    time: "",
    location: "",
    city: "",
    eventType: "",
    category: "",
    ticketTiers: [{ name: "", price: 0, totalSeats: 0 }],
    vouchers: [],
    referralQuota: 0,
    eventPicture: "",
  };

  const handleSubmit = async (values: EventValues) => {
    const result = await postEvent(values);
    if (result) {
      alert('Event created successfully!');
      router.push('/my-events');
    } else {
      alert('Failed to create event. Please try again.');
    }
  };

  return <FormEvent initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default CreateEventPage;
