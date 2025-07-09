"use client";
import React, { useState } from "react";
import axios from "axios";

interface OrderStatusManagerProps {
  orderId: string;
  initialStatus: "pending" | "confirmed" | "completed" | "cancelled";
  orderType: "event" | "tour" | "servic";
}

const OrderStatusManager: React.FC<OrderStatusManagerProps> = ({
  orderId,
  initialStatus,
  orderType,
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as typeof status;
    setLoading(true);
    try {
      const stored = sessionStorage.getItem("adminData");
      const { token } = stored ? JSON.parse(stored) : {};

      await axios.put(
        `https://gotosamarkand.onrender.com/api/${orderType}-order/update-order/${orderId}`,
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus(newStatus);
      setMessage("Order status updated successfully.");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update order status.");
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-blue-500 rounded-lg shadow w-full">
      <h2 className="text-xl font-semibold mb-3">Manage Order Status</h2>
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium">Order Status:</label>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={loading}
          className="border border-blue-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {message && (
        <div
          className={`mt-3 p-2 rounded text-sm ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default OrderStatusManager;
