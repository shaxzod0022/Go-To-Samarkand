"use client";

import React, { FC, useState } from "react";
import Btn from "../Btn";
import { styles } from "@/styles/styles";
import axios from "axios";
import BackMessage from "../BackMessage";
import { GalleryService } from "@/services/gallery.service";

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
}

interface DeleteProps {
  modal: boolean;
  data?: Gallery;
  lang: string;
  onCancel?: () => void;
}

const DeleteGallery: FC<DeleteProps> = ({ onCancel, modal, data, lang }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const deleteGallery = async () => {
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};

    try {
      const res = await GalleryService.deleteGallery(data?._id, token);

      setSuccess(res.message || "Image successfully deleted");
      setTimeout(() => {
        setSuccess(null);
        if (onCancel) onCancel();
      }, 2000);
    } catch (err) {
      let msg = "Delete failed";
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

  if (!modal || !data) return null;

  return (
    <div className="bg-white 2xl:w-1/6 sm:p-5 p-3 z-50 fixed rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl">
      <h2 className="text-lg md:text-2xl font-bold mb-2 text-center">
        {data.title?.[lang as keyof LocalizedText] || "Gallery Image"}
      </h2>
      <p className="text-sm md:text-base text-center mb-3">
        Do you want to delete this image?
      </p>
      <div className={`${styles.flexAround} gap-3`}>
        <Btn onClick={onCancel} title="No" />
        <Btn
          onClick={deleteGallery}
          disabled={load}
          title="Yes"
          newClass="bg-red-600 hover:bg-red-400 active:bg-red-600"
        />
      </div>

      <BackMessage
        successMessage={success}
        errorMessage={error}
        newClass="!top-20"
      />
    </div>
  );
};

export default DeleteGallery;
