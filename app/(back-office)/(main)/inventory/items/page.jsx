import { GET_ITEMS_URL, GET_SUPPLIERS_URL } from "@/lib/constants";
import React from "react";
import { getData } from "@/lib/getDataRequest";
import DataTable from "@/components/main/home/dashboard/DataTable";
import FixedHeader from "@/components/main/inventory/FixedHeader";
const Items = async () => {
  const items = await getData(GET_ITEMS_URL);
  items.map((item) => {
    return {
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      buyingPrice: item.buyingPrice,
      sellingPrice: item.sellingPrice,
    };
  });
  const itemKeys = ["name", "sku", "quantity", "sellingPrice", "buyingPrice"];

  return (
    <div>
      <FixedHeader title="All Items" newLink={"/inventory/items/new"} />
      <div className="m-10">
        <DataTable dataKeys={itemKeys} data={items} />
      </div>
    </div>
  );
};

export default Items;
