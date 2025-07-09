"use client";
import { styles } from "@/styles/styles";
import axios from "axios";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

interface ImageItem {
  _id: string;
  image: string;
}

const AboutUs = () => {
  const t = useTranslations("about");
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<ImageItem[]>([]);

  // Rasm ma'lumotlarini backenddan olish
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          "https://gotosamarkand.onrender.com/api/gallery/all-gallery"
        );
        setImages(res.data); // To‘g‘ri formatda saqlash
      } catch (err) {
        console.error("❌ Gallery fetch error:", err);
      }
    };
    fetchGallery();
  }, []);

  // Slider avtomatik aylansin
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      id="about"
      className={`${styles.flexBetween} ${styles.paddingCont} gap-5 lg:py-10 sm:py-6 py-4 scroll-mt-16`}
    >
      {/* Chap taraf - matn */}
      <div className="md:w-[47%] w-full">
        <h2 className="font-bold lg:text-4xl sm:text-2xl text-xl mb-5">
          {t("title")}
        </h2>
        <p className="text-sm lg:text-xl sm:text-lg">{t("description")}</p>
      </div>

      {/* O'ng taraf - slider */}
      <div className="md:w-[47%] w-full relative overflow-hidden rounded-lg shadow-lg">
        <div
          key={currentIndex}
          ref={sliderRef}
          className="w-full h-64 sm:h-80 md:h-[350px] transition-opacity duration-700 ease-in-out"
        >
          {images.length > 0 && (
            <Image
              src={`https://gotosamarkand.onrender.com/static/${images[currentIndex].image}`}
              alt={`slide-${currentIndex}`}
              className="w-full h-full object-cover rounded-lg animate-fade-in"
              width={600}
              height={400}
              priority
            />
          )}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === idx ? "bg-white" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
