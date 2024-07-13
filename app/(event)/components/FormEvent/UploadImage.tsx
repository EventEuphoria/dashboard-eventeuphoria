"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useEvent from "@/hooks/useEvent";
import ConfirmationDialog from "../ConfirmationDialog";

interface UploadImageProps {
  eventId: number;
}

const UploadImage: React.FC<UploadImageProps> = ({ eventId }) => {
  const [image, setImage] = useState<File | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { uploadImage } = useEvent();
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = async () => {
    if (image) {
      const result = await uploadImage(eventId, image);
      if (result) {
        alert("Image uploaded successfully!");
        router.push(`/events/${eventId}`);
      } else {
        alert("Failed to upload image. Please try again.");
      }
    }
    setShowConfirmation(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input type="file" onChange={handleImageChange} accept="image/*" className="p-2 border rounded" />
      <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload Image
      </Button>

      {showConfirmation && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmation(false)}
          title="Confirm Upload"
          message="Are you sure you want to upload this image?"
        />
      )}
    </form>
  );
};

export default UploadImage;
