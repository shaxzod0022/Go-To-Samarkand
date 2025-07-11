import React, { FC } from "react";

interface TopTitle {
  title: string;
  description: string;
  id: string;
  newClass?: string;
}

const TopTitle: FC<TopTitle> = ({ title, description, id, newClass }) => {
  return (
    <div id={id} className={`${newClass} text-center md:p-8 p-4 scroll-mt-18`}>
      <h2 className="font-bold lg:text-5xl sm:text-3xl text-xl sm:mb-5 mb-2">
        {title}
      </h2>
      <p className="text-sm md:text-lg">{description}</p>
    </div>
  );
};

export default TopTitle;
