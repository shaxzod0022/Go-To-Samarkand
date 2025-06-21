"use client";
import { styles } from "@/styles/styles";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { PanelRightOpen } from "lucide-react";

interface NavLink {
  path: string;
  label: string;
}

const Navbar = () => {
  const t = useTranslations("navbar");
  const navLinks = t.raw("navLinks") as NavLink[];
  const [modal, setModal] = useState<boolean>(false);
  return (
    <div
      className={`bg-white z-20 fixed top-0 mx-auto w-full max-w-[1800px] ${styles.flexBetween} ${styles.paddingCont} py-4 shadow-sm`}
    >
      <Link href="/" className={`${styles.flexStart} gap-3`}>
        <span className="bg-yellow-300 w-10 h-10 rounded-full"></span>
        <h2 className="font-bold lg:text-4xl sm:text-2xl text-xl">
          {t("logo")}
        </h2>
      </Link>
      <nav className={`${styles.flex} gap-3 relative`}>
        <LanguageSwitcher />
        <button className="lg:hidden flex" onClick={() => setModal((i) => !i)}>
          <PanelRightOpen />
        </button>
        <ul
          className={`flex lg:p-0 md:p-7 p-4 lg:h-auto lg:w-auto transition-all duration-200 w-[50%] h-svh lg:items-center bg-white lg:justify-between lg:flex-row flex-col lg:gap-7 gap-3 lg:static fixed ${
            modal ? "right-0 top-16" : "top-0 -right-[100%]"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                onClick={() => setModal(false)}
                href={"#" + link.path}
                className={`text-lg font-semibold transition-colors duration-200 hover:text-yellow-300`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
