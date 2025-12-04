"use client";

import { useState } from "react";
import { useGetAllUsers } from "@/tanstack-query/query";
import UserGrid from "./_components/UserGrid";
import Pagination from "./_components/Pagination";
import { Search } from "lucide-react";

export default function BrowsePage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetAllUsers(page, 12, search);
  const users = data?.data?.users ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const startSearch = () => {
    setPage(1);
    setSearch(searchInput.trim());
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Search bar */}
      <div className="flex w-full py-3">
        {/* make input able to shrink on small screens with min-w-0 */}
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search name / username / skill..."
          className="flex-1 min-w-0 border rounded-l-lg px-4 py-2 outline-none"
          aria-label="Search users"
        />

        {/* keep button from shrinking and make it compact on small screens */}
        <button
          onClick={startSearch}
          className="flex items-center gap-2 px-3 sm:px-4 bg-primary-btn rounded-r-lg cursor-pointer hover:text-black hover:bg-primary-btn-hover text-white flex-shrink-0 whitespace-nowrap"
          aria-label="Start search"
        >
          <Search size={17} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {search && (
        <p className="text-gray-600 text-sm">
          Showing results for <b>&quot;{search}&quot;</b>
        </p>
      )}
      {isError && <p className="text-red-500">Couldn&apos;t fetch users.</p>}

      <UserGrid users={users} loading={isLoading} />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
