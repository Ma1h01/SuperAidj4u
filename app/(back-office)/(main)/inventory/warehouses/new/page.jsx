"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import SelectInput from "@/components/main/inventory/warehouses/SelectInput";
import { makePostRequest } from "@/lib/apiRequest";
import { WAREHOUSE_CLIENT_BASE_URL, WAREHOUSE_SERVER_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
const NewWarehouse = () => {
  const selectionOptions = [
    {
      name: "Main",      
    },
    {
      name: "Branch",      
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const success = await makePostRequest(
      setLoading,
      reset,
      WAREHOUSE_SERVER_BASE_URL,
      data,
      "warehouse",
    );
    setLoading(false);
    if (success) {
      router.push(WAREHOUSE_CLIENT_BASE_URL);
      router.refresh();
    }    
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="New Warehouse" href="/inventory/warehouses" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 
                dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Warehouse Name"
            name="name"
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
        <SubmitButton isLoading={loading} title="Save Warehouse" />
      </form>
    </div>
  );
};

export default NewWarehouse;
