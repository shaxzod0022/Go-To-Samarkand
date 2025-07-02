"use client";
import React, { useState } from "react";
import axios from "axios";
import Btn from "../Btn";
import BackMessage from "../BackMessage";
import { styles } from "@/styles/styles";

interface AddServicProps {
  modal: boolean;
  onCancel: () => void;
}

const initialLocalizedText = { en: "", ru: "", ja: "" };

const AddServic: React.FC<AddServicProps> = ({ modal, onCancel }) => {
  const [formData, setFormData] = useState({
    title: { ...initialLocalizedText },
    description: { ...initialLocalizedText },
    price: 0,
    childrenPrice: 0,
    infantsPrice: 0,
    image: null as File | null,
  });

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    langKey?: keyof typeof initialLocalizedText
  ) => {
    if (langKey) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field as "title" | "description"],
          [langKey]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async () => {
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};

    try {
      const body = new FormData();
      body.append("price", String(formData.price));
      body.append("childrenPrice", String(formData.childrenPrice));
      body.append("infantsPrice", String(formData.infantsPrice));
      body.append("image", formData.image as Blob);
      body.append("title", JSON.stringify(formData.title));
      body.append("description", JSON.stringify(formData.description));

      const res = await axios.post(
        "https://gotosamarkand.onrender.com/api/servic/create-servic",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(res.data.message || "Servic successfully added");
      setFormData({
        title: { ...initialLocalizedText },
        description: { ...initialLocalizedText },
        price: 0,
        childrenPrice: 0,
        infantsPrice: 0,
        image: null,
      });
      setTimeout(() => {
        setSuccess(null);
        onCancel();
      }, 2000);
    } catch (err) {
      let msg = "Add failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoad(false);
    }
  };

  if (!modal) return null;

  return (
    <div className="bg-white max-w-lg w-full sm:p-6 p-4 z-50 fixed rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl overflow-y-auto max-h-[90vh]">
      <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">
        Add New Servic
      </h2>

      {/* TITLE */}
      <div className="mb-3">
        <label className="font-medium">Title</label>
        {["en","uz", "ru", "ja"].map((lang) => (
          <input
            key={lang}
            placeholder={`Title (${lang})`}
            value={formData.title[lang as keyof typeof initialLocalizedText]}
            onChange={(e) => handleChange(e, "title", lang as any)}
            className="w-full border px-3 py-1 mt-1 mb-2 rounded"
          />
        ))}
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <label className="font-medium">Description</label>
        {["en","uz", "ru", "ja"].map((lang) => (
          <textarea
            key={lang}
            placeholder={`Description (${lang})`}
            value={
              formData.description[lang as keyof typeof initialLocalizedText]
            }
            onChange={(e) => handleChange(e, "description", lang as any)}
            className="w-full border px-3 py-1 mt-1 mb-2 rounded"
          />
        ))}
      </div>

      {/* PRICE */}
      <div className="mb-3">
        <label className="font-medium">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => handleChange(e, "price")}
          className="w-full border px-3 py-1 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="font-medium">For children price</label>
        <input
          type="number"
          value={formData.childrenPrice}
          onChange={(e) => handleChange(e, "childrenPrice")}
          className="w-full border px-3 py-1 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="font-medium">For infants price</label>
        <input
          type="number"
          value={formData.infantsPrice}
          onChange={(e) => handleChange(e, "infantsPrice")}
          className="w-full border px-3 py-1 rounded"
        />
      </div>

      {/* IMAGE UPLOAD */}
      <div className="mb-5">
        <label className="font-medium block mb-1">Upload Image</label>
        <label className="cursor-pointer inline-block bg-gray-200 hover:bg-gray-300 transition px-4 py-2 rounded text-sm font-medium text-gray-700">
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {formData.image && (
          <p className="mt-2 text-sm text-green-600">
            Selected: {formData.image.name}
          </p>
        )}
      </div>

      {/* BUTTONS */}
      <div className={`${styles.flexAround} gap-4`}>
        <Btn onClick={onCancel} title="Cancel" />
        <Btn
          onClick={handleSubmit}
          disabled={load}
          title={load ? "Adding..." : "Add Servic"}
          newClass="bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
        />
      </div>

      <BackMessage
        successMessage={success}
        errorMessage={error}
        newClass="!top-1/2"
      />
    </div>
  );
};

export default AddServic;
