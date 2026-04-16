"use client";

import React, { useState } from "react";
import { authServices } from "@/api/services/auth.service";
import Input from "@/components/ui/InputEl";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handelClick() {
    console.log(email, password);

    try {
      const res = await authServices.loginUser({
        email,
        password,
      });

      console.log(res);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  }

  return (
    <div>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        inputType="second"
      />

      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        inputType="second"
      />

      <button onClick={handelClick}>enter</button>
    </div>
  );
}

export default LoginPage;
