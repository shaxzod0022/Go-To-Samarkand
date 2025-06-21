import React, { FC } from "react";

interface Btn {
  title: string;
  onClick?: () => void;
  newClass?: string;
  disabled?: boolean;
}

const Btn: FC<Btn> = ({ title, onClick, disabled, newClass }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${newClass} hover:bg-blue-400 active:bg-blue-600 transition-colors duration-100 bg-blue-600 py-2 px-8 rounded-md text-white text-md font-semibold`}
    >
      {title}
    </button>
  );
};

export default Btn;
