import {
  GET_ITEMS_URL,
  WAREHOUSE_SERVER_BASE_URL,
  TRANSFER_ADJUSTMENT_SERVER_BASE_URL,
} from "@/lib/constants";
import { getData } from "@/lib/getDataRequest";
import TransferAdjustmentInfoForm from "@/components/main/home/dashboard/TransferAdjustmentInfoForm";

const Info = async ({ params: { id } }) => {
  let transferAdjustment = await getData(
    `${TRANSFER_ADJUSTMENT_SERVER_BASE_URL}/${id}`,
  );
  let items = await getData(GET_ITEMS_URL);
  let warehouses = await getData(WAREHOUSE_SERVER_BASE_URL);
  [transferAdjustment, items, warehouses] = await Promise.all([
    transferAdjustment,
    items,
    warehouses,
  ]);

  return (
    <TransferAdjustmentInfoForm
      transferAdjustment={transferAdjustment}
      items={items}
      warehouses={warehouses}
    />
  );
};

export default Info;
