import axios from "axios";

export const EventService = {
  async getAllEvents() {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/event/all-event`
    );
    return data;
  },
  async getEvent(id: string) {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/event/one-event/${id}`
    );
    return data;
  },
  async createEvent(formData, token: string) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/event/create-event`,
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
  async updateEvent(formData, token: string, id: string) {
    const { data } = await axios.put(
      `https://gotosamarkand.onrender.com/api/event/update-event/${id}`,
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
  async deleteEvent(id: string, token: string) {
    const { data } = await axios.delete(
      `https://gotosamarkand.onrender.com/api/event/delete-event/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createEventOrder(formData) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/event-order/create-order`,
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
