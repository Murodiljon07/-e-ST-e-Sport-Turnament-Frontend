"use client";

import React from "react";
import { FormData, Errors } from "@/types/register.type";

interface Props {
  form: FormData;
  errors: Errors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const RegisterStepTwo: React.FC<Props> = ({
  form,
  errors,
  onChange,
}) => {
  const countries = [
    "Uzbekistan",
    "USA",
    "UK",
    "Germany",
    "France",
    "Japan",
    "South Korea",
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Nickname
        </label>
        <input
          type="text"
          name="nickname"
          value={form.nickname}
          onChange={onChange}
          placeholder="ProGamer123"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        {errors.nickname && (
          <p className="mt-1 text-xs text-red-400">{errors.nickname}</p>
        )}
      </div>

      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Age
        </label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={onChange}
          min="16"
          max="100"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        {errors.age && (
          <p className="mt-1 text-xs text-red-400">{errors.age}</p>
        )}
      </div>

      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Country
        </label>
        <select
          name="country"
          value={form.country}
          onChange={onChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        >
          <option value="" className="bg-slate-800">
            Select country
          </option>
          {countries.map((country) => (
            <option key={country} value={country} className="bg-slate-800">
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-xs text-red-400">{errors.country}</p>
        )}
      </div>
    </div>
  );
};
