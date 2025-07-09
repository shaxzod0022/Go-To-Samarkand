"use client";

import React, { useEffect, useState } from "react";
import Btn from "../Btn";
import axios from "axios";
import BackMessage from "../BackMessage";
import { useRouter } from "next/navigation";

interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
}

const AdminInfo = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [load, setLoad] = useState<boolean>(false);
  const [load2, setLoad2] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("adminData");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed) {
        setAdminData(parsed);
        setFormData({
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          email: parsed.email || "",
        });
      }
    } else {
      sessionStorage.removeItem("adminData");
      router.replace("/admin/login");
    }
  }, [load]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    const stored = sessionStorage.getItem("adminData");
    const { token, _id } = stored ? JSON.parse(stored) : {};

    try {
      const res = await axios.put(
        `https://gotosamarkand.onrender.com/api/admin/update-admin/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAdmin = res.data.admin;

      sessionStorage.setItem(
        "adminData",
        JSON.stringify({
          token,
          ...updatedAdmin,
        })
      );

      setSuccess("✅ Information updated!");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError("The data was not updated!");
      setTimeout(() => setError(null), 4000);
      console.log(err);
    } finally {
      setLoad(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad2(true);
    const stored = sessionStorage.getItem("adminData");
    const { token, _id } = stored ? JSON.parse(stored) : {};

    try {
      const res = await axios.put(
        `https://gotosamarkand.onrender.com/api/admin/update-password/${_id}`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPasswordData({ oldPassword: "", newPassword: "" });

      setSuccess(res.data.message);
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      let errorMessage = "Not found";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoad2(false);
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("adminData");
    router.replace("/admin/login");
  };

  return (
    <div className="mt-20 px-6 md:flex md:justify-between gap-8">
      <div className="md:w-1/2 bg-white md:p-10 p-5 rounded-md shadow-md mb-6 md:mb-0">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
          Admin information
        </h2>
        {adminData ? (
          <ul className="space-y-2 text-left text-gray-700 md:text-xl text-md">
            <li>
              <strong>First Name:</strong> {adminData.firstName}
            </li>
            <li>
              <strong>Last Name:</strong> {adminData.lastName}
            </li>
            <li>
              <strong>Email:</strong> {adminData.email}
            </li>
            <li className="mt-5">
              <Btn
                type="button"
                newClass="bg-red-600 hover:bg-red-400 active:bg-red-600"
                title="Log Out"
                onClick={logOut}
              />
            </li>
          </ul>
        ) : (
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-gray-400">
            Data not found!
          </h2>
        )}
      </div>

      <div className="md:w-1/2 bg-white md:p-10 p-5 rounded-md shadow-md space-y-6">
        <BackMessage
          successMessage={success}
          errorMessage={error}
          newClass="top-28"
        />
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Edit data
          </h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleFormChange}
              className="w-full border-2 border-blue-600 p-2 rounded-lg"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleFormChange}
              className="w-full border-2 border-blue-600 p-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full border-2 border-blue-600 p-2 rounded-lg"
            />
            <Btn disabled={load} type="submit" title="Save Data" />
          </form>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="text-lg font-semibold mb-4">Change password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full border-2 border-green-600 p-2 rounded-lg"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full border-2 border-green-600 p-2 rounded-lg"
            />
            <Btn type="submit" disabled={load2} title="Change Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
