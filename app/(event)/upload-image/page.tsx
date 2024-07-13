"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import UploadImage from '../components/FormEvent/UploadImage';

const UploadImagePage: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  if (!eventId) {
    return <p>Loading...</p>;
  }

  return <UploadImage eventId={Number(eventId)} />;
};

export default UploadImagePage;
