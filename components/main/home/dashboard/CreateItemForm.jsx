'use client';
import { React, useState } from "react";
import TextInput from "@/components/main/inventory/categories/TextInput";
import SubmitButton from "@/components/main/inventory/categories/SubmitButton";
import { useForm } from "react-hook-form";
import TextAreaInput from "@/components/main/inventory/categories/TextAreaInput";
import SelectInput from "@/components/main/inventory/warehouses/SelectInput";
import ImageInput from "@/components/main/inventory/items/ImageInput";
import { makePostRequest } from "@/lib/apiRequest";
import {
  NEW_ITEM_URL,
} from "@/lib/constants";

const NewItem = ({ categories, units, brands, warehouses, suppliers }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    makePostRequest(setLoading, reset, NEW_ITEM_URL, {...data, imageUrl}, "item");
    setImageUrl("");
  };
  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-md  shadow sm:p-6 md:p-8 
                dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            title="Item Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            name="categoryId"
            label="Select the Item Category Type"
            register={register}
            className="w-full"
            options={categories}
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
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            name="unitId"
            label="Select the Item Unit"
            register={register}
            className="w-full"
            options={units}
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
            isRequired={false}
            className="w-full"
          />
          <SelectInput
            name="brandId"
            label="Select the Item Brand"
            register={register}
            className="w-full"
            options={brands}
          />
          <SelectInput
            name="supplierId"
            label="Select the Item Supplier"
            register={register}
            className="w-full"
            options={suppliers}
          />
          <SelectInput
            name="warehouseId"
            label="Select the Item Warehouse"
            register={register}
            className="w-full"
            options={warehouses}
          />
          <TextInput
            title="Buying Price"
            name="buyingPrice"
            type="number"
            step="0.01"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            title="Selling Price"
            name="sellingPrice"
            type="number"
            step="0.01"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            title="Re-Order Point"
            name="reorderPoint"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
            isRequired={false}
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
            setIsImageSelected={setIsImageSelected}         
          />
        </div>
        <SubmitButton isLoading={loading} isImageSelected={isImageSelected} title="Item" />
      </form>
    </>
  );
};

export default NewItem;
