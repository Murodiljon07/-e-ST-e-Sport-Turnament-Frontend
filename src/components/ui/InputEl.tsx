import React from "react";

const inputStyles = {
  main: "w-full px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all",
  second:
    "w-full px-4 py-2 rounded-xl bg-transparent border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-600 transition-all",
};

type InputProps = {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: "main" | "second";
  name: string;
};

function Input({
  className = "",
  type = "text",
  placeholder,
  value,
  onChange,
  inputType = "main",
  name,
}: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${inputStyles[inputType]} ${className}`}
    />
  );
}

export default Input;
