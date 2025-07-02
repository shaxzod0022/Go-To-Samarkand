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
  uz: string;
}

interface Tour {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  price: number;
}

const Tours = () => {
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const lang = useLocale();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(
          "https://gotosamarkand.onrender.com/api/tour/all-tour"
        );
        setTours(res.data);
      } catch (err) {
        console.error("Error fetching tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className={`${styles.paddingCont} lg:py-10 sm:py-6 py-4`}>
      <div
        className={`${styles.flexBetween} ${
          loading && "!justify-around"
        } flex-wrap gap-5 ${tours.length < 4 && "justify-start"}`}
      >
        {loading
          ? [1, 2, 3, 4].map((_, x) => (
              <p key={x} className="card_loader p-28"></p>
            ))
          : tours.map((item) => (
              <div
                key={item._id}
                onClick={() => router.push(`/tour/${item._id}`)}
                className="w-full cursor-pointer hover:scale-105 active:scale-100 lg:w-[23%] md:w-[30%] shadow-md rounded-xl transition-all duration-200 bg-white"
              >
                <img
                  src={`https://gotosamarkand.onrender.com/static/${item.image}`}
                  alt="Tour Image"
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

export default Tours;
