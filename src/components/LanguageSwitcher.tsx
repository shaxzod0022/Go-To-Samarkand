"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, memo } from "react";
import { Globe } from "lucide-react";
import { styles } from "@/styles/styles";

const languageOptions = [
  { value: "en", label: "English", icons: "us" },
  { value: "ru", label: "Русский", icons: "ru" },
  { value: "ja", label: "日本語", icons: "jp" },
];

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale =
    languageOptions.find((lang) => pathname.startsWith(`/${lang.value}`))
      ?.value || "en";

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      setIsOpen(false);

      // Shunchaki "/" bo'lsa yoki `pathname` root bo‘lsa
      const segments = pathname.split("/").filter(Boolean);
      segments[0] = newLocale; // birinchi bo'lim bu til bo'ladi
      const newPath = "/" + segments.join("/");

      router.replace(newPath);
    },
    [pathname, router]
  );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-full h-full text-gray-700" />
      </button>

      {isOpen && (
        <ul
          className="absolute lg:left-1/2 left-0 p-3 -translate-x-1/2 mt-2 w-36 bg-white rounded-md shadow-lg z-10 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {languageOptions.map((lang) => (
            <li key={lang.value}>
              <button
                onClick={() => handleLanguageChange(lang.value)}
                className={`w-full ${
                  styles.flexStart
                } text-left px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-color duration-200 gap-3 ${
                  currentLocale === lang.value ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <span className={`fi fi-${lang.icons}`}></span>
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default LanguageSwitcher;
