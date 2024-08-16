import { CATEGORY_SERVER_BASE_URL } from "@/lib/constants";
import CategoryInfoForm from "@/components/main/home/dashboard/CategoryInfoForm";
import { getData } from "@/lib/getDataRequest";

const Info = async ({ params: { id } }) => {
  const category = await getData(`${CATEGORY_SERVER_BASE_URL}/${id}`);
  return <CategoryInfoForm category={category} />;
};

export default Info;
