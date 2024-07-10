"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { set, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import SelectInput from "@/components/main/inventory/warehouses/SelectInput";

const NewWarehouse = () => {
  const selectionOptions = [
    {
      label: "Main",
      value: "main",
    },
    {
      label: "Branch",
      value: "branch",
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const baseUrl = "http://localhost:3000";
    try {
      console.log(data);
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/warehouses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
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
      <FormHeader title="New Warehouse" href="/inventory/items" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 
                dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Warehouse Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            name="type"
            label="Select The Warehouse Type"
            register={register}
            className="w-full"
            options={selectionOptions}
          />
          <TextInput
            title="Warehouse Location"
            name="location"
            register={register}
            errors={errors}
          />
          <TextAreaInput
            title="Warehouse Description"
            name="description"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton isLoading={loading} title="Warehouse" />
      </form>
    </div>
  );
};

export default NewWarehouse;
