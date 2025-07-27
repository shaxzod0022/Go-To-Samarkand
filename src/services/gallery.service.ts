import axios from "axios";

export const GalleryService = {
  async getAllGallerys() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/gallery/all-gallery`
    );
    return data;
  },
  async getGallery(id: string) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/gallery/one-gallery/${id}`
    );
    return data;
  },
  async createGallery(formData, token: string) {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/gallery/gallery-create`,
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
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/gallery/update-gallery/${id}`,
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
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/gallery/delete-gallery/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  },
};
