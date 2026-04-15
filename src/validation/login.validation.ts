import Joi from "joi";
import { LoginFormData } from "@/types/login.type";

export const loginValidation = (data: LoginFormData) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
    rememberMe: Joi.boolean().optional(),
  });

  return schema.validate(data, { abortEarly: false });
};

export const validateField = (name: string, value: string) => {
  const schemas: Record<string, Joi.Schema> = {
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
  };

  const schema = schemas[name];
  if (!schema) return null;

  const result = schema.validate(value);
  return result.error ? result.error.details[0].message : null;
};
