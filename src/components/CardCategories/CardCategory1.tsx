import { _getImgRd, _getTagNameRd } from "contains/fakeData";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";

export interface CardCategory1Props {
  className?: string;
  size?: "large" | "normal";
  featuredImage?: string;
  name?: string;
  desc?: string;
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  name = "",
  desc = "",
  featuredImage = "",
}) => {
  return (
    <NavLink
      to={"#"}
      className={`nc-CardCategory1 flex items-center ${className}`}
      data-nc-id="CardCategory1"
    >
      <NcImage
        containerClassName={`flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg mr-4 overflow-hidden`}
        src={featuredImage || _getImgRd()}
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 font-semibold`}
        >
          {name || _getTagNameRd()}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {desc || `${Math.floor(Math.random() * 50) + 10} Articles`}
        </span>
      </div>
    </NavLink>
  );
};

export default CardCategory1;
