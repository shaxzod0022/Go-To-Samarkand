"use client";
import { PaginationService } from "@/services/pagination.service";
import { styles } from "@/styles/styles";
import React, { FC, useEffect, useState } from "react";

interface LocalizedText {
  en: string;
  ru: string;
  ja: string;
  uz: string;
}

interface Service {
  _id: string;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  price: number;
  averageRating: number;
  startDate: string;
  endDate: string;
  childrenPrice: number;
  infantsPrice: number;
  duration: string;
  tourId: string;
}

interface Props {
  category: string;
  modal?: boolean;
  onDataChange: (data: Service[]) => void;
  setLoading: (value: boolean) => void;
}

const PaginationData: FC<Props> = ({
  category,
  onDataChange,
  setLoading,
  modal,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const pagData = async () => {
      setLoading(true);
      try {
        const data = await PaginationService.getData(page, 4, category);
        onDataChange(data.data);
        setTotalPages(data.totalPages);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    pagData();
  }, [page, category, modal]);

  return (
    <div className={`${styles.flexCenter} gap-3 mt-10`}>
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="bg-gray-300 px-5 py-1 hover:bg-gray-400 transition-all duration-150 active:bg-gray-200 rounded"
      >
        Prev
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="bg-gray-300 px-5 py-1 hover:bg-gray-400 transition-all duration-150 active:bg-gray-200 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationData;
