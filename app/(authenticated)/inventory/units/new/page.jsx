"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { set, useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest";
import { UNIT_SERVER_BASE_URL, UNIT_CLIENT_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
const NewUnit = () => {
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
      UNIT_SERVER_BASE_URL,
      data,
      "unit",
    );
    setLoading(false);
    if (success) {
      router.push(UNIT_CLIENT_BASE_URL);
      router.refresh();
    }            
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="New Unit" href="/inventory/units" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Unit Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Unit Abbreviation"
            name="abbreviation"
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <SubmitButton isLoading={loading} title="Save Unit" />
      </form>
    </div>
  );
};

export default NewUnit;
