import { useTranslations } from "next-intl";
import React from "react";

const Head = () => {
  const t = useTranslations("head");
  return (
    <div
      className={`mt-16 head lg:py-56 sm:py-44 py-32 text-white`}
    >
      <h1
        className={`lg:text-6xl sm:text-4xl text-2xl font-bold text-center mb-3`}
      >
        {t("title")}
      </h1>
      <p className="lg:text-xl sm:text-lg text-md text-center font-semibold">
        {t("description")}
      </p>
    </div>
  );
};

export default Head;
