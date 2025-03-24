import { ITEM_CLIENT_BASE_URL, ITEM_SERVER_BASE_URL  } from "@/lib/constants";
import React from "react";
import { getData } from "@/lib/getDataRequest";
import DataTable from "@/components/main/home/dashboard/DataTable";
import FixedHeader from "@/components/main/inventory/FixedHeader";
const Items = async () => {
  const items = await getData(ITEM_SERVER_BASE_URL);
  const itemKeys = ["name", "sku", "quantity", "sellingPrice", "buyingPrice"];

  return (
    <div>
      <FixedHeader title="All Items" newLink={"/inventory/items/new"} />
      <div className="m-10">
        <DataTable dataKeys={itemKeys} data={items} resourceName='Item' infoLink={ITEM_CLIENT_BASE_URL} deleteLink={ITEM_SERVER_BASE_URL}/>
      </div>
    </div>
  );
};

export default Items;
