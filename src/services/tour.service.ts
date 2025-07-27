import axios from "axios";

export const TourService = {
  async getAllTours() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/tour/all-tour`
    );
    return data;
  },
  async getTour(id: string) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/tour/one-tour/${id}`
    );
    return data;
  },
  async createTour(formData, token: string) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/tour/create-tour`,
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
  async updateTour(formData, token: string, id: string) {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/tour/update-tour/${id}`,
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
  async deleteTour(id: string, token: string) {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/tour/delete-tour/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createTourOrder(formData) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/tour-order/create-order`,
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
