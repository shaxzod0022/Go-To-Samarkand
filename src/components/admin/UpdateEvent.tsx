"use client";
import React, { FC, useEffect, useState } from "react";
import Btn from "../Btn";
import { styles } from "@/styles/styles";
import axios from "axios";
import BackMessage from "../BackMessage";
import { EventService } from "@/services/event.service";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
  uz: string;
}

interface Event {
  title: LocalizedText;
  description: LocalizedText;
  price: number;
  startDate: string;
  endDate: string;
  childrenPrice: number;
  infantsPrice: number;
  image: string;
  _id: string;
}

interface UpdateProps {
  modal: boolean;
  data?: Event;
  lang: string;
  onCancel?: () => void;
}

const UpdateEvent: FC<UpdateProps> = ({ onCancel, modal, data, lang }) => {
  const [formData, setFormData] = useState<Event | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
      setPreviewUrl(null);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Event | keyof LocalizedText,
    langKey?: keyof LocalizedText
  ) => {
    if (!formData) return;

    if (langKey && (field === "title" || field === "description")) {
      setFormData({
        ...formData,
        [field]: {
          ...(formData[field] as LocalizedText),
          [langKey]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [field as keyof Event]: e.target.value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const updateEvent = async () => {
    if (!formData) return;
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};

    const fd = new FormData();
    fd.append("title", JSON.stringify(formData.title));
    fd.append("description", JSON.stringify(formData.description));
    fd.append("price", formData.price.toString());
    fd.append("childrenPrice", formData.childrenPrice.toString());
    fd.append("infantsPrice", formData.infantsPrice.toString());

    // 👉 faqat qiymati bor bo‘lsa qo‘sh
    if (formData.startDate && formData.startDate.trim() !== "") {
      fd.append("startDate", formData.startDate);
    }
    if (formData.endDate && formData.endDate.trim() !== "") {
      fd.append("endDate", formData.endDate);
    }
    if (imageFile) {
      fd.append("image", imageFile);
    } else {
      fd.append("image", formData.image);
    }

    try {
      const res = await EventService.updateEvent(fd, token, formData?._id);
      setSuccess(res.message || "Event updated successfully");
      setTimeout(() => {
        setSuccess(null);
        if (onCancel) onCancel();
      }, 2000);
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

  if (!modal || !formData) return null;

  return (
    <div className="bg-white max-w-md w-full sm:p-5 p-3 z-50 fixed rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl overflow-y-auto max-h-[90vh]">
      <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">
        Update Event
      </h2>

      {/* Title */}
      <label className="font-medium">Title ({lang})</label>
      <input
        value={formData.title[lang as keyof LocalizedText]}
        onChange={(e) => handleChange(e, "title", lang as keyof LocalizedText)}
        className="w-full border px-3 py-1 mb-3 rounded"
      />

      {/* Description */}
      <label className="font-medium">Description ({lang})</label>
      <textarea
        value={formData.description[lang as keyof LocalizedText]}
        onChange={(e) =>
          handleChange(e, "description", lang as keyof LocalizedText)
        }
        className="w-full border px-3 py-1 mb-3 rounded"
      />

      {/* Price */}
      <label className="font-medium">Price</label>
      <input
        type="number"
        value={formData.price ?? ""}
        onChange={(e) => handleChange(e, "price")}
        className="w-full border px-3 py-1 mb-3 rounded"
      />
      <div className="mb-3">
        <label className="font-medium">For children price</label>
        <input
          type="number"
          value={formData.childrenPrice ?? ""}
          onChange={(e) => handleChange(e, "childrenPrice")}
          className="w-full border px-3 py-1 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="font-medium">For infants price</label>
        <input
          type="number"
          value={formData.infantsPrice ?? ""}
          onChange={(e) => handleChange(e, "infantsPrice")}
          className="w-full border px-3 py-1 rounded"
        />
      </div>

      <div className="mb-3 space-x-2">
        <label className="font-medium">Start and end date</label> <br />
        <input
          type="datetime-local"
          name="startDate"
          value={formData.startDate ?? ""}
          onChange={(e) => handleChange(e, "startDate")}
          required
          className="w-[47%] border p-4 rounded-lg"
        />
        <input
          type="datetime-local"
          name="endDate"
          value={formData.endDate ?? ""}
          onChange={(e) => handleChange(e, "endDate")}
          required
          className="w-[47%] border p-4 rounded-lg"
        />
      </div>

      {/* Preview Image */}
      <label className="font-medium">Image Preview</label>
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="New"
          className="w-full h-40 object-cover rounded mb-3 border-2 border-blue-400"
        />
      ) : (
        <img
          src={`https://gotosamarkand.onrender.com/static/${formData.image}`}
          alt="Old"
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      {/* Upload Image */}
      <label
        htmlFor="upload"
        className="inline-block mb-5 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500 active:bg-blue-700 transition"
      >
        Upload New Image
      </label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Buttons */}
      <div className={`${styles.flexAround} gap-4`}>
        <Btn onClick={onCancel} title="Cancel" />
        <Btn
          onClick={updateEvent}
          disabled={load}
          title={load ? "Updating..." : "Update"}
          newClass="bg-green-600 hover:bg-green-500 active:bg-green-700"
        />
      </div>

      <BackMessage
        successMessage={success}
        errorMessage={error}
        newClass="!top-28"
      />
    </div>
  );
};

export default UpdateEvent;
