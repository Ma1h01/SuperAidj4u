import { React } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import CreateItemForm from "@/components/main/home/dashboard/CreateItemForm";
import { getData } from "@/lib/getDataRequest";
import {
  NEW_ITEM_URL,
  GET_BRANDS_URL,
  GET_CATEGORIES_URL,
  GET_ITEMS_URL,
  GET_SUPPLIERS_URL,
  GET_UNITS_URL,
  GET_WAREHOUSES_URL,
} from "@/lib/constants";

const NewItem = async () => {
  // Sequential fetch due to 'await' -> waterfall
  // const categories = await getData(GET_CATEGORIES_URL);
  // const units = await getData(GET_UNITS_URL);
  // const brands = await getData(GET_BRANDS_URL);
  // const warehouses = await getData(GET_WAREHOUSES_URL);
  // const suppliers = await getData(GET_SUPPLIERS_URL);

  // parallel fetching -> faster
  const categoriesData = getData(GET_CATEGORIES_URL);
  const unitsData = getData(GET_UNITS_URL);
  const brandsData = getData(GET_BRANDS_URL);
  const warehousesData = getData(GET_WAREHOUSES_URL);
  const suppliersData = getData(GET_SUPPLIERS_URL);
  const [categories, units, brands, warehouses, suppliers] = await Promise.all([
    categoriesData,
    unitsData,
    brandsData,
    warehousesData,
    suppliersData,
  ]);

  return (
    <div>
      {/* Header */}
      <FormHeader title="New Item" href="/inventory/items" />
      {/* Form */}
      <CreateItemForm
        categories={categories}
        units={units}
        brands={brands}
        warehouses={warehouses}
        suppliers={suppliers}
      />
    </div>
  );
};

export default NewItem;
