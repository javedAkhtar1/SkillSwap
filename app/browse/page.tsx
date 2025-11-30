"use client"
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
      <div className="flex w-full">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search name / username / skill..."
          className="flex-1 border rounded-l-lg px-4 py-2 outline-none"
        />
        <button
          className="px-4 bg-primary-btn rounded-r-lg cursor-pointer hover:text-black hover:bg-primary-btn-hover text-white flex items-center gap-2"
          onClick={startSearch}
        >
          <Search size={17}/> Search
        </button>
      </div>

      {search && <p className="text-gray-600 text-sm">Showing results for <b>&quot;{search}&quot;</b></p>}
      {isError && <p className="text-red-500">Couldn&apos;t fetch users.</p>}

      <UserGrid users={users} loading={isLoading}/>
      <Pagination page={page} setPage={setPage} totalPages={totalPages}/>
    </div>
  );
}
