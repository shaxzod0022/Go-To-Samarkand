"use client";

import { styles } from "@/styles/styles";
import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import Btn from "../Btn";
import AddEvent from "./AddEvent";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
}

interface Event {
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

const Events = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
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
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8080/api/event/all-event"
        );
        setEvents(res.data);
      } catch (err) {
        console.error("❌ Xatolik:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [modal]);

  if (!loading && events.length === 0) {
    return (
      <>
        <div className="text-center font-bold text-xl md:text-3xl xl:text-4xl p-10 mt-32">
          No events found
        </div>
        <Btn
          onClick={() => setModal({ ...modal, add: !modal.add })}
          title="Add Event"
          newClass="mb-6"
        />
        <AddEvent
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
      <h2 className="mb-3 text-xl md:text-3xl xl:text-4xl font-bold">Events</h2>

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
        title="Add Event"
        newClass="mb-6"
      />
      <AddEvent
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
        } ${events.length < 4 && "justify-start"} !items-start gap-5 flex-wrap`}
      >
        {loading
          ? [1, 2, 3, 4].map((_, i) => (
              <p key={i} className="card_loader p-28"></p>
            ))
          : events.map((item) => (
              <div
                key={item._id}
                className="w-full lg:w-[23%] md:w-[30%] shadow-md rounded-xl transition-all duration-200 bg-white"
              >
                <img
                  src={`http://localhost:8080/static/${item.image}`}
                  alt="Event Image"
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
                <div className={`${styles.flexAround} gap-3 p-3`}>
                  <Btn
                    onClick={() =>
                      setModal({ ...modal, del: true, id: item._id })
                    }
                    title="Delete"
                    newClass="!py-1 !px-5 bg-red-600 hover:bg-red-400 active:bg-red-600"
                  />
                  <Btn
                    onClick={() =>
                      setModal({ ...modal, upd: true, id: item._id })
                    }
                    title="Update"
                    newClass="!py-1 !px-5 bg-green-600 hover:bg-green-400 active:bg-green-600"
                  />
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
      <DeleteEvent
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
        data={events.find((item) => item._id === modal.id)}
      />

      {/* Update Modal */}
      <UpdateEvent
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
        data={events.find((item) => item._id === modal.id)}
      />
    </div>
  );
};

export default Events;
