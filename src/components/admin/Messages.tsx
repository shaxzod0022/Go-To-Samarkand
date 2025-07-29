"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "@/styles/styles"; // agar styles faylingiz bo‘lsa shu ishlatiladi
import Btn from "../Btn";
import BackMessage from "../BackMessage";

interface Message {
  _id: string;
  email: string;
  message: string;
  createdAt: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<{ del: boolean; id: string | null }>({
    del: false,
    id: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const stored = sessionStorage.getItem("adminData");
      const { token } = stored ? JSON.parse(stored) : {};

      const res = await axios.get(
        "https://gotosamarkand.onrender.com/api/message/all-message",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(res.data);
    } catch (err) {
      console.error("❌ Error loading messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id: string) => {
    setLoadingDelete(true);
    const stored = sessionStorage.getItem("adminData");
    const { token } = stored ? JSON.parse(stored) : {};

    try {
      const res = await axios.delete(
        `https://gotosamarkand.onrender.com/api/message/delete-message/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => prev.filter((t) => t._id !== id));

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
      setLoadingDelete(false);
    }
  };

  return (
    <div className={`${styles.paddingCont} mt-12 w-full text-start py-10`}>
      <h2 className="mb-4 text-xl md:text-3xl font-bold">User Messages</h2>
      <div className="flex flex-col gap-4">
        {loading ? (
          [1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="w-full h-24 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))
        ) : messages.length === 0 ? (
          <p className="text-lg font-semibold">No messages found</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`${styles.flexBetween} p-4 border border-gray-300 rounded-lg bg-white shadow hover:shadow-md transition`}
            >
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {msg.email}
                  </a>
                </p>
                <p className="text-md mb-2">
                  <strong>Message:</strong> {msg.message}
                </p>
                <p className="text-xs text-gray-400">
                  <strong>Received:</strong>{" "}
                  {new Date(msg.createdAt).toLocaleString("uz-UZ", {
                    timeZone: "Asia/Tashkent",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="relative text-center">
                <Btn
                  title="Delete"
                  newClass="!py-1 !bg-red-500 hover:!bg-red-400 active:!bg-red-500"
                  onClick={() =>
                    setModal({ ...modal, del: !modal.del, id: msg._id })
                  }
                />
                <div
                  className={`${
                    modal.del && modal.id === msg._id ? "block" : "hidden"
                  } bg-white z-10 text-sm border border-red-500 rounded p-2 absolute right-0 -bottom-24`}
                >
                  <p className="mb-2">Delete the message?</p>
                  <div className={`${styles.flexAround} gap-2`}>
                    <Btn
                      onClick={() =>
                        setModal({ ...modal, del: !modal.del, id: null })
                      }
                      title="No"
                      newClass="!px-2 !py-1 rounded"
                    />
                    <Btn
                      disabled={loadingDelete}
                      onClick={() => handleDeleteMessage(msg._id)}
                      title="Yes"
                      newClass="bg-red-500 hover:bg-red-400 active:bg-red-500 text-white !px-2 !py-1 rounded font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <BackMessage
        newClass="!top-20"
        successMessage={success}
        errorMessage={error}
      />
    </div>
  );
};

export default Messages;
