import Joi from "joi";
import { FormData, Steps } from "@/types/register.type";

export const registerValidation = (data: FormData) => {
  const schema = Joi.object({
    avatar: Joi.string().optional(),
    fullName: Joi.string().required().messages({
      "string.empty": "Full name is required",
    }),
    nickname: Joi.string().required().messages({
      "string.empty": "Nickname is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
    age: Joi.number().min(16).required().messages({
      "number.min": "You must be at least 16 years old",
      "number.base": "Age must be a number",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
    }),
    mainGame: Joi.object({
      game: Joi.string().required().messages({
        "string.empty": "Main game name is required",
      }),
      playerId: Joi.string().required().messages({
        "string.empty": "Player ID is required",
      }),
    }).required(),
    games: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          playerId: Joi.string().required(),
        }),
      )
      .optional(),
  });
  return schema.validate(data, { abortEarly: false });
};

export const validateStep = (
  stepName: Steps,
  formData: Partial<FormData>,
): boolean => {
  let dataToValidate: Partial<FormData> = {};

  if (stepName === "one") {
    dataToValidate = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };
  } else if (stepName === "two") {
    dataToValidate = {
      nickname: formData.nickname,
      age: formData.age,
      country: formData.country,
    };
  } else if (stepName === "three") {
    dataToValidate = {
      mainGame: formData.mainGame,
    };
  }

  const schema = Joi.object(
    Object.keys(dataToValidate).reduce((acc, key) => {
      if (key === "mainGame") {
        acc[key] = Joi.object({
          game: Joi.string().required(),
          playerId: Joi.string().required(),
        }).required();
      } else if (key === "age") {
        acc[key] = Joi.number().min(16).required();
      } else if (key === "email") {
        acc[key] = Joi.string().email().required();
      } else if (key === "password") {
        acc[key] = Joi.string().min(6).required();
      } else {
        acc[key] = Joi.string().required();
      }
      return acc;
    }, {} as any),
  );

  const result = schema.validate(dataToValidate, { abortEarly: false });
  return !result.error;
};
