"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import useEvent from '@/hooks/useEvent';
import FormEvent from '../components/FormEvent/FormEvent';
import { EventValues } from '@/types/datatypes';

interface EditProps {
  params: {
    id: number;
  };
}

const EditEvent: React.FC<EditProps> = ({ params }) => {
  const { getEvent, updateEvent } = useEvent();
  const [initialValues, setInitialValues] = useState<EventValues | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(params.id);
      if (event) {
        setInitialValues({
          eventName: event.name,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          city: event.city,
          eventType: event.eventType,
          category: event.category,
          ticketTiers: event.ticketTiers || [{ tierName: "", price: 0, availableSeats: 0 }],
          vouchers: event.eventVouchers || [],
          referralQuota: event.referralQuota || 0,
          eventPicture: event.eventPicture || "",
        });
      }
      setLoading(false);
    };
    fetchEvent();
  }, [params.id, getEvent]);

  const handleSubmit = async (values: EventValues) => {
    const result = await updateEvent(params.id, values);
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
