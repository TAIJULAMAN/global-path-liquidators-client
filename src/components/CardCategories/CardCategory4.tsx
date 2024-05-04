import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import explore1Svg from "images/collections/explore1.svg";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export interface CardCategory4Props {
  className?: string;
  featuredImage?: string;
  bgSVG?: string;
  name: string;
  desc: string;
  color?: string;
}

const CardCategory4: FC<CardCategory4Props> = ({
  className = "",
  featuredImage = ".",
  bgSVG = explore1Svg,
  name,
  desc,
  color = "bg-rose-50",
}) => {
  return (
    <div
      className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
      data-nc-id="CardCategory4"
    >
      <div>
        <div className="absolute bottom-0 right-0 max-w-[280px] opacity-80">
          <img src={bgSVG} alt="" />
        </div>

        <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <NcImage
              src={featuredImage}
              containerClassName={`w-20 h-20 rounded-full overflow-hidden z-0 ${color}`}
            />
            <span className="text-xs text-slate-700 dark:text-neutral-300 font-medium">
              {Math.floor(Math.random() * 200 + 125)} products
            </span>
          </div>

          <div className="">
            <span
              className={`block mb-2 text-sm text-slate-500 dark:text-slate-400`}
            >
              {desc}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-semibold`}>{name}</h2>
          </div>

          <Link
            to={"/page-collection"}
            className="flex items-center text-sm font-medium group-hover:text-primary-500 transition-colors"
          >
            <span>See Collection</span>
            <ArrowRightIcon className="w-4 h-4 ml-2.5" />
          </Link>
        </div>
      </div>

      <Link to={"/page-collection"}></Link>
    </div>
  );
};

export default CardCategory4;
