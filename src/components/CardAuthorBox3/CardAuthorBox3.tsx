import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsAbstracts, personNames } from "contains/fakeData";
import VerifyIcon from "components/VerifyIcon";
import FollowButton from "components/FollowButton";

export interface CardAuthorBox3Props {
  className?: string;
  following?: boolean;
}

const CardAuthorBox3: FC<CardAuthorBox3Props> = ({
  className = "",
  following,
}) => {
  return (
    <div
      className={`nc-CardAuthorBox3 relative flex flex-col p-4 overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardAuthorBox3"
    >
      <div className="relative flex-shrink-0 flex space-x-2 h-24">
        <NcImage
          containerClassName="flex flex-grow h-full rounded-xl overflow-hidden"
          src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
        />
        <NcImage
          containerClassName="flex h-full w-24 flex-shrink-0 rounded-xl overflow-hidden"
          src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
        />
        <NcImage
          containerClassName="flex flex-grow h-full rounded-xl overflow-hidden"
          src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
        />
      </div>

      <div className="-mt-6">
        <div className="text-center">
          <Avatar
            containerClassName="ring-4 ring-white dark:ring-black !shadow-xl"
            sizeClass="w-12 h-12 text-2xl"
            radius="rounded-full"
          />
        </div>
        <div className="mt-2.5 flex items-start justify-between">
          <div>
            <h2 className={`text-base font-medium flex items-center`}>
              <span className="">
                {personNames[Math.floor(Math.random() * personNames.length)]}
              </span>
              <VerifyIcon />
            </h2>
            <span
              className={`block mt-0.5 text-sm text-neutral-500 dark:text-neutral-400`}
            >
              @creator
            </span>
          </div>
          <FollowButton isFollowing={following} />
        </div>
        <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          X-Metaverse is a Star Wars game based on NFT+ blockchain exploration,
          mining, trading ...
        </div>
      </div>

      <Link to={"/page-author"} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardAuthorBox3;
