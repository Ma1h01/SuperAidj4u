import { CATEGORY_SERVER_BASE_URL, UNIT_SERVER_BASE_URL } from "@/lib/constants";
import UnitInfoForm from "@/components/main/home/dashboard/UnitInfoForm";
import { getData } from "@/lib/getDataRequest";

const Info = async ({ params: { id } }) => {
  const unit = await getData(`${UNIT_SERVER_BASE_URL}/${id}`);
  return <UnitInfoForm unit={unit} />;
};

export default Info;
