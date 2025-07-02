"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { styles } from "@/styles/styles";
import { useLocale, useTranslations } from "next-intl";
import Btn from "./Btn";
import { Minus, Plus } from "lucide-react";
import BackMessage from "./BackMessage";
import CitizenshipSelect from "./Citizenship";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
  uz: string;
}

interface Event {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  price: number;
  childrenPrice: number;
  infantsPrice: number;
  image: string;
  startDate: string;
  endDate: string;
}

type PersonCategory = {
  category: "adults" | "children" | "infants";
  label: string;
  age: string;
};

const BookEvent = () => {
  const { id: eventId } = useParams();
  const lang = useLocale();
  const t = useTranslations("booktour");
  const [event, setEvent] = useState<Event | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const rawPeople = t.raw("peopleCategories") as PersonCategory[];

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    citizenship: "",
    adults: 1,
    children: 0,
    infants: 0,
    comment: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parseData = JSON.parse(savedData);
      setForm({
        fullName: parseData.fullName || "",
        email: parseData.email || "",
        phone: parseData.phone || "",
        citizenship: parseData.citizenship || "",
        adults: 1,
        children: 0,
        infants: 0,
        comment: "",
      });
    }
  }, []);

  const totalPrice =
    form.adults * (event?.price || 0) +
    form.children * (event?.childrenPrice || 0) +
    form.infants * (event?.infantsPrice || 0);

  const fetchEvent = async () => {
    if (!eventId) return;
    try {
      const res = await axios.get(
        `https://gotosamarkand.onrender.com/api/event/one-event/${eventId}`
      );
      setEvent(res.data);
    } catch (err) {
      console.error("Event fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const filteredPhone = value
        .replace(/[^0-9+]/g, "")
        .replace(/\+(?=.*\+)/g, "");
      setForm({ ...form, [name]: filteredPhone });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCountChange = (
    field: PersonCategory["category"],
    delta: number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    try {
      const data = { ...form, eventId, totalPrice };
      const res = await axios.post(
        "https://gotosamarkand.onrender.com/api/event-order/create-order",
        data
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        })
      );
      setSuccess(res.data.message);
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      let msg = "Update failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoad(false);
    }
  };

  const getPrice = (category: PersonCategory["category"]): number => {
    const priceKey = `${category}Price` as keyof Event;
    const price = event?.[priceKey];
    return typeof price === "number" ? price : event?.price || 0;
  };

  if (!event) {
    return (
      <div className={`${styles.flexCenter} h-screen`}>
        <p className="circle_loader"></p>
      </div>
    );
  }

  return (
    <div
      className={`${styles.flexBetween} !items-start ${styles.paddingCont} py-4 sm:py-6 lg:py-8 sm:mt-16 mt-20`}
    >
      <div className="lg:w-2/3 w-full">
        <img
          src={`https://gotosamarkand.onrender.com/static/${event.image}`}
          alt={event.title[lang as keyof LocalizedText]}
          className="rounded-lg shadow-md w-full lg:h-96 object-cover mb-2"
        />
        <h2 className="text-2xl font-bold">
          {event.title[lang as keyof LocalizedText]}
        </h2>
        <p className="text-gray-700 text-lg mb-4">
          {event.description[lang as keyof LocalizedText]}
        </p>
        <p className="text-gray-700 text-lg mb-4">
          <strong>Start date:</strong>{" "}
          {new Date(event.startDate).toLocaleTimeString("uz-UZ", {
            timeZone: "Asia/Samarkand",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-gray-700 text-lg mb-4">
          <strong>End date:</strong>{" "}
          {new Date(event.endDate).toLocaleTimeString("uz-UZ", {
            timeZone: "Asia/Samarkand",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <strong className="text-blue-600 text-xl">USD: ${event.price}</strong>
      </div>

      <div className="lg:w-1/3 lg:mt-0 mt-5 w-full bg-white lg:py-0 lg:px-5">
        <h3 className="text-2xl font-bold mb-4">{t("title")}</h3>
        <form onSubmit={handleSubmit} className={`${styles.flexCol} gap-4`}>
          <input
            type="text"
            name="fullName"
            placeholder={t("fullName")}
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border p-4 rounded-lg border-blue-500 outline-blue-700"
          />
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-4 rounded-lg border-blue-500 outline-blue-700"
          />
          <input
            type="tel"
            name="phone"
            placeholder={t("phone")}
            value={form.phone}
            onChange={handleChange}
            pattern="^\+?[0-9]*$"
            required
            className="w-full border p-4 rounded-lg border-blue-500 outline-blue-700"
          />
          <CitizenshipSelect
            onChange={(value) => setForm({ ...form, citizenship: value })}
          />
          {rawPeople.map(({ category, label, age }) => (
            <div
              key={category}
              className={`${styles.flexBetween} gap-4 border rounded-lg border-blue-500 p-3`}
            >
              <label className={`${styles.flexCol} items-center capitalize`}>
                <strong>{label}</strong>
                <span>
                  <span className="text-red-500">
                    {t("age")} {age}
                  </span>{" "}
                  <span className="text-green-500">${getPrice(category)}</span>
                </span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCountChange(category, -1)}
                  disabled={form[category] === 0}
                  className="px-3 hover:bg-red-200 active:bg-red-300 py-1 rounded"
                >
                  <Minus />
                </button>
                <span className="min-w-[20px] text-center">
                  {form[category]}
                </span>
                <button
                  type="button"
                  onClick={() => handleCountChange(category, 1)}
                  className="px-3 py-1 hover:bg-sky-200 active:bg-sky-300 rounded"
                >
                  <Plus />
                </button>
              </div>
            </div>
          ))}

          <div className={`${styles.flexBetween}`}>
            <p>
              {t("guest")}:{" "}
              <span className="text-orange-600 font-bold">
                {form.adults + form.children + form.infants}
              </span>
            </p>
            <p>
              {t("price")}:{" "}
              <span className="text-green-500 font-bold">${totalPrice}</span>
            </p>
          </div>

          <textarea
            name="comment"
            placeholder={t("comment")}
            value={form.comment}
            onChange={handleChange}
            className="w-full border py-2 px-4 rounded-lg border-blue-500 outline-blue-700"
          ></textarea>
          <Btn title={t("send")} type="submit" disabled={load} />
        </form>
      </div>
      <BackMessage
        successMessage={success}
        errorMessage={error}
        newClass="!top-20"
      />
    </div>
  );
};

export default BookEvent;
