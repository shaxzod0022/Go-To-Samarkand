"use client";
import React, { useState, useEffect } from "react";
import { styles } from "@/styles/styles";
import axios from "axios";
import { useLocale } from "next-intl";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
}

interface GalleryItem {
  _id: string;
  image: string;
  title?: LocalizedText;
  description?: LocalizedText;
}

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [lang, setLang] = useState<keyof LocalizedText>("en");
  const locale = useLocale();

  // Tilda aniqlash
  useEffect(() => {
    if (["en", "ru", "ja"].includes(locale)) {
      setLang(locale as keyof LocalizedText);
    }
  }, []);

  // Backenddan gallery olish
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/gallery/all-gallery"
        );
        setGallery(res.data);
      } catch (err) {
        console.error("❌ Gallery fetch error:", err);
      }
    };
    fetchGallery();
  }, []);

  // Ekran o‘lchamiga qarab element soni
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

  const totalPages = Math.ceil(gallery.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const start = currentPage * itemsPerPage;
  const visibleItems = gallery.slice(start, start + itemsPerPage);

  return (
    <div className={`${styles.paddingCont} lg:py-10 sm:py-6 py-4`}>
      {/* Slider */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleItems.map((item, idx) => (
            <div
              key={item._id}
              className="animate-fade-in scale-[0.95] opacity-0 animation-delay"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <img
                src={`http://localhost:8080/static/${item.image}`}
                alt={item.title?.[lang] || "Gallery image"}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-md shadow-md"
              />
              {item.title?.[lang] && (
                <h3 className="mt-2 md:text-xl text-md font-bold text-center">
                  {item.title[lang]}
                </h3>
              )}
              {item.description?.[lang] && (
                <p className="md:text-md text-xs text-gray-600 text-center mt-1">
                  {item.description[lang]}
                </p>
              )}
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
