import React, { FC } from "react";

interface BtnProps {
  title: string;
  onClick?: () => void;
  newClass?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Btn: FC<BtnProps> = ({
  title,
  onClick,
  disabled = false,
  newClass = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`hover:bg-blue-400 active:bg-blue-600 transition-colors duration-100 bg-blue-600 py-2 px-8 rounded-md text-white text-md font-semibold ${newClass}`}
    >
      {disabled ? <span className="btn_loader"></span> : title}
    </button>
  );
};

export default Btn;
