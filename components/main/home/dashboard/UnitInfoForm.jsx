"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import {
  UNIT_CLIENT_BASE_URL,
    UNIT_SERVER_BASE_URL,
} from "@/lib/constants";
import { makePutRequest, makeDeleteRequest } from "@/lib/apiRequest";
import DisabledTextInput from "../../inventory/categories/DisabledTextInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "../../inventory/categories/TextAreaInput";

const UnitInfoForm = ({ unit }) => {
    console.log(unit);
  const [name, setName] = useState(unit.name);
  const [abbreviation, setAbbreviation] = useState(unit.abbreviation);
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
      `${UNIT_SERVER_BASE_URL}/${unit.id}`,
      data,
      "unit",
    );
    router.refresh();
  };

  const onDelete = async () => {
    const success = await makeDeleteRequest(
      `${UNIT_SERVER_BASE_URL}/${unit.id}`,
      "unit",
    );
    if (success) {
      router.push(UNIT_CLIENT_BASE_URL);
      router.refresh();
    }
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="Unit Info" href="/inventory/units" />
      {/* Form */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <DisabledTextInput title="ID" text={unit.id} className="w-full" />
            <TextInput
              title="Unit Name"
              name="name"
              register={register}
              errors={errors}
              className="w-full"
              textValue={name}
              setTextValue={setName}
            />
            <TextInput
              title="Unit Abbreviation"
              name="abbreviation"
              register={register}
              errors={errors}
              className="w-full"
              textValue={abbreviation}
              setTextValue={setAbbreviation}
            />
            <DisabledTextInput
              title="Created At"
              text={unit.createdAt}
              className="w-full"
            />
            <DisabledTextInput
              title="Updated At"
              text={unit.updatedAt}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Update Unit" />
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

export default UnitInfoForm;
