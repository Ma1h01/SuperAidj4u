import React from "react";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import DataTable from "@/components/main/home/dashboard/DataTable";
import { GET_ADD_ADJUSTMENTS_URL, GET_TRANSFER_ADJUSTMENTS_URL } from "@/lib/constants";
import { getData } from "@/lib/getDataRequest";

const Adjustments = async () => {
  const addAdjustmentData = await getData(GET_ADD_ADJUSTMENTS_URL);
  const transferAdjustmentData = await getData(GET_TRANSFER_ADJUSTMENTS_URL);
  let [addAdjustments, transferAdjustments] = await Promise.all([addAdjustmentData, transferAdjustmentData]);
  addAdjustments = addAdjustments.map((adjustment) => {
    return {
      referenceNumber: adjustment.referenceNumber,
      addStockQty: adjustment.addStockQty,
    };
  });
  transferAdjustments = transferAdjustments.map((adjustment) => {
    return {
      referenceNumber: adjustment.referenceNumber,
      transferStockQty: adjustment.transferStockQty,
    }});
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
        <DataTable dataKeys={addAdjustmentKeys} data={addAdjustments} />
      </div>
      <div className="m-10">
        <h2 className="py-2 text-lg font-semibold">Transfer Adjustments</h2>
        <DataTable
          dataKeys={transferAdjustmentKeys}
          data={transferAdjustments}
        />
      </div>
    </div>
  );
};

export default Adjustments;
