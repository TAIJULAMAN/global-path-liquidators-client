import FollowButton from "components/FollowButton";
import VerifyIcon from "components/VerifyIcon";
import { _getPersonNameRd } from "contains/fakeData";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";

export interface CardAuthorBoxProps {
  className?: string;
  index?: number;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({ className = "", index }) => {
  return (
    <Link
      to={"/page-author"}
      className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardAuthorBox"
    >
      {index && (
        <Badge
          className="absolute left-3 top-3"
          color={index === 1 ? "red" : index === 2 ? "blue" : "green"}
          name={`#${index}`}
        />
      )}
      <Avatar sizeClass="w-20 h-20 text-2xl" radius="rounded-full" />
      <div className="mt-3">
        <h2 className={`text-base font-semibold flex items-center`}>
          {_getPersonNameRd()}
          <VerifyIcon />
        </h2>
        <div className={`mt-1 text-sm font-medium`}>
          <span>1.549</span>
          {` `}
          <span className="text-neutral-400 font-normal">ETH</span>
        </div>
      </div>
      <FollowButton className="mt-3" />
    </Link>
  );
};

export default CardAuthorBox;
