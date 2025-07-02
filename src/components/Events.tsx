"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "@/styles/styles";
import { CircleArrowRight, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
uz:string;
}

interface EventType {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  price: number;
  startDate: string;
  endDate: string;
}

const Events = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const lang = useLocale(); // "en", "ru", "ja"

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://gotosamarkand.onrender.com/api/event/all-event"
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className={`${styles.paddingCont} lg:py-10 sm:py-6 py-4`}>
      <div
        className={`${styles.flexBetween} ${loading && "!justify-around"} ${
          events.length < 4 && "justify-start"
        } flex-wrap gap-5`}
      >
        {loading
          ? [1, 2, 3, 4].map((_, x) => (
              <p key={x} className="card_loader p-28"></p>
            ))
          : events.map((item) => (
              <div
                key={item._id}
                onClick={() => router.push(`/events/${item._id}`)}
                className="w-full cursor-pointer hover:scale-105 active:scale-100 lg:w-[23%] md:w-[30%] shadow-md rounded-xl transition-all duration-200 bg-white"
              >
                <img
                  src={`https://gotosamarkand.onrender.com/static/${item.image}`}
                  alt="Event Image"
                  className="w-full h-52 object-cover rounded-t-xl"
                />
                <div className="p-3 text-left">
                  <div className={`${styles.flex} mb-2`}>
                    <Star className="text-yellow-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl xl:text-2xl font-bold my-2">
                    {item?.title[lang as keyof LocalizedText].slice(0, 18)}. . .
                  </h3>
                  <p className="text-sm sm:text-md xl:text-lg mb-2 text-gray-600">
                    {item?.description[lang as keyof LocalizedText].slice(0, 50)}
                    . . .
                  </p>
                  <p className="text-sm sm:text-md xl:text-lg mb-2">
                    <strong>Start date:</strong>{" "}
                    {new Date(item.startDate).toLocaleTimeString("uz-UZ", {
                      timeZone: "Asia/Samarkand",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-sm sm:text-md xl:text-lg mb-2">
                    <strong>End date:</strong>{" "}
                    {new Date(item.endDate).toLocaleTimeString("uz-UZ", {
                      timeZone: "Asia/Samarkand",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className={`${styles.flexBetween}`}>
                    <strong className="text-green-600">
                      USD {item.price}$
                    </strong>
                    <CircleArrowRight className="text-green-500" />
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Events;
