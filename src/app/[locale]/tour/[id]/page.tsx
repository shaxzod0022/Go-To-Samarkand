"use client";
import { BookTour } from "@/components";
import Head from "next/head";
import React from "react";

const TourPage = () => {
  return (
    <div className="mt-18">
      <Head>
        <title>Samarkand Tours | Go to Samarkand</title>
        <link rel="canonical" href="https://gotosamarkand.com/" />
        <meta
          name="description"
          content="Book the best tours in Samarkand. Discover historical places, culture, and local life with our guided tours."
        />

        <meta property="og:title" content="Samarkand Tours | Go to Samarkand" />
        <meta
          property="og:description"
          content="Join our exclusive tours to explore Samarkand's hidden gems and ancient history."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gotosamarkand.com/tours" />
        <meta
          property="og:image"
          content="https://gotosamarkand.com/og-tours.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Samarkand Tours | Go to Samarkand"
        />
        <meta
          name="twitter:description"
          content="Discover Samarkand with our best guided tours."
        />
        <meta
          name="twitter:image"
          content="https://gotosamarkand.com/og-tours.jpg"
        />
        <link rel="canonical" href="https://gotosamarkand.com" />
      </Head>
      <BookTour />
    </div>
  );
};

export default TourPage;
