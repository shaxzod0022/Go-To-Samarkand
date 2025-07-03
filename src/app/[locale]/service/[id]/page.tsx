"use client";
import { BookServic } from "@/components";
import Head from "next/head";
import React from "react";

const ServicePAge = () => {
  return (
    <div className="mt-18">
      <Head>
        <title>Our Services | Go to Samarkand</title>
        <link rel="canonical" href="https://gotosamarkand.com" />
        <meta
          name="description"
          content="Discover professional travel services in Samarkand. Transportation, guides, and more for your perfect trip."
        />

        <meta property="og:title" content="Our Services | Go to Samarkand" />
        <meta
          property="og:description"
          content="Explore our professional travel services to make your Samarkand trip unforgettable."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gotosamarkand.com/services" />
        <meta
          property="og:image"
          content="https://gotosamarkand.com/og-services.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services | Go to Samarkand" />
        <meta
          name="twitter:description"
          content="Professional services in Samarkand for your perfect trip."
        />
        <meta
          name="twitter:image"
          content="https://gotosamarkand.com/og-services.jpg"
        />
      </Head>

      <BookServic />
    </div>
  );
};

export default ServicePAge;
