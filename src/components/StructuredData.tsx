"use client";

import React from "react";
import Head from "next/head";

interface EventData {
  type: "event";
  name: string;
  startDate: string;
  endDate?: string;
  locationName: string;
  locationAddress: string;
  image: string;
  description: string;
  url: string;
  price?: number;
  currency?: string;
}

interface TourData {
  type: "tour";
  name: string;
  description: string;
  bookingPage: string;
  image: string;
  price: number;
  currency: string;
}

interface ServiceData {
  type: "service";
  serviceType: string;
  description: string;
  price: number;
  url: string;
  image: string;
}

type StructuredDataProps = EventData | TourData | ServiceData;

const StructuredData: React.FC<StructuredDataProps> = (props) => {
  let jsonLd: any = {};

  if (props.type === "event") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: props.name,
      startDate: props.startDate,
      endDate: props.endDate,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: props.locationName,
        address: props.locationAddress,
      },
      image: [props.image],
      description: props.description,
      offers: {
        "@type": "Offer",
        url: props.url,
        price: props.price ?? "0",
        priceCurrency: props.currency ?? "USD",
        availability: "https://schema.org/InStock",
        validFrom: props.startDate,
      },
      organizer: {
        "@type": "Organization",
        name: "Go To Samarkand",
        url: "https://gotosamarkand.com",
      },
    };
  }

  if (props.type === "tour") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: props.name,
      description: props.description,
      tourBookingPage: props.bookingPage,
      offers: {
        "@type": "Offer",
        url: props.bookingPage,
        price: props.price,
        priceCurrency: props.currency,
        availability: "https://schema.org/InStock",
      },
      provider: {
        "@type": "TouristAgency",
        name: "Go To Samarkand",
        url: "https://gotosamarkand.com",
      },
      image: [props.image],
    };
  }

  if (props.type === "service") {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: props.serviceType,
      provider: {
        "@type": "Organization",
        name: "Go To Samarkand",
        url: "https://gotosamarkand.com",
      },
      areaServed: {
        "@type": "City",
        name: "Samarkand",
      },
      description: props.description,
      url: props.url,
      image: [props.image],
    };
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>
  );
};

export default StructuredData;
