"use client";
import { NavbarAdmin, OrderTour, Tours } from "@/components/admin";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TourPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true); // <-- Yangi loading flag

  useEffect(() => {
    const jsonData = sessionStorage.getItem("adminData");

    if (!jsonData) {
      router.replace("/admin/login");
      return;
    }

    try {
      const { token } = JSON.parse(jsonData);
      if (!token) throw new Error("No token");

      const { exp } = jwtDecode<{ exp: number }>(token);
      const now = Date.now() / 1000;

      if (exp < now) {
        sessionStorage.removeItem("adminData");
        router.replace("/admin/login");
        return;
      }

      setLoading(false); // Token bor, sahifani ko‘rsatish mumkin
    } catch (err) {
      sessionStorage.removeItem("adminData");
      router.replace("/admin/login");
    }
  }, [pathname]);

  // Sahifa hali tekshirilmay turib UI-ni ko‘rsatmaslik
  if (loading) return null;
  return (
    <div className="text-center">
      <NavbarAdmin />
      <Tours />
      <OrderTour />
    </div>
  );
};

export default TourPage;
