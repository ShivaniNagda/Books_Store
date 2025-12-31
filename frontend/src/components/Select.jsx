import React from "react";

const Select = ({ icon: Icon, roles = [], ...props }) => {
  console.log("Select component roles:", props);
  return (
    <div className="relative mb-6">
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-slate-500" />
      </div>

      {/* Select */}
      <select
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 text-white placeholder-gray-400 transition duration-200"
      >
        <option value="" disabled>Select an option</option>

        {roles.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
