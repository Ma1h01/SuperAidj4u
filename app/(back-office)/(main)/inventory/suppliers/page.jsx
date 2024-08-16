import { GET_SUPPLIERS_URL } from '@/lib/constants';
import React from 'react'
import { getData } from '@/lib/getDataRequest';
import DataTable from '@/components/main/home/dashboard/DataTable';
import FixedHeader from '@/components/main/inventory/FixedHeader';
const Suppliers = async () => {
  const suppliers = await getData(GET_SUPPLIERS_URL);
  suppliers.map((supplier) => {
    return {
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,
    };
  });
  const supplierKeys = ["name", "phone", "email"];

  return (
    <div>
      <FixedHeader title="All Suppliers" newLink={"/inventory/suppliers/new"} />
      <div className="m-10">
        <DataTable dataKeys={supplierKeys} data={suppliers} />
      </div>
    </div>
  );
};

export default Suppliers