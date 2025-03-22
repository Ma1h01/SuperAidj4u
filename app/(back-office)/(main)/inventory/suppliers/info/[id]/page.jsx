import { SUPPLIER_SERVER_BASE_URL } from "@/lib/constants";
import SupplierInfoForm from "@/components/main/home/dashboard/SupplierInfoForm";
import { getData } from "@/lib/getDataRequest";

const Info = async ({ params: { id } }) => {
  const supplier = await getData(`${SUPPLIER_SERVER_BASE_URL}/${id}`);
  return <SupplierInfoForm supplier={supplier} />;
};

export default Info;
