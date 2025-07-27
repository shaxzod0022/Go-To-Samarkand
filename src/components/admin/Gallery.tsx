"use client";

import { styles } from "@/styles/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Btn from "../Btn";
import AddGallery from "./AddGallery";
import UpdateGallery from "./UpdateGallery";
import DeleteGallery from "./DeleteGallery";
import { SquarePen, Trash2 } from "lucide-react";
import { GalleryService } from "@/services/gallery.service";
import PaginationData from "../PaginationData";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
  uz: string;
}

interface Gallery {
  _id: string;
  image: string;
  title?: LocalizedText;
  description?: LocalizedText;
  tourId: string;
}

const langs = [
  { id: 1, lang: "en", label: "🇺🇸 English" },
  { id: 2, lang: "ru", label: "🇷🇺 Русский" },
  { id: 3, lang: "ja", label: "🇯🇵 日本語" },
  { id: 3, lang: "uz", label: "🇺🇿 Oʻzbekcha" },
];

const Gallery = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [galleryItems, setGalleryItems] = useState<Gallery[]>([]);
  const [lang, setLang] = useState<string>("en");
  const [modal, setModal] = useState<{
    del: boolean;
    upd: boolean;
    add: boolean;
    id: string;
  }>({
    del: false,
    upd: false,
    add: false,
    id: "",
  });

  return (
    <div
      id="gallery"
      className={`${styles.paddingCont} py-10 mt-12 scroll-mt-12`}
    >
      <h2 className="mb-3 text-xl md:text-3xl xl:text-4xl font-bold">
        Gallery
      </h2>

      <div className={`${styles.flexCenter} gap-4 mb-4`}>
        {langs.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setLang(item.lang)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 
              ${
                lang === item.lang
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Btn
        onClick={() => setModal({ ...modal, add: true })}
        title="Add Gallery Image"
        newClass="mb-6"
      />

      <AddGallery
        modal={modal.add}
        onCancel={() =>
          setModal({ del: false, upd: false, add: false, id: "" })
        }
      />

      <div
        className={`${styles.flexBetween} ${
          galleryItems.length < 4 && "justify-start"
        } !items-start gap-5 flex-wrap`}
      >
        {loading ? (
          <div className={`${styles.flexAround} w-full`}>
            {[1, 2, 3, 4].map((i, x) => (
              <p key={x} className="card_loader p-28"></p>
            ))}
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="text-center w-full font-bold text-xl md:text-3xl xl:text-4xl p-10">
            No galleries found
          </div>
        ) : (
          galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="w-full lg:w-[23%] md:w-[30%] shadow-md rounded-xl transition-all duration-200 bg-white"
            >
              <img
                src={`https://gotosamarkand.onrender.com/static/${item.image}`}
                alt="Gallery Image"
                className="w-full h-52 object-cover rounded-t-xl"
              />
              <div className="p-3 text-left">
                <h3 className="text-lg sm:text-xl xl:text-2xl font-bold my-2">
                  {item.title?.[lang as keyof LocalizedText] || "No title"}
                </h3>
                <p className="text-sm sm:text-md xl:text-lg mb-2 text-gray-600">
                  {item.description?.[lang as keyof LocalizedText] ||
                    "No description"}
                </p>
              </div>
              <div className={`${styles.flexStart} gap-3 p-3`}>
                <button
                  onClick={() =>
                    setModal({ ...modal, del: !modal.del, id: item._id })
                  }
                  className="p-2 rounded-xl bg-red-600 hover:bg-red-400 active:bg-red-600 text-white"
                >
                  <Trash2 />
                </button>
                <button
                  onClick={() =>
                    setModal({ ...modal, upd: !modal.upd, id: item._id })
                  }
                  className="p-2 rounded-xl bg-green-600 hover:bg-green-400 active:bg-green-600 text-white"
                >
                  <SquarePen />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Overlay */}
      <div
        onClick={() => setModal({ del: false, upd: false, add: false, id: "" })}
        className={`fixed inset-0 bg-black/70 z-40 ${
          modal.del || modal.upd || modal.add ? "block" : "hidden"
        }`}
      />

      {/* Modal Components */}
      <DeleteGallery
        lang={lang}
        modal={modal.del}
        onCancel={() =>
          setModal({ del: false, upd: false, add: false, id: "" })
        }
        data={galleryItems.find((g) => g._id === modal.id)}
      />
      <UpdateGallery
        modal={modal.upd}
        onCancel={() =>
          setModal({ del: false, upd: false, add: false, id: "" })
        }
        data={galleryItems.find((g) => g._id === modal.id)}
        lang={lang}
      />
      <PaginationData
        setLoading={setLoading}
        category="gallery"
        onDataChange={(data) => setGalleryItems(data)}
        modal={modal.upd || modal.del || modal.add}
      />
    </div>
  );
};

export default Gallery;
