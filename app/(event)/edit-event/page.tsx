"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useEvent from '@/hooks/useEvent';
import FormEvent from '../components/FormEvent/FormEvent';

const EditEvent: React.FC = () => {
  const { id } = useParams();
  const { getEvent, updateEvent } = useEvent();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(id);
      if (event) {
        setInitialValues({
          eventName: event.eventName,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          city: event.city,
          eventType: event.eventType,
          category: event.category,
          ticketTiers: event.ticketTiers || [{ tierName: "", price: 0, availableSeats: 0 }],
          vouchers: event.vouchers || [],
          eventPicture: event.eventPicture || "",
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id, getEvent]);

  const handleSubmit = async (values) => {
    const result = await updateEvent(id, values);
    if (result) {
      alert('Event updated successfully!');
      router.push('/my-events');
    } else {
      alert('Failed to update event. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return initialValues ? (
    <FormEvent initialValues={initialValues} onSubmit={handleSubmit} />
  ) : (
    <p>Event not found.</p>
  );
};

export default EditEvent;
