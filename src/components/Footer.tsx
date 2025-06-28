"use client";
import { styles } from "@/styles/styles";
import { useTranslations } from "next-intl";
import React from "react";
import { Instagram, Facebook, Send, Youtube } from "lucide-react";
import Link from "next/link";
import Btn from "./Btn";
import { usePathname } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  Instagram,
  Facebook,
  Send,
  Youtube,
};

interface FooterContacts {
  path: string;
  icon: string;
}
interface FooterLinks {
  path: string;
  label: string;
}

const Footer = () => {
  const t = useTranslations("footer");
  const tNav = useTranslations("navbar");
  const contacts = t.raw("contacts") as FooterContacts[];
  const footerLinks = tNav.raw("navLinks") as FooterLinks[];
  const pathname = usePathname();

  return (
    <div
      id="contacts"
      className={`${styles.paddingCont} lg:py-8 py-5 bg-black text-white`}
    >
      <div className={`${styles.flexBetween} gap-4 mb-5`}>
        <div className="md:w-[20%] w-full">
          <h2 className="text-xl">{t("title")}</h2>
          <p className="text-lg">{t("description")}</p>
        </div>
        <ul className={`${styles.flexCol}`}>
          {footerLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={pathname.slice(3).length === 0 ? `#${link.path}` : "/"}
                className={`text-md transition-colors duration-200 hover:text-yellow-300`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <ul className={`${styles.flex} gap-3 mb-3`}>
            {contacts.map((item) => {
              const Icon = iconMap[item.icon];
              if (!Icon) return null;

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="hover:text-yellow-300 transition"
                  >
                    <Icon className="w-7 h-7" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <p>{t("label")}</p>
        </div>
        <div
          className={`${styles.flexCol} items-start gap-3 lg:w-[30%] w-full`}
        >
          <textarea
            placeholder={t("placeholder")}
            className={`bg-white outline-none rounded-md text-black p-3 w-full`}
          />
          <Btn title={t("btnTitle")} />
        </div>
      </div>
      <p className="text-center">{t("copiright")}</p>
    </div>
  );
};

export default Footer;
