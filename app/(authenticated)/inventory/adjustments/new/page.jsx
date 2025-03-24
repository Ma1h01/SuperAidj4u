import { React } from "react";
import { getData } from "@/lib/getDataRequest";
import { GET_ITEMS_URL, GET_WAREHOUSES_URL } from "@/lib/constants";
import CreateAdjustmentForm from "@/components/main/home/dashboard/CreateAdjustmentForm";

const NewAdjustment = async () => {
  const itemsData = getData(GET_ITEMS_URL);
  const warehousesData = getData(GET_WAREHOUSES_URL);  
  const [items, warehouses] = await Promise.all([itemsData, warehousesData]);
  return (
    <CreateAdjustmentForm items={items} warehouses={warehouses}/>
  );
};

export default NewAdjustment;
