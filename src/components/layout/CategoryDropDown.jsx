import React from "react";
import ImageComponent from "../shared/ImageComponent";
import Link from "next/link";

const CategoryDropDown = ({
  selectedCollection,
  categories,
  onSidebarClose,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <ImageComponent
          src={selectedCollection?.image}
          alt={selectedCollection?.name}
          className="w-full h-49 md:h-52 object-cover"
        />
      </div>

      <div className="col-span-3">
        <p className="hidden md:block text-lg text-gray-800 font-semibold mb-2">
          {selectedCollection?.name}
        </p>
        <p className="hidden md:block text-sm text-gray-600">
          {selectedCollection?.description}
        </p>

        <div className="mt-4">
          <ul className="flex flex-col gap-3 max-h-[170px] md:max-h-[150px] overflow-scroll md:overflow-visible md:flex-wrap">
            {categories
              .filter(
                (category) => category.collection === selectedCollection?.slug,
              )
              .map((category) => (
                <li
                  key={category.id}
                  className="text-sm text-white md:text-gray-600"
                >
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="hover:text-gray-800 transition-colors flex items-center gap-2 md:gap-1 border-b border-gray-200 hover:border-gray-400"
                    onClick={() => {
                      if (onSidebarClose) {
                        onSidebarClose();
                      }
                    }}
                  >
                    <ImageComponent
                      src={category.image}
                      alt={category.name}
                      className="w-6 h-6 object-cover"
                    />
                    {category.name}
                  </Link>
                </li>
              ))}
          </ul>

          {categories.filter(
            (category) => category.collection === selectedCollection?.slug,
          ).length === 0 && (
            <div className="text-sm text-gray-600">No categories found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropDown;
