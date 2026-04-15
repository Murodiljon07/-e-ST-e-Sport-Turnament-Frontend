"use client";

import React from "react";
import { FormData, Errors } from "@/types/register.type";

interface Props {
  form: FormData;
  errors: Errors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegisterStepOne: React.FC<Props> = ({
  form,
  errors,
  onChange,
}) => {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={onChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="john@example.com"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password}</p>
        )}
      </div>
    </div>
  );
};
