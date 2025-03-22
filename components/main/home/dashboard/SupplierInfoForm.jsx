"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { set, useForm } from "react-hook-form";
import { Trash2 } from "lucide-react";
import {
  SUPPLIER_CLIENT_BASE_URL,
  SUPPLIER_SERVER_BASE_URL
} from "@/lib/constants";
import { makePutRequest, makeDeleteRequest } from "@/lib/apiRequest";
import DisabledTextInput from "../../inventory/categories/DisabledTextInput";
import { useRouter } from "next/navigation";
import TextAreaInput from "../../inventory/categories/TextAreaInput";

const SupplierInfoForm = ({ supplier }) => {
  const [name, setName] = useState(supplier.name);
  const [phone, setPhone] = useState(supplier.phone);
  const [email, setEmail] = useState(supplier.email);
  const [address, setAddress] = useState(supplier.address);
  const [contactPerson, setContactPerson] = useState(supplier.contactPerson);
  const [supplierCode, setSupplierCode] = useState(supplier.supplierCode);
  const [paymentTerms, setPaymentTerms] = useState(supplier.paymentTerms);
  const [taxID, setTaxID] = useState(supplier.taxID);

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
      `${SUPPLIER_SERVER_BASE_URL}/${supplier.id}`,
      data,
      "supplier",
    );
    router.refresh();
  };

  const onDelete = async () => {
    const success = await makeDeleteRequest(
      `${SUPPLIER_SERVER_BASE_URL}/${supplier.id}`,
      "supplier",
    );
    if (success) {
      router.push(SUPPLIER_CLIENT_BASE_URL);
      router.refresh();
    }
  };
  return (
    <div>
      {/* Header */}
      <FormHeader title="Supplier Info" href="/inventory/suppliers" />
      {/* Form */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <DisabledTextInput
              title="ID"
              text={supplier.id}
              className="w-full"
            />
            <TextInput
              title="Supplier Name"
              name="name"
              register={register}
              errors={errors}
              className="w-full"
              textValue={name}
              setTextValue={setName}
            />
            <TextInput
              title="Contact Person"
              name="contactPerson"
              register={register}
              errors={errors}
              className="w-full"
              textValue={contactPerson}
              setTextValue={setContactPerson}
            />
            <TextInput
              title="Supplier Phone"
              name="phone"
              register={register}
              errors={errors}
              className="w-full"
              textValue={phone}
              setTextValue={setPhone}
            />
            <TextInput
              title="Email"
              name="email"
              register={register}
              errors={errors}
              className="w-full"
              textValue={email}
              setTextValue={setEmail}
            />
            <TextInput
              title="Address"
              name="address"
              register={register}
              errors={errors}
              className="w-full"
              textValue={address}
              setTextValue={setAddress}
            />
            <TextInput
              title="Supplier Code"
              name="supplierCode"
              register={register}
              errors={errors}
              className="w-full"
              textValue={supplierCode}
              setTextValue={setSupplierCode}
            />
            <TextInput
              title="Tax ID"
              name="taxID"
              register={register}
              errors={errors}
              className="w-full"
              textValue={taxID}
              setTextValue={setTaxID}
            />
            <TextAreaInput
              title="Payment Terms"
              name="paymentTerms"
              register={register}
              errors={errors}            
              textValue={paymentTerms}
              setTextValue={setPaymentTerms}              
            />
            <DisabledTextInput
              title="Created At"
              text={supplier.createdAt}
              className="w-full"
            />
            <DisabledTextInput
              title="Updated At"
              text={supplier.updatedAt}
              className="w-full"
            />
          </div>
          <SubmitButton isLoading={loading} title="Update supplier" />
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

export default SupplierInfoForm;
