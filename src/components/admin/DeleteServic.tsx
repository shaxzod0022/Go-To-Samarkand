"use client";
import React, { FC, useState } from "react";
import Btn from "../Btn";
import { styles } from "@/styles/styles";
import axios from "axios";
import BackMessage from "../BackMessage";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
}

interface Servic {
  title: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string;
  duration: string;
  _id: string;
}

interface DeleteProps {
  modal: boolean;
  data?: Servic;
  lang: string;
  onCancel?: () => void;
}

const DeleteServic: FC<DeleteProps> = ({ onCancel, modal, data, lang }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const deleteServic = async () => {
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};
    try {
      const res = await axios.delete(
        `https://gotosamarkand.onrender.com/api/servic/delete-servic/${data?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message);
      setTimeout(() => {
        setSuccess(null);
        if (onCancel) onCancel();
      }, 2000);
    } catch (err) {
      let errorMessage = "Delete failed";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoad(false);
    }
  };

  if (!modal || !data) return null;

  return (
    <div className="bg-white 2xl:w-1/6 sm:p-5 p-3 z-50 fixed rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl">
      <h2 className="text-lg md:text-2xl font-bold mb-2">
        {data?.title[lang as keyof LocalizedText]}
      </h2>
      <p className="text-sm md:text-lg mb-2">
        Do you want to delete this service?
      </p>
      <div className={`${styles.flexAround} gap-3 sm:p-3`}>
        <Btn onClick={onCancel} title="No" />
        <Btn
          onClick={deleteServic}
          disabled={load}
          title="Yes"
          newClass="bg-red-600 hover:bg-red-400 active:bg-red-600"
        />
      </div>
      <BackMessage
        successMessage={success}
        errorMessage={error}
        newClass="!-top-20"
      />
    </div>
  );
};

export default DeleteServic;
