// api/services/auth.service.ts
import { api } from "../axios";

export const authServices = {
  registerUser: async (data: any) => {
    // XATO: { data } emas, to'g'ridan-to'g'ri data yuborish kerak
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
