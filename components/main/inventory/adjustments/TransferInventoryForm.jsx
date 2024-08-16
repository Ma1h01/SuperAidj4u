"use client";
import { React, useState } from "react";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import SelectInput from "@/components/main/inventory/warehouses/SelectInput";
import toast from "react-hot-toast";
import { makePostRequest } from "@/lib/apiRequest";
import {
  NEW_TRANSFER_ADJUSTMENT_URL,
} from "@/lib/constants";
const TransferInventoryForm = ({ items, warehouses }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    makePostRequest(
      setLoading,
      reset,
      NEW_TRANSFER_ADJUSTMENT_URL,
      data,
      "adjustment",
    );
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
            title="Reference Number"
            name="referenceNumber"
            register={register}
            errors={errors}
            type="text"
          />
          <SelectInput
            name="itemId"
            label="Select Item"
            register={register}
            className="w-full"
            options={items}
          />
          <TextInput
            title="Enter Quantity of Stocks to Transfer"
            name="transferStockQty"
            register={register}
            errors={errors}
            type="number"
            className="w-full"
          />
          <SelectInput
            name="givingWarehouseId"
            label="Select the Warehouse to Transfer Stocks"
            register={register}
            className="w-full"
            options={warehouses}
          />
          <SelectInput
            name="receivingWarehouseId"
            label="Select the Warehouse to Receive Stocks"
            register={register}
            className="w-full"
            options={warehouses}
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

export default TransferInventoryForm;
