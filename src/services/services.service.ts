import axios from "axios";

export const ServiceService = {
  async getAllServices() {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/servic/all-servic`
    );
    return data;
  },
  async getService(id: string) {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/servic/one-servic/${id}`
    );
    return data;
  },
  async createService(formData, token: string) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/servic/create-servic`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
  async updateService(formData, token: string, id: string) {
    const { data } = await axios.put(
      `https://gotosamarkand.onrender.com/api/servic/update-servic/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
  async deleteService(id: string, token: string) {
    const { data } = await axios.delete(
      `https://gotosamarkand.onrender.com/api/servic/delete-servic/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createServiceOrder(formData) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/servic-order/create-order`,
      formData
    );
    return data;
  },
  async getRating(tourId: string, onModel: string) {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/rating/get-rating-for-item`,
      { params: { itemId: tourId, onModel } }
    );
    return data;
  },
};
