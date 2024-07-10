"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import SelectInput from "@/components/main/inventory/warehouses/SelectInput";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import ImageInput from "@/components/main/inventory/items/ImageInput";

const NewItem = () => {
  const [imageUrl, setImageUrl] = useState("");
  const categoryOptions = [
    {
      label: "Electronic",
      value: "electronic001",
    },
    {
      label: "Clothes",
      value: "clothes001",
    },
  ];
  const unitOptions = [
    {
      label: "Box",
      value: "box",
    },
    {
      label: "Pcs",
      value: "pcs",
    },
    {
      label: "Pallet",
      value: "pallet",
    },
  ];
  const brandOptions = [
    {
      label: "HP",
      value: "hp",
    },
    {
      label: "Dell",
      value: "dell",
    },
  ];
  const warehouseOptions = [
    {
      label: "Warehouse A",
      value: "warehouseA",
    },
    {
      label: "Warehouse B",
      value: "warehouseB",
    },
  ];
  const supplierOptions = [
    {
      label: "Supplier A",
      value: "supplierA",
    },
    {
      label: "Supplier B",
      value: "supplierB",
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
      data.imageUrl = imageUrl;
      console.log(data);
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/items`, {
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
      {/* Header */}
      <FormHeader title="New Item" href="/inventory/items" />
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 
                dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Item Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            name="categoryId"
            label="Select the Item Category Type"
            register={register}
            className="w-full"
            options={categoryOptions}
          />
          <TextInput
            title="Item SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Item Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
          />
          <TextInput
            title="Item Quantity"
            name="quantity"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            name="unitId"
            label="Select the Item Unit"
            register={register}
            className="w-full"
            options={unitOptions}
          />
          <TextInput
            title="Item Weight in KG"
            name="weight"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Item Dimensions in cm (20 * 30 * 100)"
            name="dimensions"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            name="brandId"
            label="Select the Item Brand"
            register={register}
            className="w-full"
            options={brandOptions}
          />
          <SelectInput
            name="supplierId"
            label="Select the Item Supplier"
            register={register}
            className="w-full"
            options={supplierOptions}
          />
          <SelectInput
            name="warehouseId"
            label="Select the Item Warehouse"
            register={register}
            className="w-full"
            options={warehouseOptions}
          />
          <TextInput
            title="Buying Price"
            name="buyingPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Selling Price"
            name="sellingPrice"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            title="Re-Order Point"
            name="reOrderPoint"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            title="Item Tax Rate in %"
            name="taxRate"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextAreaInput
            title="Item Description"
            name="description"
            register={register}
            errors={errors}
          />
          <TextAreaInput
            title="Item Note"
            name="note"
            register={register}
            errors={errors}
            isRequired={false}
          />
          <ImageInput
            label="Item Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </div>
        <SubmitButton isLoading={loading} title="Item" />
      </form>
    </div>
  );
};

export default NewItem;
