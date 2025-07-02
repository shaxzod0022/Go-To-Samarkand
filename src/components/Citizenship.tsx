"use client";
import { useTranslations } from "next-intl";
import React, { FC, useEffect, useRef, useState } from "react";

const countriesWithFlags = [
  { label: "Afghanistan", icons: "af" },
  { label: "Albania", icons: "al" },
  { label: "Algeria", icons: "dz" },
  { label: "Andorra", icons: "ad" },
  { label: "Angola", icons: "ao" },
  { label: "Antigua and Barbuda", icons: "ag" },
  { label: "Argentina", icons: "ar" },
  { label: "Armenia", icons: "am" },
  { label: "Australia", icons: "au" },
  { label: "Austria", icons: "at" },
  { label: "Azerbaijan", icons: "az" },
  { label: "Bahamas", icons: "bs" },
  { label: "Bahrain", icons: "bh" },
  { label: "Bangladesh", icons: "bd" },
  { label: "Barbados", icons: "bb" },
  { label: "Belarus", icons: "by" },
  { label: "Belgium", icons: "be" },
  { label: "Belize", icons: "bz" },
  { label: "Benin", icons: "bj" },
  { label: "Bhutan", icons: "bt" },
  { label: "Bolivia", icons: "bo" },
  { label: "Bosnia and Herzegovina", icons: "ba" },
  { label: "Botswana", icons: "bw" },
  { label: "Brazil", icons: "br" },
  { label: "Brunei", icons: "bn" },
  { label: "Bulgaria", icons: "bg" },
  { label: "Burkina Faso", icons: "bf" },
  { label: "Burundi", icons: "bi" },
  { label: "Cabo Verde", icons: "cv" },
  { label: "Cambodia", icons: "kh" },
  { label: "Cameroon", icons: "cm" },
  { label: "Canada", icons: "ca" },
  { label: "Central African Republic", icons: "cf" },
  { label: "Chad", icons: "td" },
  { label: "Chile", icons: "cl" },
  { label: "China", icons: "cn" },
  { label: "Colombia", icons: "co" },
  { label: "Comoros", icons: "km" },
  { label: "Congo", icons: "cg" },
  { label: "Costa Rica", icons: "cr" },
  { label: "Croatia", icons: "hr" },
  { label: "Cuba", icons: "cu" },
  { label: "Cyprus", icons: "cy" },
  { label: "Czech Republic", icons: "cz" },
  { label: "Denmark", icons: "dk" },
  { label: "Djibouti", icons: "dj" },
  { label: "Dominica", icons: "dm" },
  { label: "Dominican Republic", icons: "do" },
  { label: "Ecuador", icons: "ec" },
  { label: "Egypt", icons: "eg" },
  { label: "El Salvador", icons: "sv" },
  { label: "Equatorial Guinea", icons: "gq" },
  { label: "Eritrea", icons: "er" },
  { label: "Estonia", icons: "ee" },
  { label: "Eswatini", icons: "sz" },
  { label: "Ethiopia", icons: "et" },
  { label: "Fiji", icons: "fj" },
  { label: "Finland", icons: "fi" },
  { label: "France", icons: "fr" },
  { label: "Gabon", icons: "ga" },
  { label: "Gambia", icons: "gm" },
  { label: "Georgia", icons: "ge" },
  { label: "Germany", icons: "de" },
  { label: "Ghana", icons: "gh" },
  { label: "Greece", icons: "gr" },
  { label: "Grenada", icons: "gd" },
  { label: "Guatemala", icons: "gt" },
  { label: "Guinea", icons: "gn" },
  { label: "Guinea-Bissau", icons: "gw" },
  { label: "Guyana", icons: "gy" },
  { label: "Haiti", icons: "ht" },
  { label: "Honduras", icons: "hn" },
  { label: "Hungary", icons: "hu" },
  { label: "Iceland", icons: "is" },
  { label: "India", icons: "in" },
  { label: "Indonesia", icons: "id" },
  { label: "Iran", icons: "ir" },
  { label: "Iraq", icons: "iq" },
  { label: "Ireland", icons: "ie" },
  { label: "Israel", icons: "il" },
  { label: "Italy", icons: "it" },
  { label: "Jamaica", icons: "jm" },
  { label: "Japan", icons: "jp" },
  { label: "Jordan", icons: "jo" },
  { label: "Kazakhstan", icons: "kz" },
  { label: "Kenya", icons: "ke" },
  { label: "Kiribati", icons: "ki" },
  { label: "Kuwait", icons: "kw" },
  { label: "Kyrgyzstan", icons: "kg" },
  { label: "Laos", icons: "la" },
  { label: "Latvia", icons: "lv" },
  { label: "Lebanon", icons: "lb" },
  { label: "Lesotho", icons: "ls" },
  { label: "Liberia", icons: "lr" },
  { label: "Libya", icons: "ly" },
  { label: "Liechtenstein", icons: "li" },
  { label: "Lithuania", icons: "lt" },
  { label: "Luxembourg", icons: "lu" },
  { label: "Madagascar", icons: "mg" },
  { label: "Malawi", icons: "mw" },
  { label: "Malaysia", icons: "my" },
  { label: "Maldives", icons: "mv" },
  { label: "Mali", icons: "ml" },
  { label: "Malta", icons: "mt" },
  { label: "Marshall Islands", icons: "mh" },
  { label: "Mauritania", icons: "mr" },
  { label: "Mauritius", icons: "mu" },
  { label: "Mexico", icons: "mx" },
  { label: "Micronesia", icons: "fm" },
  { label: "Moldova", icons: "md" },
  { label: "Monaco", icons: "mc" },
  { label: "Mongolia", icons: "mn" },
  { label: "Montenegro", icons: "me" },
  { label: "Morocco", icons: "ma" },
  { label: "Mozambique", icons: "mz" },
  { label: "Myanmar", icons: "mm" },
  { label: "Namibia", icons: "na" },
  { label: "Nauru", icons: "nr" },
  { label: "Nepal", icons: "np" },
  { label: "Netherlands", icons: "nl" },
  { label: "New Zealand", icons: "nz" },
  { label: "Nicaragua", icons: "ni" },
  { label: "Niger", icons: "ne" },
  { label: "Nigeria", icons: "ng" },
  { label: "North Korea", icons: "kp" },
  { label: "North Macedonia", icons: "mk" },
  { label: "Norway", icons: "no" },
  { label: "Oman", icons: "om" },
  { label: "Pakistan", icons: "pk" },
  { label: "Palau", icons: "pw" },
  { label: "Palestine", icons: "ps" },
  { label: "Panama", icons: "pa" },
  { label: "Papua New Guinea", icons: "pg" },
  { label: "Paraguay", icons: "py" },
  { label: "Peru", icons: "pe" },
  { label: "Philippines", icons: "ph" },
  { label: "Poland", icons: "pl" },
  { label: "Portugal", icons: "pt" },
  { label: "Qatar", icons: "qa" },
  { label: "Romania", icons: "ro" },
  { label: "Russia", icons: "ru" },
  { label: "Rwanda", icons: "rw" },
  { label: "Saint Kitts and Nevis", icons: "kn" },
  { label: "Saint Lucia", icons: "lc" },
  { label: "Saint Vincent and the Grenadines", icons: "vc" },
  { label: "Samoa", icons: "ws" },
  { label: "San Marino", icons: "sm" },
  { label: "Sao Tome and Principe", icons: "st" },
  { label: "Saudi Arabia", icons: "sa" },
  { label: "Senegal", icons: "sn" },
  { label: "Serbia", icons: "rs" },
  { label: "Seychelles", icons: "sc" },
  { label: "Sierra Leone", icons: "sl" },
  { label: "Singapore", icons: "sg" },
  { label: "Slovakia", icons: "sk" },
  { label: "Slovenia", icons: "si" },
  { label: "Solomon Islands", icons: "sb" },
  { label: "Somalia", icons: "so" },
  { label: "South Africa", icons: "za" },
  { label: "South Korea", icons: "kr" },
  { label: "South Sudan", icons: "ss" },
  { label: "Spain", icons: "es" },
  { label: "Sri Lanka", icons: "lk" },
  { label: "Sudan", icons: "sd" },
  { label: "Suriname", icons: "sr" },
  { label: "Sweden", icons: "se" },
  { label: "Switzerland", icons: "ch" },
  { label: "Syria", icons: "sy" },
  { label: "Tajikistan", icons: "tj" },
  { label: "Tanzania", icons: "tz" },
  { label: "Thailand", icons: "th" },
  { label: "Timor-Leste", icons: "tl" },
  { label: "Togo", icons: "tg" },
  { label: "Tonga", icons: "to" },
  { label: "Trinidad and Tobago", icons: "tt" },
  { label: "Tunisia", icons: "tn" },
  { label: "Turkey", icons: "tr" },
  { label: "Turkmenistan", icons: "tm" },
  { label: "Tuvalu", icons: "tv" },
  { label: "Uganda", icons: "ug" },
  { label: "Ukraine", icons: "ua" },
  { label: "United Arab Emirates", icons: "ae" },
  { label: "United Kingdom", icons: "gb" },
  { label: "United States", icons: "us" },
  { label: "Uruguay", icons: "uy" },
  { label: "Uzbekistan", icons: "uz" },
  { label: "Vanuatu", icons: "vu" },
  { label: "Vatican City", icons: "va" },
  { label: "Venezuela", icons: "ve" },
  { label: "Vietnam", icons: "vn" },
  { label: "Yemen", icons: "ye" },
  { label: "Zambia", icons: "zm" },
  { label: "Zimbabwe", icons: "zw" },
];

interface CitizenshipProps {
  onChange: (value: string) => void;
}

const CitizenshipSelect: FC<CitizenshipProps> = ({ onChange }) => {
  const t = useTranslations("booktour");
  const [citizenship, setCitizenship] = useState<{
    label: string;
    icons: string;
  }>({
    label: t("citizenship"),
    icons: "",
  });

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      <div
        onClick={() => setOpen(!open)}
        className="w-full border p-4 rounded-lg border-blue-500 outline-blue-700 cursor-pointer flex items-center gap-2"
      >
        {citizenship.icons.length !== 0 && (
          <span className={`fi fi-${citizenship.icons} mr-2`}></span>
        )}

        {citizenship.label}
      </div>

      {open && (
        <ul className="absolute bg-gray-100 rounded w-full top-16 max-h-60 overflow-y-auto shadow-md z-10">
          {countriesWithFlags.map((country, i) => (
            <li
              key={i}
              onClick={() => {
                setCitizenship({ label: country.label, icons: country.icons });
                setOpen(false);
                onChange(country.label); // parentga jo‘natamiz
              }}
              className="flex items-center gap-2 p-2 rounded hover:bg-blue-400/30 cursor-pointer"
            >
              <span className={`fi fi-${country.icons}`}></span>
              {country.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitizenshipSelect;
