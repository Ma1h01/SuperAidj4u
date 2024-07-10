"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { set, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";

const NewUnit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const baseUrl = "http://localhost:3000"
    try {
      console.log(data);
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/units`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        console.log(response)
        reset();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="New Unit" href="/inventory/items" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Unit Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Unit Abbrevuation"
            name="abbreviation"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <SubmitButton isLoading={loading} title="Unit" />
      </form>
    </div>
  );
};

export default NewUnit;
