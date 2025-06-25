"use client";

import React, { FC, useEffect, useState } from "react";
import Btn from "../Btn";
import { styles } from "@/styles/styles";
import axios from "axios";
import BackMessage from "../BackMessage";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
}

interface Gallery {
  title?: LocalizedText;
  description?: LocalizedText;
  image: string;
  _id: string;
}

interface UpdateGalleryProps {
  modal: boolean;
  data?: Gallery;
  lang: string;
  onCancel?: () => void;
}

const UpdateGallery: FC<UpdateGalleryProps> = ({
  onCancel,
  modal,
  data,
  lang,
}) => {
  const [formData, setFormData] = useState<Gallery | null>(null);
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
    field: keyof Gallery | keyof LocalizedText,
    langKey?: keyof LocalizedText
  ) => {
    if (!formData) return;

    if ((field === "title" || field === "description") && langKey) {
      setFormData({
        ...formData,
        [field]: {
          ...(formData[field] || {}),
          [langKey]: e.target.value,
        },
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const updateGallery = async () => {
    if (!formData) return;
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};

    const fd = new FormData();
    if (formData.title) fd.append("title", JSON.stringify(formData.title));
    if (formData.description)
      fd.append("description", JSON.stringify(formData.description));
    if (imageFile) {
      fd.append("image", imageFile);
    } else {
      fd.append("image", formData.image);
    }

    try {
      const res = await axios.put(
        `http://localhost:8080/api/gallery/update-gallery/${formData._id}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess(res.data.message || "Gallery updated successfully");
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
        Update Gallery
      </h2>

      <label className="font-medium">Title ({lang})</label>
      <input
        value={formData.title?.[lang as keyof LocalizedText] || ""}
        onChange={(e) => handleChange(e, "title", lang as keyof LocalizedText)}
        className="w-full border px-3 py-1 mb-3 rounded"
      />

      <label className="font-medium">Description ({lang})</label>
      <textarea
        value={formData.description?.[lang as keyof LocalizedText] || ""}
        onChange={(e) =>
          handleChange(e, "description", lang as keyof LocalizedText)
        }
        className="w-full border px-3 py-1 mb-3 rounded"
      />

      <label className="font-medium">Image Preview</label>
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="New"
          className="w-full h-40 object-cover rounded mb-3 border-2 border-blue-400"
        />
      ) : (
        <img
          src={`http://localhost:8080/static/${formData.image}`}
          alt="Old"
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

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

      <div className={`${styles.flexAround} gap-4`}>
        <Btn onClick={onCancel} title="Cancel" />
        <Btn
          onClick={updateGallery}
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

export default UpdateGallery;
