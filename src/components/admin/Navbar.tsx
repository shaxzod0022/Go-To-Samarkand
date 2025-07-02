"use client";
import { styles } from "@/styles/styles";
import Link from "next/link";
import React, { useState } from "react";
import { PanelRightOpen } from "lucide-react";
import nav from "../../../messages/en.json";
import { usePathname } from "next/navigation";

interface NavLink {
  path: string;
  label: string;
}

const Navbar = () => {
  const navLinks = nav.navbar.navLinks as NavLink[];
  const [modal, setModal] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div
      className={`bg-white z-20 fixed top-0 mx-auto w-full max-w-[1800px] ${styles.flexBetween} ${styles.paddingCont} py-4 shadow-sm`}
    >
      <Link href="/" className={`${styles.flexStart} gap-3`}>
        <span className="bg-yellow-300 w-10 h-10 rounded-full"></span>
        <h2 className="font-bold lg:text-4xl sm:text-2xl text-xl sm:block hidden">
          {nav.navbar.logo}
        </h2>
      </Link>
      <Link href="/admin" className={`${styles.flexStart} gap-3`}>
        <h2 className="font-bold lg:text-4xl sm:text-2xl text-xl">
          Admin Panel
        </h2>
      </Link>
      <nav className={`${styles.flex} gap-3 relative`}>
        <button className="lg:hidden flex" onClick={() => setModal((i) => !i)}>
          <PanelRightOpen />
        </button>
        <ul
          className={`flex lg:p-0 md:p-7 p-4 lg:h-auto lg:w-auto transition-all duration-200 w-[50%] h-svh lg:items-center bg-white lg:justify-between lg:flex-row flex-col lg:gap-7 gap-3 lg:static fixed ${
            modal ? "right-0 top-16" : "top-0 -right-[100%]"
          }`}
        >
          <li>
            <Link
              onClick={() => setModal(false)}
              href={"/admin"}
              className={`${
                pathname === "/admin" && "text-yellow-300"
              } text-lg font-semibold transition-colors duration-200 hover:text-yellow-300`}
            >
              Dashboard
            </Link>
          </li>
          {navLinks.slice(2, 6).map((link) => (
            <li key={link.path}>
              <Link
                onClick={() => setModal(false)}
                href={"/admin/" + link.path}
                className={`${
                  pathname.includes(link.path) && "text-yellow-300"
                } text-lg font-semibold transition-colors duration-200 hover:text-yellow-300`}
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
