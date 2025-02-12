import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  defaultValue?: string | number;
  options?: { value: string; label: string }[]; // For select inputs
}

const FormInput: React.FC<FormInputProps> = ({ label, name, type, register, defaultValue, options }) => {
  return (
    <div className="relative">
      {type === "select" ? (
        <select
          {...register(name)}
          defaultValue={defaultValue}
          className="peer w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(name)}
          type={type}
          defaultValue={defaultValue}
          placeholder=" "
          className="peer w-full bg-transparent placeholder-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
      )}
      <label
        className={`absolute cursor-text bg-white px-1 left-2.5 text-slate-400 text-sm transition-all transform origin-left 
        ${defaultValue ? "-top-2 left-2.5 text-xs text-slate-400 scale-90" : "top-2.5 text-sm text-slate-400"} 
        peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
