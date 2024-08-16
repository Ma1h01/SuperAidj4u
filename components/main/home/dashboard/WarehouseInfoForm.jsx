"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { WAREHOUSE_CLIENT_BASE_URL, warehouse_CLIENT_BASE_URL, WAREHOUSE_SERVER_BASE_URL, warehouse_SERVER_BASE_URL } from "@/lib/constants";
import { makePutRequest, makeDeleteRequest } from "@/lib/apiRequest";
import DisabledTextInput from "../../inventory/categories/DisabledTextInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "../../inventory/categories/TextAreaInput";
import SelectInput from "../../inventory/warehouses/SelectInput";

const WarehouseInfoForm = ({ warehouse }) => {  
  const [name, setName] = useState(warehouse.name);
  const [location, setLocation] = useState(warehouse.location);
  const [description, setDescription] = useState(warehouse.description);
  const [warehouseType, setWarehouseType] = useState(warehouse.warehouseType);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const selectionOptions = [
    {
      name: "Main",
    },
    {
      name: "Branch",
    },
  ];

  const onSubmit = async (data) => {
    await makePutRequest(
      setLoading,
      `${WAREHOUSE_SERVER_BASE_URL}/${warehouse.id}`,
      data,
      "warehouse",
    );
    router.refresh();
  };

  const onDelete = async () => {
    const success = await makeDeleteRequest(
      `${WAREHOUSE_SERVER_BASE_URL}/${warehouse.id}`,
      "warehouse",
    );
    if (success) {
      router.push(WAREHOUSE_CLIENT_BASE_URL);
      router.refresh();
    }
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="Warehouse Info" href="/inventory/warehouses" />
      {/* Form */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <DisabledTextInput
              title="ID"
              text={warehouse.id}
              className="w-full"
            />
            <TextInput
              title="Warehouse Name"
              name="name"
              register={register}
              errors={errors}
              className="w-full"
              textValue={name}
              setTextValue={setName}
            />
            <TextInput
              title="Warehouse Location"
              name="location"
              register={register}
              errors={errors}
              className="w-full"
              textValue={location}
              setTextValue={setLoading}
            />
            <SelectInput
              name="warehouseType"
              label="Select The Warehouse Type"
              register={register}
              className="w-full"
              options={selectionOptions}
              textValue={warehouseType}
              setTextValue={setWarehouseType}
            />
            <TextAreaInput
              title="Warehouse Description"
              name="description"
              register={register}
              errors={errors}
              textValue={description}
              setTextValue={setDescription}
            />
            <DisabledTextInput
              title="Created At"
              text={warehouse.createdAt}
              className="w-full"
            />
            <DisabledTextInput
              title="Updated At"
              text={warehouse.updatedAt}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Update warehouse" />
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

export default WarehouseInfoForm;
