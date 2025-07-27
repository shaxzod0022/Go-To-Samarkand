import axios from "axios";

export const GalleryService = {
  async getAllGallerys() {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/gallery/all-gallery`
    );
    return data;
  },
  async getGallery(id: string) {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/gallery/one-gallery/${id}`
    );
    return data;
  },
  async createGallery(formData, token: string) {
    const { data } = await axios.post(
      `https://gotosamarkand.onrender.com/api/gallery/gallery-create`,
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
  async updateGallery(formData, token: string, id: string) {
    const { data } = await axios.put(
      `https://gotosamarkand.onrender.com/api/gallery/update-gallery/${id}`,
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
  async deleteGallery(id: string, token: string) {
    const { data } = await axios.delete(
      `https://gotosamarkand.onrender.com/api/gallery/delete-gallery/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
};
