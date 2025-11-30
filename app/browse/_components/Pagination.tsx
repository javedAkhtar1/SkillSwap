"use client";

import { Button } from "@/components/ui/button";

export default function Pagination({ page, setPage, totalPages }: { page: number, setPage: (page: number) => void, totalPages: number }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <Button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40 text-black cursor-pointer"
      >
        Prev
      </Button>

      <span className="font-semibold">{page} / {totalPages}</span>

      <Button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40 text-black cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
}
