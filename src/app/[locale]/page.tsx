"use client";
import {
  AboutUs,
  Events,
  Gallery,
  Heading,
  Services,
  TopTitle,
  Tours,
} from "@/components";
import { useTranslations } from "next-intl";
import Head from "next/head";
import React from "react";

const HomePage = () => {
  const tour = useTranslations("tour");
  const servic = useTranslations("servic");
  const gallery = useTranslations("gallery");
  const event = useTranslations("event");

  return (
    <>
      <Head>
        <link rel="canonical" href="https://gotosamarkand.com/" />
        <meta
          name="description"
          content="You can use our services through this site"
        />
        <meta
          name="keywords"
          content="samarkandgoto, go travel samarqand, gotosamarqand, go to samarqand hello samarkand, salom samarqand, samarqandga xush kelibsiz, sam, sam go to, go, to, samarkand, go to samarkand, gotosamarkand, traverty, travel, samarkand registan, registan, registon, samarqand, tours, galleries, samarkand photos, sam photos, services, events, samarkand events, go samarkand, travelsy samarkand, Book the best tours in Samarkand. Discover historical places, culture, and local life with our guided tours."
        />
        <meta property="og:title" content="Samarkand | Go to Samarkand" />
        <meta
          property="og:description"
          content="You can use our services through this site"
        />
        <meta
          property="og:image"
          content="https://gotosamarkand.com/logo.svg"
        />
        <meta property="og:url" content="https://gotosamarkand.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uz_UZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Samarkand | Go to Samarkand" />
        <meta
          name="twitter:description"
          content="You can use our services through this site"
        />
        <meta
          name="twitter:image"
          content="https://gotosamarkand.com/favicon.ico"
        />
        {/* <meta name="twitter:site" content="@sizning_twitteringiz" /> */}
        {/* <meta name="twitter:creator" content="@sizning_twitteringiz" /> */}
        <meta name="pinterest-rich-pin" content="true" />
        {/* <meta name="yandex-verification" content="Sizning_yandex_kodingiz" /> */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head>
      <Heading />
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
