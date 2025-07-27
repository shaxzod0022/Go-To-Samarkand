import axios from "axios";

export const TourService = {
  async getAllTours() {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/tour/all-tour`
    );
    return data;
  },
  async getTour(id: string) {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/tour/one-tour/${id}`
    );
    return data;
  },
  async createTour(formData, token: string) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/tour/create-tour`,
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
      `https://gotosamarkand.onrender.com/api/tour/update-tour/${id}`,
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
      `https://gotosamarkand.onrender.com/api/tour/delete-tour/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createTourOrder(formData) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/tour-order/create-order`,
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
