
import { en } from "@/dictionaries/en";
import { ar } from "@/dictionaries/ar";

const dictionaries = {
  en: () => Promise.resolve(en),
  ar: () => Promise.resolve(ar),
};

export const getDictionary = async (locale: "en" | "ar") => {
  return dictionaries[locale]();
};
