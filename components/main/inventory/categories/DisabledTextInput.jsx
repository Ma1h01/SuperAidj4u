import React from 'react'

const DisabledTextInput = ({ className = "sm:col-span-2", title, text}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2 ">
        {title}
      </label>      
      <input
        type="text"
        className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={text}
        disabled
      ></input>
    </div>
  );
};

export default DisabledTextInput