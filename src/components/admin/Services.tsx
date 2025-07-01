"use client";

import { styles } from "@/styles/styles";
import axios from "axios";
import { SquarePen, Star, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Btn from "../Btn";
import AddServic from "./AddServic";
import UpdateServic from "./UpdateServic";
import DeleteServic from "./DeleteServic";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
}

interface Servic {
  title: LocalizedText;
  description: LocalizedText;
  price: number;
  childrenPrice: number;
  infantsPrice: number;
  image: string;
  duration: string;
  _id: string;
}

const langs = [
  { id: 1, lang: "en", label: "🇺🇸 English" },
  { id: 2, lang: "ru", label: "🇷🇺 Русский" },
  { id: 3, lang: "ja", label: "🇯🇵 日本語" },
];

const Services = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Servic[]>([]);
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

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://gotosamarkand.onrender.com/api/servic/all-servic"
        );
        setServices(res.data);
      } catch (err) {
        console.error("❌ Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [modal]);

  if (!loading && services.length === 0) {
    return (
      <>
        <div className="text-center font-bold text-xl md:text-3xl xl:text-4xl p-10 mt-32">
          No services found
        </div>
        <Btn
          onClick={() => setModal({ ...modal, add: !modal.add })}
          title="Add Service"
          newClass="mb-6"
        />
        <AddServic
          onCancel={() =>
            setModal({
              del: false,
              upd: false,
              add: false,
              id: "",
            })
          }
          modal={modal.add}
        />
      </>
    );
  }

  return (
    <div className={`${styles.paddingCont} mt-12 py-10 scroll-mt-12`}>
      <h2 className="mb-3 text-xl md:text-3xl xl:text-4xl font-bold">
        Services
      </h2>

      <div className={`${styles.flexCenter} gap-4 mb-4`}>
        {langs.map((item) => (
          <button
            key={item.id}
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
        onClick={() => setModal({ ...modal, add: !modal.add })}
        title="Add Service"
        newClass="mb-6"
      />
      <AddServic
        onCancel={() =>
          setModal({
            del: false,
            upd: false,
            add: false,
            id: "",
          })
        }
        modal={modal.add}
      />

      <div
        className={`flex items-center flex-wrap ${
          loading ? "justify-around" : "justify-between"
        } ${
          services.length < 4 && "justify-start"
        } !items-start gap-5 flex-wrap`}
      >
        {loading
          ? [1, 2, 3, 4].map((_, i) => (
              <p key={i} className="card_loader p-28"></p>
            ))
          : services.map((item) => (
              <div
                key={item._id}
                className="w-full lg:w-[23%] md:w-[30%] shadow-md rounded-xl transition-all duration-200 bg-white"
              >
                <img
                  src={`https://gotosamarkand.onrender.com/static/${item.image}`}
                  alt="Service Image"
                  className="w-full h-52 object-cover rounded-t-xl"
                />
                <div className="p-3 text-left">
                  <div className={`${styles.flex} mb-2`}>
                    <Star className="text-yellow-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl xl:text-2xl font-bold my-2">
                    {item.title[lang as keyof LocalizedText]}
                  </h3>
                  <p className="text-sm sm:text-md xl:text-lg mb-2 text-gray-600">
                    {item.description[lang as keyof LocalizedText]}
                  </p>
                  <p className="text-green-600 mb-2 font-semibold text-lg">
                    <span>For adults price:</span> USD {item.price}$
                  </p>
                  <p className="text-green-600 mb-2 font-semibold text-lg">
                    <span>For children price:</span> USD {item.childrenPrice}$
                  </p>
                  <p className="text-green-600 mb-2 font-semibold text-lg">
                    <span>For infants price:</span> USD {item.infantsPrice}$
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
            ))}
      </div>

      {/* Overlay */}
      <div
        onClick={() =>
          setModal({
            del: false,
            upd: false,
            add: false,
            id: "",
          })
        }
        className={`fixed inset-0 bg-black/70 z-40 ${
          modal.del || modal.upd || modal.add ? "block" : "hidden"
        }`}
      />

      {/* Delete Modal */}
      <DeleteServic
        onCancel={() =>
          setModal({
            del: false,
            upd: false,
            add: false,
            id: "",
          })
        }
        lang={lang}
        modal={modal.del}
        data={services.find((item) => item._id === modal.id)}
      />

      {/* Update Modal */}
      <UpdateServic
        onCancel={() =>
          setModal({
            del: false,
            upd: false,
            add: false,
            id: "",
          })
        }
        lang={lang}
        modal={modal.upd}
        data={services.find((item) => item._id === modal.id)}
      />
    </div>
  );
};

export default Services;
