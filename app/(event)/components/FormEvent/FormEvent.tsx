"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import imageCompression from "browser-image-compression";
import useEvent from "@/hooks/useEvent";
import { IoAdd } from "react-icons/io5";
import { BiMinusCircle } from "react-icons/bi";

const validationSchema = Yup.object().shape({
  eventName: Yup.string().required("Event name is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
  location: Yup.string().required("Location is required"),
  city: Yup.string().required("City is required"),
  eventType: Yup.string().required("Event type is required"),
  category: Yup.string().required("Category is required"),
  ticketTiers: Yup.array().of(
    Yup.object().shape({
      tierName: Yup.string().required("Tier name is required"),
      price: Yup.number().min(0, "Price must be non-negative"),
      availableSeats: Yup.number().required("Available seats are required").min(1, "Must have at least one seat"),
    })
  ).required("Ticket tiers are required"),
  vouchers: Yup.array().of(
    Yup.object().shape({
      voucherName: Yup.string().required("Voucher name is required"),
      discountAmount: Yup.number().required("Discount amount is required").min(0, "Discount must be non-negative"),
      expiryDate: Yup.date().required("Expiry date is required"),
    })
  ).nullable(),
  refferalQuota: Yup.number()
    .required("Limit for refferal quota is require"),
  eventPicture: Yup.mixed()
    .required("Event picture is required")
    .test("fileType", "Unsupported File Format", function (value) {
      if (!value) return false;
      return ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(value.type);
    })
    .test("fileSize", "File too large", (value) => value && value.size <= 5048576),
});

const FormEvent: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formValues, setFormValues] = useState<any>(null);
  const router = useRouter();
  const { loading, error, postEvent } = useEvent();

  const initialValues = {
    eventName: "",
    description: "",
    date: "",
    time: "",
    location: "",
    city: "",
    eventType: "",
    category: "",
    ticketTiers: [{ tierName: "", price: 0, availableSeats: 0 }],
    vouchers: [],
    refferalQuota: 0,
    eventPicture: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = {
      ...values,
      ticketTiers: values.ticketTiers.map(tier => ({
        tierName: tier.tierName,
        price: tier.price,
        availableSeats: tier.availableSeats,
      })),
      vouchers: values.vouchers ? values.vouchers.map(voucher => ({
        voucherName: voucher.voucherName,
        discountAmount: voucher.discountAmount,
        expiryDate: voucher.expiryDate,
      })) : [],
      eventPicture: values.eventPicture ? URL.createObjectURL(values.eventPicture) : ""
    };

    setFormValues(formData);
    setShowConfirmation(true);
    setSubmitting(false);
  };

  const handleConfirm = async () => {
    if (formValues) {
      const result = await postEvent(formValues);
      if (result) {
        alert("Event created successfully!");
        router.push("/my-event");
      } else {
        alert("Failed to create event. Please try again.");
      }
    }
    setShowConfirmation(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setFieldValue("eventPicture", compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fieldContainer = "flex flex-col gap-1";
  const fieldStyle = "shadow-boxed rounded-xl p-2";
  const errorStyle = "text-[12px] text-red-600";
  const labelStyle = "font-semibold";

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div className={fieldContainer}>
              <label htmlFor="eventName" className={labelStyle}>
                Event Name
              </label>
              <Field name="eventName" type="text" className={fieldStyle} />
              <ErrorMessage name="eventName" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="category" className={labelStyle}>
                Category
              </label>
              <Field name="category" as="select" className={fieldStyle}>
                <option value="" label="Select category" />
                <option value="Music" label="Music" />
                <option value="Art" label="Art" />
                <option value="Technology" label="Technology" />
                <option value="Food" label="Food" />
              </Field>
              <ErrorMessage name="category" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="description" className={labelStyle}>
                Description
              </label>
              <Field name="description" as="textarea" className={fieldStyle} />
              <ErrorMessage name="description" component="div" className={errorStyle} />
            </div>

            <div className="flex gap-3 w-full">
              <div className={fieldContainer}>
                <label htmlFor="date" className={labelStyle}>
                  Date
                </label>
                <Field name="date" type="date" className={fieldStyle} />
                <ErrorMessage name="date" component="div" className={errorStyle} />
              </div>

              <div className={fieldContainer}>
                <label htmlFor="time" className={labelStyle}>
                  Time
                </label>
                <Field name="time" type="time" className={fieldStyle} />
                <ErrorMessage name="time" component="div" className={errorStyle} />
              </div>
            </div>

            <div className={fieldContainer}>
              <label htmlFor="location" className={labelStyle}>
                Location
              </label>
              <Field name="location" type="text" className={fieldStyle} />
              <ErrorMessage name="location" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="city" className={labelStyle}>
                City
              </label>
              <Field name="city" type="text" className={fieldStyle} />
              <ErrorMessage name="city" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="eventType" className={labelStyle}>
                Event Type
              </label>
              <Field name="eventType" as="select" className={fieldStyle}>
                <option value="" label="Select event type" />
                <option value="Paid" label="Paid" />
                <option value="Free" label="Free" />
              </Field>
              <ErrorMessage name="eventType" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="ticketTiers" className={labelStyle}>
                Ticket Tiers
              </label>
              <FieldArray name="ticketTiers">
                {({ push, remove }) => (
                  <>
                    {values.ticketTiers.map((tier, index) => (
                      <div key={index} className="my-2 border p-2 rounded">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold">Tier {index + 1}</h4>
                          <button type="button" onClick={() => remove(index)} className="text-red-500">
                            <BiMinusCircle size={24} />
                          </button>
                        </div>
                        <div className={fieldContainer}>
                          <label htmlFor={`ticketTiers[${index}].tierName`} className={labelStyle}>
                            Tier Name
                          </label>
                          <Field name={`ticketTiers[${index}].tierName`} type="text" className={fieldStyle} />
                          <ErrorMessage name={`ticketTiers[${index}].tierName`} component="div" className={errorStyle} />
                        </div>
                        <div className={fieldContainer}>
                          <label htmlFor={`ticketTiers[${index}].price`} className={labelStyle}>
                            Price
                          </label>
                          <Field name={`ticketTiers[${index}].price`} type="number" className={fieldStyle} />
                          <ErrorMessage name={`ticketTiers[${index}].price`} component="div" className={errorStyle} />
                        </div>
                        <div className={fieldContainer}>
                          <label htmlFor={`ticketTiers[${index}].availableSeats`} className={labelStyle}>
                            Available Seats
                          </label>
                          <Field name={`ticketTiers[${index}].availableSeats`} type="number" className={fieldStyle} />
                          <ErrorMessage name={`ticketTiers[${index}].availableSeats`} component="div" className={errorStyle} />
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={() => push({ tierName: "", price: 0, availableSeats: 0 })}>
                      <IoAdd size={24} /> Add Tier
                    </Button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className={fieldContainer}>
              <label htmlFor="vouchers" className={labelStyle}>
                Vouchers
              </label>
              <FieldArray name="vouchers">
                {({ push, remove }) => (
                  <>
                    {values.vouchers.map((voucher, index) => (
                      <div key={index} className="my-2 border p-2 rounded">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-bold">Voucher {index + 1}</h4>
                          <button type="button" onClick={() => remove(index)} className="text-red-500">
                            <BiMinusCircle size={24} />
                          </button>
                        </div>
                        <div className={fieldContainer}>
                          <label htmlFor={`vouchers[${index}].voucherName`} className={labelStyle}>
                            Voucher Name
                          </label>
                          <Field name={`vouchers[${index}].voucherName`} type="text" className={fieldStyle} />
                          <ErrorMessage name={`vouchers[${index}].voucherName`} component="div" className={errorStyle} />
                        </div>
                        <div className={fieldContainer}>
                          <label htmlFor={`vouchers[${index}].discountAmount`} className={labelStyle}>
                            Discount Amount
                          </label>
                          <Field name={`vouchers[${index}].discountAmount`} type="number" className={fieldStyle} />
                          <ErrorMessage name={`vouchers[${index}].discountAmount`} component="div" className={errorStyle} />
                        </div>
                        <div className={fieldContainer}>
                          <label htmlFor={`vouchers[${index}].expiryDate`} className={labelStyle}>
                            Expiry Date
                          </label>
                          <Field name={`vouchers[${index}].expiryDate`} type="date" className={fieldStyle} />
                          <ErrorMessage name={`vouchers[${index}].expiryDate`} component="div" className={errorStyle} />
                        </div>
                      </div>
                    ))}
                    <Button type="button" onClick={() => push({ voucherName: "", discountAmount: 0, expiryDate: "" })}>
                      <IoAdd size={24} /> Add Voucher
                    </Button>
                  </>
                )}
              </FieldArray>
            </div>

            <div className={fieldContainer}>
              <label htmlFor="description" className={labelStyle}>
                Refferal Disc. Quota
              </label>
              <Field name="description" type="number" className={fieldStyle} />
              <ErrorMessage name="description" component="div" className={errorStyle} />
            </div>

            <div className={fieldContainer}>
              <label htmlFor="eventPicture" className={labelStyle}>
                Event Picture
              </label>
              <input
                id="eventPicture"
                name="eventPicture"
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={(event) => handleImageUpload(event, setFieldValue)}
                className="p-2 border rounded"
              />
              <ErrorMessage name="eventPicture" component="div" className={errorStyle} />
            </div>

            <Button type="submit" disabled={isSubmitting || loading} className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </Button>
          </Form>
        )}
      </Formik>

      {showConfirmation && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onClose={() => setShowConfirmation(false)}
          title="Confirm Submission"
          message="Are you sure you want to submit this event?"
        />
      )}
    </>
  );
};

export default FormEvent;
