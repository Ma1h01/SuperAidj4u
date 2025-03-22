import React from "react";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import DataTable from "@/components/main/home/dashboard/DataTable";
import {
  ADD_ADJUSTMENT_CLIENT_BASE_URL,
  ADD_ADJUSTMENT_SERVER_BASE_URL,
  TRANSFER_ADJUSTMENT_CLIENT_BASE_URL,
  TRANSFER_ADJUSTMENT_SERVER_BASE_URL,
} from "@/lib/constants";
import { getData } from "@/lib/getDataRequest";

const Adjustments = async () => {
  const addAdjustmentData = await getData(ADD_ADJUSTMENT_SERVER_BASE_URL);
  const transferAdjustmentData = await getData(
    TRANSFER_ADJUSTMENT_SERVER_BASE_URL,
  );
  let [addAdjustments, transferAdjustments] = await Promise.all([
    addAdjustmentData,
    transferAdjustmentData,
  ]);

  const addAdjustmentKeys = ["referenceNumber", "addStockQty"];
  const transferAdjustmentKeys = ["referenceNumber", "transferStockQty"];

  return (
    <div>
      <FixedHeader
        title="All Adjustments"
        newLink={"/inventory/adjustments/new"}
      />
      <div className="m-10">
        <h2 className="py-2 text-lg font-semibold">Add Adjustments</h2>
        <DataTable
          dataKeys={addAdjustmentKeys}
          data={addAdjustments}
          infoLink={ADD_ADJUSTMENT_CLIENT_BASE_URL}
          deleteLink={ADD_ADJUSTMENT_SERVER_BASE_URL}
          resourceName="Add Adjustment"
        />
      </div>
      <div className="m-10">
        <h2 className="py-2 text-lg font-semibold">Transfer Adjustments</h2>
        <DataTable
          dataKeys={transferAdjustmentKeys}
          data={transferAdjustments}
          infoLink={TRANSFER_ADJUSTMENT_CLIENT_BASE_URL}
          deleteLink={TRANSFER_ADJUSTMENT_SERVER_BASE_URL}
          resourceName='Transfer Adjustment'
        />
      </div>
    </div>
  );
};

export default Adjustments;
