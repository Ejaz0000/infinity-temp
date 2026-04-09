"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Gift, Star } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";
import Image from "next/image";

const MenuItem = ({ item, level, setIsMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between py-2 group ${
          level === 0 ? "mt-1" : ""
        }`}
      >
        <Link
          href={`/products?category=${item.slug}`}
          onClick={() => {
            if (hasChildren) {
            setIsOpen(!isOpen)
            }
        }}
          className="flex items-center gap-3 flex-1 no-underline"
        >
          {level === 0 && (
            <div className="w-6 h-6 shrink-0 relative flex items-center justify-center">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain rounded-full border-2 border-gray-400"
                  width={24}
                  height={24}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-sm" />
              )}
            </div>
          )}
          <span
            className={`transition-colors whitespace-normal leading-tight ${
              level === 0
                ? "text-gray-700 font-normal text-base hover:text-orange-500"
                : isOpen && level === 1
                ? "text-orange-500 font-semibold text-[15px]"
                : level === 1
                ? "text-gray-500 font-normal text-[15px] hover:text-orange-500"
                : "text-gray-500 font-normal text-[14px] hover:text-orange-500"
            }`}
          >
            {item.name}
          </span>
        </Link>

        {hasChildren && (
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-500 hover:text-orange-500 transition-colors shrink-0 bg-transparent border-none cursor-pointer"
            aria-label="Toggle Submenu"
          >
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        )}
      </div>

      {hasChildren && isOpen && (
        <div
          className={`flex flex-col ml-[11px] pl-4 border-l border-gray-400 transition-all ${
            level === 0 ? "mt-0" : "mt-0"
          }`}
        >
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              setIsMenuOpen={setIsMenuOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarMenu = ({ setIsMenuOpen }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Updated to typical axiosInstance setup, might need to adjust /categories or /api/categories if needed
        const { data } = await axiosInstance.get("/categories/");
        if (data?.status && data?.data) {
          const map = {};
          const roots = [];

          // Initialize map with empty children arrays
          data.data.forEach((cat) => {
            map[cat.slug] = { ...cat, children: [] };
          });

          // Build tree structure
          data.data.forEach((cat) => {
            if (cat.parent) {
              if (map[cat.parent]) {
                map[cat.parent].children.push(map[cat.slug]);
              }
            } else {
              roots.push(map[cat.slug]);
            }
          });

          console.log("Fetched Categories:", roots);

          setCategories(roots);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-white">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex gap-3 items-center animate-pulse">
            <div className="w-6 h-6 bg-gray-200 rounded-md shrink-0" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-4 py-3">
      <div className="border-b border-gray-300 pb-3 hidden md:block">
        <ul className="space-y-2">
          <li>
            <Link href="#" className="text-gray-700 font-normal text-base no-underline hover:text-orange-500">
              <Gift size={18} className="inline-block mr-2 text-gray-500" />
              <span>Offers</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-700 font-normal text-base no-underline hover:text-orange-500">
              <Star size={18} className="inline-block mr-2 text-gray-500" />
              <span>Rewards</span>
            </Link>
          </li>
        </ul>
      </div>
      {categories.map((category) => (
        <MenuItem
          key={category.id}
          item={category}
          level={0}
          setIsMenuOpen={setIsMenuOpen}
        />
      ))}
    </div>
  );
};

export default SidebarMenu;