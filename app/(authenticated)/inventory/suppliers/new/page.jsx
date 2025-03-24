"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import { makePostRequest } from "@/lib/apiRequest";
import { SUPPLIER_CLIENT_BASE_URL, SUPPLIER_SERVER_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
const NewSupplier = () => {
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
      SUPPLIER_SERVER_BASE_URL,
      data,
      "supplier",
    );
    setLoading(false);
    if (success) {
      router.push(SUPPLIER_CLIENT_BASE_URL);
      router.refresh();
    }       
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="New Supplier" href="/inventory/suppliers" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 
                dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Supplier Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Supplier Contact Person"
            name="contactPerson"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Supplier Phone"
            name="phone"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Supplier Email"
            name="email"
            register={register}
            errors={errors}
            type="email"
            className="w-full"
          />
          <TextInput
            title="Supplier Address"
            name="address"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Supplier Code"
            name="supplierCode"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Supplier Tax Id"
            name="taxID"
            register={register}
            errors={errors}
          />
          <TextAreaInput
            title="Supplier Payment Term"
            name="paymentTerms"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton isLoading={loading} title="Save Supplier" />
      </form>
    </div>
  );
};

export default NewSupplier;
