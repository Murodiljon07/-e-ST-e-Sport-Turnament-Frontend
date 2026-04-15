"use client";

import { useState } from "react";
import { LoginFormData, LoginErrors } from "@/types/login.type";
import { loginValidation } from "@/validation/login.validation";

const initialFormData: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [form, setForm] = useState<LoginFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (onSuccess?: () => void, onError?: () => void) => {
    const result = loginValidation(form);

    if (result.error) {
      const newErrors: LoginErrors = {};
      result.error.details.forEach((detail) => {
        const path = detail.path[0] as keyof LoginErrors;
        newErrors[path] = detail.message;
      });
      setErrors(newErrors);
      onError?.();
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("LOGIN DATA:", {
        email: form.email,
        password: form.password,
        rememberMe: form.rememberMe,
      });

      // Store token or user data here
      if (form.rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      onSuccess?.();
    } catch (error) {
      setErrors({ general: "Invalid email or password" });
      onError?.();
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on mount
  const loadRememberedEmail = () => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setForm((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  };

  return {
    isLoading,
    errors,
    form,
    showPassword,
    handleChange,
    handleSubmit,
    loadRememberedEmail,
    setShowPassword,
  };
};
