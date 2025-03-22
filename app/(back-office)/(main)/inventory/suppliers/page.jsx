import { SUPPLIER_CLIENT_BASE_URL, SUPPLIER_SERVER_BASE_URL } from '@/lib/constants';
import React from 'react'
import { getData } from '@/lib/getDataRequest';
import DataTable from '@/components/main/home/dashboard/DataTable';
import FixedHeader from '@/components/main/inventory/FixedHeader';
const Suppliers = async () => {
  const suppliers = await getData(SUPPLIER_SERVER_BASE_URL);
  const supplierKeys = ["name", "phone", "email"];

  return (
    <div>
      <FixedHeader title="All Suppliers" newLink={"/inventory/suppliers/new"} />
      <div className="m-10">
        <DataTable dataKeys={supplierKeys} data={suppliers} infoLink={SUPPLIER_CLIENT_BASE_URL} deleteLink={SUPPLIER_SERVER_BASE_URL} resourceName='Supplier'/>
      </div>
    </div>
  );
};

export default Suppliers