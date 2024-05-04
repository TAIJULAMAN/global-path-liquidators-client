import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import images1 from "images/nfts/cat1.webp";

export interface CardCategory5Props {
  className?: string;
  featuredImage?: string;
  name: string;
  desc: string;
  index: number;
}

const COLORS = [
  "bg-pink-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
];

const CardCategory5: FC<CardCategory5Props> = ({
  className = "",
  featuredImage = images1,
  name,
  desc,
  index,
}) => {
  return (
    <Link
      to={"/page-collection"}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
      >
        <NcImage
          src={featuredImage}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 flex items-center">
        <div className={`w-10 h-10 rounded-full ${COLORS[index]}`}></div>
        <div className="ml-3">
          <h2
            className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
          >
            {name}
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400`}
          >
            Shop the Latest from Top Brands
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory5;
