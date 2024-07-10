"use client";
import React from "react";
const TextAreaInput = ({
  title,
  name,
  type = "text",
  isRequired = true,
  className = "sm:col-span-2",
  register,
  errors,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 mb-2 "
      >
        {title}
      </label>
      <div className="mt-2">
        <textarea
          {...register(name, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={`Type the ${title} here`}
        />
        {errors[name] && (
          <span className="text-sm text-red-600 ">{title} is required</span>
        )}
      </div>
    </div>
  );
};

export default TextAreaInput;
