"use client";

import { useState } from "react";
import { FormData, Errors, Steps, TempGame } from "@/types/register.type";
import {
  registerValidation,
  validateStep,
} from "@/validation/register.validation";

const initialFormData: FormData = {
  avatar: "",
  fullName: "",
  nickname: "",
  email: "",
  password: "",
  age: 16,
  country: "",
  mainGame: {
    game: "",
    playerId: "",
  },
  games: [],
};

export const useRegisterForm = () => {
  const [step, setStep] = useState<Steps>("one");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<FormData>(initialFormData);
  const [tempGame, setTempGame] = useState<TempGame>({
    name: "",
    playerId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof FormData] as any),
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addGame = () => {
    if (tempGame.name && tempGame.playerId) {
      setForm((prev) => ({
        ...prev,
        games: [...prev.games, { ...tempGame }],
      }));
      setTempGame({ name: "", playerId: "" });
    }
  };

  const removeGame = (index: number) => {
    setForm((prev) => ({
      ...prev,
      games: prev.games.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (step === "one" && validateStep("one", form)) {
      setStep("two");
      setErrors({});
    } else if (step === "two" && validateStep("two", form)) {
      setStep("three");
      setErrors({});
    } else {
      // Re-validate to show errors
      if (step === "one") validateStep("one", form);
      if (step === "two") validateStep("two", form);
    }
  };

  const handleBack = () => {
    if (step === "two") {
      setStep("one");
    } else if (step === "three") {
      setStep("two");
    }
  };

  const handleSubmit = async (onSuccess?: () => void) => {
    const result = registerValidation(form);

    if (result.error) {
      const newErrors: Errors = {};
      result.error.details.forEach((detail) => {
        const path = detail.path.join(".");
        newErrors[path] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("REGISTER DATA:", form);
    setIsLoading(false);
    onSuccess?.();
  };

  return {
    step,
    isLoading,
    errors,
    form,
    tempGame,
    handleChange,
    addGame,
    removeGame,
    handleNext,
    handleBack,
    handleSubmit,
    setTempGame,
  };
};
