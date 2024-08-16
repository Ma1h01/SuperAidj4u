'use client';
import { Pencil, Trash2 } from 'lucide-react';
import { camelCaseToSpaceDelimited } from '@/lib/utils';
import Link from 'next/link';
import { React,useState } from 'react'
import { makeDeleteRequest } from '@/lib/apiRequest';

const DataTable = ({dataKeys = [], data = [], infoLink, deleteLink, resourceName}) => {  
  const [dataList, setDataList] = useState(data);  

  const onDelete = async (id) => {
    const success = await makeDeleteRequest(`${deleteLink}/${id}`, resourceName);    
    if (success) {
      setDataList(dataList.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {dataKeys.map((colHead, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {camelCaseToSpaceDelimited(colHead)}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {dataKeys.map((key, index) => (
                <td className="px-6 py-4" key={index}>
                  {item[key]}
                </td>
              ))}
              <td className="px-6 py-4 text-right flex justify-end space-x-5">
                <Link
                  href={`${infoLink}/info/${item.id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 flex items-center space-x-1"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <button
                  className="font-medium text-red-600 dark:text-blue-500 flex items-center space-x-1"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable