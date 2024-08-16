import React from "react";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import DataTable from "@/components/main/home/dashboard/DataTable";
import {
  WAREHOUSE_CLIENT_BASE_URL,
  WAREHOUSE_SERVER_BASE_URL,
} from "@/lib/constants";
import { getData } from "@/lib/getDataRequest";

const Warehouses = async () => {
  const warehouses = await getData(WAREHOUSE_SERVER_BASE_URL);
  const warehouseKeys = ["name", "location", "warehouseType"];

  return (
    <div>
      <FixedHeader
        title="All Warehouses"
        newLink={"/inventory/warehouses/new"}
      />
      <div className="m-10">
        <DataTable
          dataKeys={warehouseKeys}
          data={warehouses}
          resourceName="Warehouse"
          infoLink={WAREHOUSE_CLIENT_BASE_URL}
          deleteLink={WAREHOUSE_SERVER_BASE_URL}
        />
      </div>
    </div>
  );
};

export default Warehouses;
