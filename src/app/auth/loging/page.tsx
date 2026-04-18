"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";
import { LoginBackground } from "@/components/ui/bg/LoginBackground";

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = () => {
    console.log("Login successful!");
    // Redirect to dashboard or home page
    router.push("/dashboard");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <LoginBackground />
      <LoginForm 
        onSuccess={handleSuccess}
        onForgotPassword={handleForgotPassword}
        onRegister={handleRegister}
      />
    </div>
  );
}