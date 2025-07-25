"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { AdminInfo, Messages, NavbarAdmin } from "@/components/admin";

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true); // <-- Yangi loading flag

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
      <AdminInfo />
      <Messages />
    </div>
  );
}
