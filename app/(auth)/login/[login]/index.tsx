"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await login(values.email, values.password);
        } catch (error) {
          console.log("Login error", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-1">
            <Field
              type="email"
              placeholder="Input email ex: johndoe@email.com.."
              name="email"
              className="shadow-tightBoxed p-2 text-tXs  rounded-xl text-dspGray"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-600 text-[12px] w-fit rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Field
              type="password"
              placeholder="type your password here..."
              name="password"
              className="shadow-tightBoxed p-2 text-tXs  rounded-xl text-dspGray"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-600 text-[12px] w-fit rounded-xl"
            />
          </div>
          <button
            className="bg-dspPurple hover:bg-dspDarkPurple text-white py-2 w-fit self-center px-7 rounded-full hover:scale-105 ease-in-out transition-all duration-500"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
