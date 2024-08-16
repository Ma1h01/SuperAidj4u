import React from 'react'
import FixedHeader from '@/components/main/inventory/FixedHeader'
import DataTable from '@/components/main/home/dashboard/DataTable';
import { GET_CATEGORIES_URL, CATEGORY_CLIENT_BASE_URL, CATEGORY_SERVER_BASE_URL } from '@/lib/constants';
import { getData } from '@/lib/getDataRequest';
const Categories = async () => {
  const categories = await getData(GET_CATEGORIES_URL);
  const categoryKeys = [
    "name",
    "description",
  ]
  
  return (
    <div>
      <FixedHeader
        title="All Categories"
        newLink={"/inventory/categories/new"}
      />
      <div className='m-10'>
        <DataTable dataKeys={categoryKeys} data={categories} infoLink={CATEGORY_CLIENT_BASE_URL} deleteLink={CATEGORY_SERVER_BASE_URL} resourceName='Category'/>
      </div>
    </div>
  );
}

export default Categories