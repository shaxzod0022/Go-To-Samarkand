"use client";
import React, { FC, useState } from "react";
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
  image: string;
  duration: string;
  _id: string;
}

interface DeleteProps {
  modal: boolean;
  data?: Event;
  lang: string;
  onCancel?: () => void;
}

const DeleteEvent: FC<DeleteProps> = ({ onCancel, modal, data, lang }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const deleteEvent = async () => {
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};
    try {
      const res = await EventService.deleteEvent(data?._id, token);
      setSuccess(res.message);
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
        Do you want to delete this event?
      </p>
      <div className={`${styles.flexAround} gap-3 sm:p-3`}>
        <Btn onClick={onCancel} title="No" />
        <Btn
          onClick={deleteEvent}
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

export default DeleteEvent;
