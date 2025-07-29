"use client";
import { BookEvent } from "@/components";
import Head from "next/head";
import React from "react";

const EventPage = () => {
  return (
    <div className="mt-18">
      <Head>
        <title>Upcoming Events in Samarkand | Go to Samarkand</title>
        <link rel="canonical" href="https://gotosamarkand.com/" />
        <meta
          name="description"
          content="Check out upcoming festivals, cultural shows, and local events happening in Samarkand."
        />

        <meta
          property="og:title"
          content="Upcoming Events in Samarkand | Go to Samarkand"
        />
        <meta
          property="og:description"
          content="Don't miss the best events and local festivals in Samarkand."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gotosamarkand.com/events" />
        <meta
          property="og:image"
          content="https://gotosamarkand.com/og-events.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Upcoming Events in Samarkand | Go to Samarkand"
        />
        <meta
          name="twitter:description"
          content="Explore Samarkand's cultural events and festivals."
        />
        <meta
          name="twitter:image"
          content="https://gotosamarkand.com/og-events.jpg"
        />
      </Head>

      <BookEvent />
    </div>
  );
};

export default EventPage;
