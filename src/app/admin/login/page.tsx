"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { BackMessage, Btn } from "@/components";

export default function AdminLogin() {
  const router = useRouter();
  const [value, setValue] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [succes, setSuccess] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    try {
      const res = await axios.post(
        "https://gotosamarkand.onrender.com/api/admin/login-admin",
        value
      );

      setSuccess("Successful login");
      setTimeout(() => {
        setSuccess(null);
      }, 4000);
      sessionStorage.setItem("adminData", JSON.stringify(res.data));
      router.replace("/admin");
    } catch (err) {
      setError("Email or password incorrect!");
      setTimeout(() => {
        setError(null);
      }, 4000);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-1/2 max-w-md sm:w-auto w-[95%] mx-auto p-4 bg-white shadow-lg rounded">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full border border-blue-500 px-3 py-2 rounded-lg outline-none "
            value={value.email}
            required
            onChange={(e) => setValue({ ...value, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-blue-500 px-3 py-2 rounded-lg outline-none "
            value={value.password}
            required
            onChange={(e) => setValue({ ...value, password: e.target.value })}
          />
          <Btn
            type="submit"
            disabled={load}
            title="Login"
            newClass="w-full text-lg"
          />
        </form>
      </div>
      <BackMessage successMessage={succes} errorMessage={error} />
    </>
  );
}
