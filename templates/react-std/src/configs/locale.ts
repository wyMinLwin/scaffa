import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import mm from "@/locales/mm.json";

i18next.use(initReactI18next).init({
	lng: "en",
	fallbackLng: "en",
	debug: true,
	interpolation: {
		escapeValue: false,
	},
	resources: {
		en: { translation: en },
		mm: { translation: mm },
	},
});
