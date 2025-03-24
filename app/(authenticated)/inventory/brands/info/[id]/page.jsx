import { GET_BRAND_INFO_BASE_URL } from "@/lib/constants";
import BrandInfoForm from "@/components/main/home/dashboard/BrandInfoForm";
import { getData } from "@/lib/getDataRequest";

const Info =  async ({ params: { id } }) => {
    const brand = await getData(`${GET_BRAND_INFO_BASE_URL}/${id}`)    
  return (
    <BrandInfoForm brand={brand} />
  );
};

export default Info;
