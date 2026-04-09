"use client";

import { useDebounced } from "@/hooks/useDebounced";
import { axiosInstance } from "@/utils/axiosInstance";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBar = ({ placeholder = "Search Products" }) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounced(searchText, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const getSearchResults = async () => {
    router.push(`/products?search=${debouncedSearch}`);
  };

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      getSearchResults();
    }
  }, [debouncedSearch]);

  return (
    <div
      className="relative w-full flex justify-end"
      tabIndex={1}
      onBlur={(e) => {
        // Only hide results if focus is moving outside the component
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowResults(false);
        }
      }}
      onFocus={() => setShowResults(true)}
    >
      <div className="flex items-center gap-4 bg-gray-100 rounded-lg w-full max-w-full">
        <div className="pl-4 cursor-pointer">
          <Search className="text-gray-500" size={20} />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent border-none outline-none text-base w-full text-gray-700 py-3 px-4 rounded-lg placeholder-gray-500"
        />
        {
          debouncedSearch.trim() !== "" && (
            <button
              onClick={() => {
                setSearchText("")
                router.push('/products')
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors pr-4"
            >
              <X size={20} />
            </button>
          )
        }
        
      </div>

      
    </div>
  );
};

export default SearchBar;
