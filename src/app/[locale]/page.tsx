"use client";
import {
  AboutUs,
  Events,
  Gallery,
  Head,
  Services,
  TopTitle,
  Tours,
} from "@/components";
import { useTranslations } from "next-intl";
import React from "react";

const HomePage = () => {
  const tour = useTranslations("tour");
  const servic = useTranslations("servic");
  const gallery = useTranslations("gallery");
  const event = useTranslations("event");

  return (
    <>
      <Head />
      <AboutUs />
      <TopTitle
        newClass="bg-green-300/40"
        id="tours"
        title={tour("title")}
        description={tour("description")}
      />
      <Tours />
      <TopTitle
        newClass="bg-gray-300/40"
        id="services"
        title={servic("title")}
        description={servic("description")}
      />
      <Services />
      <TopTitle
        newClass="bg-blue-300/40"
        id="events"
        title={event("title")}
        description={event("description")}
      />
      <Events />
      <TopTitle
        newClass="bg-yellow-300/40"
        id="gallery"
        title={gallery("title")}
        description={gallery("description")}
      />
      <Gallery />
    </>
  );
};

export default HomePage;
