"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Star } from "lucide-react";
import BackMessage from "./BackMessage";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Btn from "./Btn";
import { styles } from "@/styles/styles";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
  uz: string;
}

interface ItemData {
  title: LocalizedText;
  description: LocalizedText;
  image: string;
}

interface Order {
  fullName: string;
  email: string;
  phone: string;
  totalPrice: number;
  comment?: string;
  tourId?: ItemData;
  eventId?: ItemData;
  servicId?: ItemData;
}

const RateUs = () => {
  const lang = useLocale();
  const router = useRouter();
  const t = useTranslations("rate");
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const onModel = searchParams.get("onModel");
  const itemId = searchParams.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (orderId && onModel && itemId) {
      axios
        .get(
          `https://gotosamarkand.onrender.com/api/${onModel.toLowerCase()}-order/${onModel.toLowerCase()}-order/${orderId}`
        )
        .then((res) => setOrder(res.data))
        .catch((err) => console.error(err));
    }
  }, [orderId, onModel, lang, itemId]);

  const submitRating = async () => {
    setLoad(true);
    try {
      await axios.post("https://gotosamarkand.onrender.com/api/rating/create-rating", {
        orderId,
        onModel,
        rating,
        comment,
        guestFullName: order.fullName,
        itemId,
      });
      setSuccess("Thank you for your feedback!");
      setTimeout(() => {
        setSuccess(null);
        router.replace("/");
      }, 4000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 4000);
    } finally {
      setLoad(false);
    }
  };

  if (!orderId || !onModel || !itemId) return null;

  const item = order?.tourId || order?.eventId || order?.servicId || null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">{t("title")}</h2>
        {order ? (
          <>
            {item && (
              <div className="mb-6 text-center">
                <Image
                  src={`https://gotosamarkand.onrender.com/static/${item.image}`}
                  alt={item.title[lang as keyof LocalizedText]}
                  width={500}
                  height={300}
                  className="rounded-lg mb-4 mx-auto"
                />
                <h3 className="text-xl font-semibold mb-1">
                  {item.title[lang as keyof LocalizedText]}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description[lang as keyof LocalizedText]}
                </p>
              </div>
            )}

            <div className="mb-6 space-y-1 text-center">
              <p>
                <span className="font-medium">{t("fullName")}:</span>{" "}
                {order.fullName}
              </p>
              <p>
                <span className="font-medium">{t("totalPrice")}:</span> $
                {order.totalPrice}
              </p>
            </div>
          </>
        ) : (
          <div className={`${styles.flexCol} !items-center`}>
            <p className="text-center card_loader p-28"></p>
          </div>
        )}

        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-4xl transition ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <Star />
            </button>
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          rows={4}
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Btn
          disabled={load}
          onClick={submitRating}
          title={t("submit")}
          newClass="w-full"
        />

        <BackMessage successMessage={success} errorMessage={error} />
      </div>
    </div>
  );
};

export default RateUs;
