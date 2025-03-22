import { ADD_ADJUSTMENT_CLIENT_BASE_URL, ADD_ADJUSTMENT_SERVER_BASE_URL, GET_ITEMS_URL, WAREHOUSE_SERVER_BASE_URL } from "@/lib/constants";
import SupplierInfoForm from "@/components/main/home/dashboard/SupplierInfoForm";
import { getData } from "@/lib/getDataRequest";
import AddAdjustmentInfoForm from "@/components/main/home/dashboard/AddAdjustmentInfoForm";

const Info = async ({ params: { id } }) => {
  let addAdjustment = await getData(`${ADD_ADJUSTMENT_SERVER_BASE_URL}/${id}`);
  let items = await getData(GET_ITEMS_URL);
  let warehouses = await getData(WAREHOUSE_SERVER_BASE_URL);
  [addAdjustment, items, warehouses] = await Promise.all([addAdjustment, items, warehouses]);

  return (
    <AddAdjustmentInfoForm
      addAdjustment={addAdjustment}
      items={items}
      warehouses={warehouses}
    />
  );
};

export default Info;
