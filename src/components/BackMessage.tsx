"use client";
import { FC } from "react";

interface Props {
  newClass?: string;
  successMessage?: string | null;
  errorMessage?: string | null;
}

const BackMessage: FC<Props> = ({ successMessage, errorMessage, newClass }) => {
  if (!successMessage && !errorMessage) {
    return null;
  }
  return (
    <div
      className={`${newClass} rounded-lg px-5 py-3 fixed z-50 top-5 left-1/2 -translate-x-1/2 transform p-3> ${
        successMessage ? "bg-green-500/60" : "bg-red-500/60"
      } text-white`}
    >
      <p className="font-medium text-center">
        {successMessage ? successMessage : errorMessage}
      </p>
    </div>
  );
};

export default BackMessage;
