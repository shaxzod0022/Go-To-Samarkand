import axios from "axios";

export const PaginationService = {
  async getData(page = 1, limit = 4, category: string) {
    const { data } = await axios.get(
      `https://gotosamarkand.onrender.com/api/${category}`,
      {
        params: { page, limit },
      }
    );
    return data;
  },
};
