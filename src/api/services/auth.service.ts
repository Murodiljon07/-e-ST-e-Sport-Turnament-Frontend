import { api } from "../axios";

import { LoginType } from "@/types/auth.type";

export const authServices = {
  loginUser: async (data: { email: string; password: string }) => {
    const res = await api.post("/auth/login", data);
  },
};
