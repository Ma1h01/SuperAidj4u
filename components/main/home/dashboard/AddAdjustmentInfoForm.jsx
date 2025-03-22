"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import {
  ADD_ADJUSTMENT_SERVER_BASE_URL,
  ADJUSTMENT_CLIENT_BASE_URL,
} from "@/lib/constants";
import { makePutRequest, makeDeleteRequest } from "@/lib/apiRequest";
import DisabledTextInput from "../../inventory/categories/DisabledTextInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "../../inventory/categories/TextAreaInput";
import SelectInput from "../../inventory/warehouses/SelectInput";

const AddAdjustmentInfoForm = ({ addAdjustment, items, warehouses }) => {
  const [referenceNumber, setReferenceNumber] = useState(
    addAdjustment.referenceNumber,
  );
  const [addStockQty, setAddStockQty] = useState(addAdjustment.addStockQty);
  const [itemId, setItemId] = useState(addAdjustment.itemId);
  const [receivingWarehouseId, setReceivingWarehouseId] = useState(
    addAdjustment.receivingWarehouseId,
  );
  const [notes, setNotes] = useState(addAdjustment.notes);

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
      `${ADD_ADJUSTMENT_SERVER_BASE_URL}/${addAdjustment.id}`,
      data,
      "Add Adjustment",
    );
    router.refresh();
  };

  const onDelete = async () => {
    const success = await makeDeleteRequest(
      `${ADD_ADJUSTMENT_SERVER_BASE_URL}/${addAdjustment.id}`,
      "Add Adjustment",
    );
    if (success) {
      router.push(ADJUSTMENT_CLIENT_BASE_URL);
      router.refresh();
    }
  };

  return (
    <div>
      {/* Header */}
      <FormHeader
        title="Add Adjustment Info"
        href={ADJUSTMENT_CLIENT_BASE_URL}
      />
      {/* Form */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <DisabledTextInput
              title="ID"
              text={addAdjustment.id}              
            />
            <TextInput
              title="Reference Number"
              name="referenceNumber"
              register={register}
              errors={errors}
              className="w-full"
              textValue={referenceNumber}
              setTextValue={setReferenceNumber}
            />
            <SelectInput
              label="Item"
              name="itemId"
              register={register}
              errors={errors}
              className="w-full"
              textValue={itemId}
              setTextValue={setItemId}
              options={items}
            />
            <TextInput
              title="Quantity"
              name="addStockQty"
              register={register}
              errors={errors}
              className="w-full"
              textValue={addStockQty}
              setTextValue={setAddStockQty}
              type="number"
            />
            <SelectInput
              label="Receiving Warehouse"
              name="receivingWarehouseId"
              register={register}
              errors={errors}
              className="w-full"
              textValue={receivingWarehouseId}
              setTextValue={setReceivingWarehouseId}
              options={warehouses}
            />
            <TextAreaInput
              title="Notes"
              name="notes"
              register={register}
              errors={errors}              
              textValue={notes}
              setTextValue={setNotes}            
            />

            <DisabledTextInput
              title="Created At"
              text={addAdjustment.createdAt}
              className="w-full"
            />
            <DisabledTextInput
              title="Updated At"
              text={addAdjustment.updatedAt}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Update Add Adjustment" />
        </form>
        <div className="flex justify-between">
          <button
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAdjustmentInfoForm;
