import React from "react";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import DataTable from "@/components/main/home/dashboard/DataTable";
import { UNIT_CLIENT_BASE_URL, UNIT_SERVER_BASE_URL } from "@/lib/constants";
import { getData } from "@/lib/getDataRequest";

const Units = async () => {
  const units = await getData(UNIT_SERVER_BASE_URL);
  const unitKeys = ["name", "abbreviation"];

  return (
    <div>
      <FixedHeader
        title="All Units"
        newLink={"/inventory/units/new"}
      />
      <div className="m-10">
        <DataTable dataKeys={unitKeys} data={units} resourceName='Unit' infoLink={UNIT_CLIENT_BASE_URL} deleteLink={UNIT_SERVER_BASE_URL}/>
      </div>
    </div>
  );
};

export default Units;
