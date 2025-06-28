"use client";

import { styles } from "@/styles/styles";
import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import Btn from "../Btn";
import BackMessage from "../BackMessage";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
}

interface Tour {
  title: LocalizedText;
  description: LocalizedText;
  price: number;
  childrenPrice: number;
  infantsPrice: number;
  image: string;
  duration: string;
  _id: string;
}

interface OrderTourProps {
  tourId: Tour;
  fullName: string;
  email: string;
  phone: string;
  date: Date;
  adults: number;
  children: number;
  infants: number;
  comment: string;
  totalPrice: number;
  commentAdmin: string;
  _id: string;
  updatedAt: Date;
  createdAt: Date;
}

const langs = [
  { id: 1, lang: "en", label: "🇺🇸 English" },
  { id: 2, lang: "ru", label: "🇷🇺 Русский" },
  { id: 3, lang: "ja", label: "🇯🇵 日本語" },
];

const OrderTour = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tours, setTours] = useState<OrderTourProps[]>([]);
  const [lang, setLang] = useState<string>("en");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingComment, setLoadingComment] = useState<string | null>(null); // loading faqat bir id uchun
  const [comments, setComments] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<{
    del: boolean;
    orderId: string | null;
  }>({ del: false, orderId: null });

  const handleOrderAction = async (id: string, action: "update" | "delete") => {
    setLoadingComment(id);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};

    try {
      let res;
      if (action === "update") {
        res = await axios.put(
          `http://localhost:8080/api/tour-order/update-order/${id}`,
          { commentAdmin: comments[id] },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (action === "delete") {
        res = await axios.delete(
          `http://localhost:8080/api/tour-order/delete-order/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Tur o‘chirilgandan so‘ng localdan olib tashlaymiz
        setTours((prev) => prev.filter((t) => t._id !== id));
      }

      setSuccess(res?.data?.message || "Action successful");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      let msg = "Action failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoadingComment(null);
    }
  };

  const fetchTours = async () => {
    setLoading(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};
    try {
      const res = await axios.get(
        "http://localhost:8080/api/tour-order/all-order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTours(res.data);

      // Yangi: comments ni to'ldirib qo'yish
      const commentMap: Record<string, string> = {};
      res.data.forEach((tour: OrderTourProps) => {
        commentMap[tour._id] = tour.commentAdmin || "";
      });
      setComments(commentMap);
    } catch (err) {
      console.error("❌ Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (!tours || tours.length === 0)
    return <div className="text-2xl font-bold h-40">Order Not Found</div>;

  return (
    <div className={`${styles.paddingCont} mt-12 py-10 scroll-mt-12`}>
      <h2 className="mb-3 text-xl md:text-3xl xl:text-4xl font-bold">
        Ordered Tours
      </h2>
      <div className={`${styles.flexCenter} gap-4 mb-4`}>
        {langs.map((item) => (
          <button
            key={item.id}
            onClick={() => setLang(item.lang)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              lang === item.lang
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={`flex flex-wrap items-start gap-5 ${
          loading ? "justify-around" : "justify-between"
        } ${tours.length < 4 && "justify-start"}`}
      >
        {loading
          ? [1, 2, 3, 4].map((_, i) => (
              <p key={i} className="card_loader p-28"></p>
            ))
          : tours.map((item) => (
              <div
                key={item._id}
                className="w-full lg:w-[23%] md:w-[30%] shadow-md rounded-xl bg-white"
              >
                <img
                  src={`http://localhost:8080/static/${item.tourId.image}`}
                  alt="Tour Image"
                  className="w-full h-52 object-cover rounded-t-xl"
                />
                <div className="p-3 text-left">
                  <h3 className="text-lg sm:text-xl xl:text-2xl font-bold my-2">
                    {item.tourId.title[lang as keyof LocalizedText]}
                  </h3>
                  <p className="text-sm sm:text-md xl:text-lg mb-2 text-gray-600">
                    {item.tourId.description[lang as keyof LocalizedText]}
                  </p>
                  <hr />
                  <ul>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Guest:</span>{" "}
                      <span className="font-semibold">{item.fullName}</span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Email:</span>{" "}
                      <span className="font-semibold">{item.email}</span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Phone:</span>{" "}
                      <span className="font-semibold">{item.phone}</span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Tour start time:</span>{" "}
                      <span className="font-semibold">
                        {new Date(item.date).toLocaleTimeString("uz-UZ", {
                          timeZone: "Asia/Samarkand",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Adults:</span>{" "}
                      <span className="font-semibold">{item.adults}</span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Children:</span>{" "}
                      <span className="font-semibold">{item.children}</span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Infants:</span>{" "}
                      <span className="font-semibold">{item.infants}</span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Guest comments:</span>{" "}
                      <span
                        className={`${
                          !item.comment && "text-red-500"
                        } font-semibold`}
                      >
                        {item.comment ? item.comment : "No comment"}
                      </span>
                    </li>
                    <li className="text-sm sm:text-md xl:text-lg my-2 bg-gray-100 p-1">
                      <span className="font-extralight">Total Price:</span>{" "}
                      <span className="font-semibold">
                        ${item.totalPrice} USD
                      </span>
                    </li>
                  </ul>
                  <hr className="mb-2" />
                  <label className="font-medium">Admin comment</label>
                  <textarea
                    className="w-full border border-blue-500 outline-blue-600 px-3 py-1 rounded mb-2"
                    value={comments[item._id] || ""}
                    placeholder="Comment"
                    onChange={(e) =>
                      setComments((prev) => ({
                        ...prev,
                        [item._id]: e.target.value,
                      }))
                    }
                  />
                  <Btn
                    onClick={() => handleOrderAction(item._id, "update")}
                    title={
                      loadingComment === item._id
                        ? "Sending..."
                        : "Send comment"
                    }
                    disabled={loadingComment === item._id}
                    newClass={`${
                      modal.del && modal.orderId === item._id
                        ? "hidden"
                        : "block"
                    } !px-3 !py-1`}
                  />
                </div>
                <div className={`${styles.flexBetween} text-sm p-3 relative`}>
                  <div>
                    <strong>Edited date:</strong>{" "}
                    <span>
                      {new Date(item.updatedAt).toLocaleTimeString("uz-UZ", {
                        timeZone: "Asia/Samarkand",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div>
                    <strong>Created date:</strong>{" "}
                    <span>
                      {new Date(item.createdAt).toLocaleTimeString("uz-UZ", {
                        timeZone: "Asia/Samarkand",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => setModal({ del: true, orderId: item._id })}
                    className="text-red-600 font-semibold"
                  >
                    Delete order
                  </button>
                  <div
                    className={`${
                      modal.del && modal.orderId === item._id
                        ? "block"
                        : "hidden"
                    } bg-white z-10 text-sm border border-red-500 rounded p-2 absolute right-0 -bottom-16`}
                  >
                    <p className="mb-2">Delete the order?</p>
                    <div className={`${styles.flexAround} gap-2`}>
                      <Btn
                        onClick={() => setModal({ del: false, orderId: null })}
                        title="No"
                        newClass="!px-2 !py-1 rounded"
                      />
                      <Btn
                        disabled={loadingComment === item._id}
                        onClick={() => handleOrderAction(item._id, "delete")}
                        title="Yes"
                        newClass="bg-red-500 hover:bg-red-400 active:bg-red-500 text-white !px-2 !py-1 rounded font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <BackMessage
        successMessage={success}
        errorMessage={error}
        newClass="!top-20"
      />
    </div>
  );
};

export default OrderTour;
