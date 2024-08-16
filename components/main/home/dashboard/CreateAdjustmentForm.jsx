"use client";
import { React, useState } from "react";
import FormHeader from "@/components/main/inventory/categories/FormHeader";
import { PackagePlus, PackageX } from "lucide-react";
import TransferInventoryForm from "@/components/main/inventory/adjustments/TransferInventoryForm";
import AddInventoryForm from "@/components/main/inventory/adjustments/AddInventoryForm";
import { getWarehouses } from "@/lib/getDataRequest";

const CreateAdjustmentForm = ({items, warehouses}) => {
  const [activeForm, setActiveForm] = useState("add");
  const tabs = [
    {
      title: "Add Stock",
      icon: PackagePlus,
      form: "add",
    },
    {
      title: "Transfer Stock",
      icon: PackageX,
      form: "transfer",
    },
  ];
  const ACTIVE_TAB_STYLE =
    "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group";
  const INACTIVE_TAB_STYLE =
    "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300";
  return (
    <div>
      {/* Header */}
      <FormHeader title="New Adjustment" href="/inventory/adjustments" />
      {/* Tabs */}
      <div
        className="border-b border-gray-200 dark:border-gray-700 w-full max-w-4xl px-4 py-2 bg-white border shadow rounded
                 mx-auto my-4"
      >
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <li class="me-2" key={index}>
                <button
                  onClick={() => setActiveForm(tab.form)}
                  className={`${activeForm === tab.form ? ACTIVE_TAB_STYLE : INACTIVE_TAB_STYLE}`}
                >
                  <Icon className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
                  {tab.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Form */}
      {activeForm === "add" ? (
        <AddInventoryForm items={items} warehouses={warehouses} />
      ) : (
        <TransferInventoryForm items={items} warehouses={warehouses}/>
      )}
    </div>
  );
};

export default CreateAdjustmentForm;
