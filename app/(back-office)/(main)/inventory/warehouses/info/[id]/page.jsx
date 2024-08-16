import {
  WAREHOUSE_SERVER_BASE_URL,
} from "@/lib/constants";
import WarehouseInfoForm from "@/components/main/home/dashboard/WarehouseInfoForm";
import { getData } from "@/lib/getDataRequest";

const Info = async ({ params: { id } }) => {
  const warehouse = await getData(`${WAREHOUSE_SERVER_BASE_URL}/${id}`);
  return <WarehouseInfoForm warehouse={warehouse} />;
};

export default Info;
