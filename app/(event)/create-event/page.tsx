"use client";

import React from 'react';
import Button from "@/components/Button/Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import FormEvent from '../components/FormEvent/FormEvent';
import useEvent from '@/hooks/useEvent';
import { useRouter } from 'next/navigation';
import { EventValues } from '@/types/datatypes';

const CreateEventPage: React.FC = () => {
  const { postEvent } = useEvent();
  const router = useRouter();

  const initialValues: EventValues = {
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
      router.push(`/upload-image/${result.data.id}`);
    } else {
      alert('Failed to create event. Please try again.');
    }
  };

  return(
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
        <FormEvent initialValues={initialValues} onSubmit={handleSubmit} />
      </div>
    </div>
  )
};

export default CreateEventPage;
