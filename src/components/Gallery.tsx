"use client";
import React, { useState, useEffect } from "react";
import { styles } from "@/styles/styles";
import { useTranslations } from "next-intl";
import { registan, shaxizinda, ulugbek, reg2 } from "@/assets";
import Image from "next/image";

const images = [registan, shaxizinda, ulugbek, reg2, registan, reg2];

const Gallery = () => {
  const t = useTranslations("tour");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(4);
      else if (width >= 768) setItemsPerPage(3);
      else setItemsPerPage(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(images.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const start = currentPage * itemsPerPage;
  const visibleImages = images.slice(start, start + itemsPerPage);

  return (
    <div className={`${styles.paddingCont} lg:py-10 sm:py-6 py-4`}>
      <p className="text-center text-sm md:text-md xl:text-lg lg:m-10 m-6">
        {t("descriptionAll")}
      </p>

      {/* Slider */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleImages.map((img, idx) => (
            <div
              key={idx}
              className="animate-fade-in scale-[0.95] opacity-0 animation-delay"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <Image
                src={img}
                alt={`gallery-${idx}`}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentPage === idx ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
