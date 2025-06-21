import { reg2, registan, shaxizinda, ulugbek } from "@/assets";
import { styles } from "@/styles/styles";
import { ChevronRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import Btn from "./Btn";

interface Tours {
  title: string;
  description: string;
  image: string;
  price: number;
  id: number;
  grade: number;
}

const Tours = () => {
  const t = useTranslations("tour");
  const tours = t.raw("tours") as Tours[];
  const images = [
    { img: registan },
    { img: reg2 },
    { img: ulugbek },
    { img: shaxizinda },
  ];

  return (
    <div className={`${styles.paddingCont} lg:py-10 sm:py-6 py-4`}>
      <p className="text-center text-sm md:text-md xl:text-lg lg:m-10 m-6">
        {t("descriptionAll")}
      </p>
      <div className={`${styles.flexBetween} !items-start gap-4`}>
        {tours.map((item) => (
          <div
            key={item.id}
            className={`w-full lg:w-[23%] md:w-[30%] shadow-md rounded-xl cursor-pointer hover:scale-105 transition-all duration-200 active:scale-100`}
          >
            <Image
              key={item.id}
              src={images[item.id - 1].img}
              alt="Img"
              className="w-full h-52 object-cover rounded-t-xl"
            />
            <div className="p-3">
              <div className={`${styles.flex}`}>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <h3 className="text-lg sm:text-xl xl:text-2xl font-bold my-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-md xl:text-lg">
                {item.description.slice(0, 50)}. . .
              </p>
              <div className={`${styles.flexBetween} mt-2`}>
                <strong>
                  <span className="text-green-600">USD</span> {item.price}$
                </strong>
                <button className={`${styles.flex} gap-2 text-blue-600`}>
                  <span>More</span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
