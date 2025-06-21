"use client";
import { AboutUs, Gallery, Head, TopTitle, Tours } from "@/components";
import { useTranslations } from "next-intl";
import React from "react";

const HomePage = () => {
  const tour = useTranslations("tour");
  const servic = useTranslations("servic");
  const gallery = useTranslations("gallery");

  return (
    <>
      <Head />
      <AboutUs />
      <TopTitle
        id="tours"
        title={tour("title")}
        description={tour("description")}
      />
      <Tours />
      <TopTitle
        id="gallery"
        title={gallery("title")}
        description={gallery("description")}
      />
      <Gallery />
      <TopTitle
        id="services"
        title={servic("title")}
        description={servic("description")}
      />
      <Tours />
    </>
  );
};

export default HomePage;
