import axios from "axios";

export const ServiceService = {
  async getAllServices() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/servic/all-servic`
    );
    return data;
  },
  async getService(id: string) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/servic/one-servic/${id}`
    );
    return data;
  },
  async createService(formData, token: string) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/servic/create-servic`,
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
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/servic/update-servic/${id}`,
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
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/servic/delete-servic/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createServiceOrder(formData) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/servic-order/create-order`,
      formData
    );
    return data;
  },
  async getRating(tourId: string, onModel: string) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/rating/get-rating-for-item`,
      { params: { itemId: tourId, onModel } }
    );
    return data;
  },
};
