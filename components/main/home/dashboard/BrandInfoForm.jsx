"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { BRAND_CLIENT_BASE_URL, BRAND_SERVER_BASE_URL } from "@/lib/constants";
import { makePutRequest, makeDeleteRequest } from "@/lib/apiRequest";
import DisabledTextInput from "../../inventory/categories/DisabledTextInput";
import { useRouter } from "next/navigation";

const BrandInfoForm = ({ brand }) => {
  const [name, setName] = useState(brand.name);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await makePutRequest(
      setLoading,
      `${BRAND_SERVER_BASE_URL}/${brand.id}`,
      data,
      "brand",
    );
    router.refresh();
  };

  const onDelete = async () => {
    const success = await makeDeleteRequest(`${BRAND_SERVER_BASE_URL}/${brand.id}`, "brand");  
    if (success) {
      router.push(BRAND_CLIENT_BASE_URL);
      router.refresh();
    }
  }
  return (
    <div>
      {/* Header */}
      <FormHeader title="Brand Info" href="/inventory/brands" />
      {/* Form */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <DisabledTextInput title="ID" text={brand.id} className="w-full" />
            <TextInput
              title="Brand Name"
              name="name"
              register={register}
              errors={errors}
              className="w-full"
              textValue={name}
              setTextValue={setName}
            />
            <DisabledTextInput
              title="Created At"
              text={brand.createdAt}
              className="w-full"
            />
            <DisabledTextInput
              title="Updated At"
              text={brand.updatedAt}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Update Brand" />
        </form>
        <div className="flex justify-between">
          <button
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            <Trash2 className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandInfoForm;
