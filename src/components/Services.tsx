"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "@/styles/styles";
import { CircleArrowRight, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import StructuredData from "./StructuredData";
import { ServiceService } from "@/services/services.service";
import PaginationData from "./PaginationData";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
  uz: string;
}

interface Servic {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  price: number;
  averageRating: number;
}

const Services = () => {
  const router = useRouter();
  const [services, setServices] = useState<Servic[]>([]);
  const [loading, setLoading] = useState(true);
  const lang = useLocale();

  return (
    <div className={`${styles.paddingCont} lg:py-10 sm:py-6 py-4`}>
      <div
        className={`${styles.flexBetween} ${loading && "!justify-around"} ${
          services.length < 4 && "justify-start"
        } flex-wrap gap-5`}
      >
        {loading ? (
          [1, 2, 3, 4].map((_, x) => (
            <p key={x} className="card_loader p-28"></p>
          ))
        ) : services.length === 0 ? (
          <h2 className="text-2xl text-gray-400 text-center w-full">
            No information found
          </h2>
        ) : (
          services.map((item) => (
            <div
              key={item._id}
              onClick={() => router.push(`/service/${item._id}`)}
              className="w-full cursor-pointer hover:scale-105 active:scale-100 lg:w-[23%] md:w-[30%] shadow-md rounded-xl transition-all duration-200 bg-white"
            >
              <StructuredData
                type="tour"
                name={item?.title[lang as keyof LocalizedText]}
                description={item?.description[lang as keyof LocalizedText]}
                bookingPage={`https://gotosamarkand.com/tours/${item._id}`}
                image={`https://gotosamarkand.onrender.com/static/${item.image}`}
                price={item.price}
                currency="USD"
              />
              <img
                src={`https://gotosamarkand.onrender.com/static/${item.image}`}
                alt="Service Image"
                className="w-full h-52 object-cover rounded-t-xl"
              />
              <div className="p-3 text-left">
                <div className={`${styles.flex} gap-2 mb-2`}>
                  <Star className="text-yellow-500" />
                  <span className="font-semibold">{item.averageRating}</span>
                </div>
                <h3 className="text-lg sm:text-xl xl:text-2xl font-bold my-2">
                  {item?.title[lang as keyof LocalizedText].slice(0, 18)}. . .
                </h3>
                <p className="text-sm sm:text-md xl:text-lg mb-2 text-gray-600">
                  {item?.description[lang as keyof LocalizedText].slice(0, 50)}.
                  . .
                </p>
                <div className={`${styles.flexBetween}`}>
                  <strong className="text-green-600">USD {item.price}$</strong>
                  <CircleArrowRight className="text-green-500" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PaginationData
        setLoading={setLoading}
        category="servic"
        onDataChange={(data) => setServices(data)}
      />
    </div>
  );
};

export default Services;
