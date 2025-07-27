import axios from "axios";

export const PaginationService = {
  async getData(page = 1, limit = 4, category: string) {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/${category}`,
      {
        params: { page, limit },
      }
    );
    return data;
  },
};
