import axios from "axios";

export const EventService = {
  async getAllEvents() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/event/all-event`
    );
    return data;
  },
  async getEvent(id: string) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/event/one-event/${id}`
    );
    return data;
  },
  async createEvent(formData, token: string) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/event/create-event`,
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
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/event/update-event/${id}`,
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
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/event/delete-event/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
  async createEventOrder(formData) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/event-order/create-order`,
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
