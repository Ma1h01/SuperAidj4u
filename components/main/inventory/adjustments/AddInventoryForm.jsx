"use client";
import { React, useState } from "react";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import SelectInput from "@/components/main/inventory/warehouses/SelectInput";

const AddInventoryForm = () => {
  const selectionOptions = [
    {
      label: "Branch A",
      value: "branchA_Id",
    },
    {
      label: "Branch B",
      value: "branchB_Id",
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
      const response = await fetch(`${baseUrl}/api/adjustments/add`, {
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
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 
                dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Enter Quantity of Stocks to Add"
            name="addStockQty"
            register={register}
            errors={errors}
            className="w-full"
            type="number"
          />
          <SelectInput
            name="receivingWarehouseId"
            label="Select the Warehouse to Add To"
            register={register}
            className="w-full"
            options={selectionOptions}
          />
          <TextAreaInput
            title="Adjustment Notes"
            name="notes"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton isLoading={loading} title="Adjustment" />
      </form>
    </div>
  );
};

export default AddInventoryForm;
