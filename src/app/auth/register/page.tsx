"use client";

import React from "react";
import { RegisterForm } from "@/components/forms/register/RegisterForm";
import { RegisterBackground } from "@/components/pages/register/RegisterBackground";

export default function RegisterPage() {
  const handleSuccess = () => {
    console.log("Registration successful!");
    // Redirect or show success message
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <RegisterBackground />
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
}
