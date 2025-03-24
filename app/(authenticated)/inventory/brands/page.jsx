import { React } from "react";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import DataTable from "@/components/main/home/dashboard/DataTable";
import { GET_BRANDS_URL, BRAND_INFO_BASE_URL, BRAND_SERVER_BASE_URL, BRAND_CLIENT_BASE_URL } from "@/lib/constants";
import { getData } from "@/lib/getDataRequest";

const Brands = async () => {  
  const brands = await getData(GET_BRANDS_URL);
  const brandKeys = ["name"];

  return (
    <div>
      <FixedHeader
        title="All Brands"
        newLink={"/inventory/brands/new"}
      />
      <div className="m-10">
        <DataTable dataKeys={brandKeys} data={brands} infoLink={BRAND_CLIENT_BASE_URL} deleteLink={BRAND_SERVER_BASE_URL} resourceName='Brand'/>
      </div>
    </div>
  );
};

export default Brands;
