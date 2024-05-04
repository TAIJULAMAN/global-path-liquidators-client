import React, { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import NcImage from "shared/NcImage/NcImage";
import { nftsAbstracts, personNames } from "contains/fakeData";
import VerifyIcon from "components/VerifyIcon";
import FollowButton from "components/FollowButton";
import Badge from "shared/Badge/Badge";

export interface CardAuthorBox4Props {
  className?: string;
  following?: boolean;
  authorIndex?: number;
}

const CardAuthorBox4: FC<CardAuthorBox4Props> = ({
  className = "",
  following,
  authorIndex,
}) => {
  return (
    <div
      className={`nc-CardAuthorBox4 relative flex flex-col overflow-hidden group bg-white dark:bg-neutral-800 group rounded-3xl hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="CardAuthorBox4"
    >
      <div className="relative flex-shrink-0 h-36">
        {authorIndex && (
          <Badge
            className="absolute top-2 left-3 !font-semibold"
            name={
              authorIndex === 1 ? `🏆 #${authorIndex}` : `🏅 #${authorIndex}`
            }
            color={
              authorIndex === 1 ? "red" : authorIndex === 2 ? "green" : "yellow"
            }
          />
        )}

        <NcImage
          containerClassName="flex h-full w-full flex-shrink-0 rounded-3xl overflow-hidden"
          src={nftsAbstracts[Math.floor(Math.random() * nftsAbstracts.length)]}
        />
      </div>

      <div className="pb-5 px-4 pt-1.5">
        <div className="text-center relative flex items-center justify-center ">
          <div className="relative">
            <svg
              className="mx-auto h-14 -mt-[38px] text-white dark:text-neutral-800 dark:group-hover:text-neutral-800"
              width="134"
              height="54"
              viewBox="0 0 134 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M101.734 19.8581C99.2658 17.4194 96.9737 14.8065 94.5052 12.1935C94.1526 11.671 93.6237 11.3226 93.0947 10.8C92.7421 10.4516 92.5658 10.2774 92.2131 9.92903C85.6895 3.83226 76.6974 0 67 0C57.3026 0 48.3105 3.83226 41.6105 9.92903C41.2579 10.2774 41.0816 10.4516 40.7289 10.8C40.2 11.3226 39.8474 11.671 39.3184 12.1935C36.85 14.8065 34.5579 17.4194 32.0895 19.8581C23.2737 28.7419 11.4605 30.4839 -0.176331 30.8323V54H16.3974H32.0895H101.558H110.197H134V30.6581C122.363 30.3097 110.55 28.7419 101.734 19.8581Z"
                fill="currentColor"
              />
            </svg>

            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
              <Avatar
                containerClassName=""
                sizeClass="w-12 h-12 text-2xl"
                radius="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between">
          <div>
            <h2 className={`text-base font-medium flex items-center`}>
              <span className="">
                {personNames[Math.floor(Math.random() * personNames.length)]}
              </span>
              <VerifyIcon />
            </h2>
            <span className={`block mt-0.5 text-sm `}>
              <span className="font-medium">12.321</span>
              <span className={`ml-1.5 text-neutral-500 dark:text-neutral-400`}>
                ETH
              </span>
            </span>
          </div>
          <FollowButton
            sizeClass="px-4 py-2 min-w-[84px]"
            isFollowing={following}
          />
        </div>
      </div>

      <Link to={"/page-author"} className="absolute inset-0"></Link>
    </div>
  );
};

export default CardAuthorBox4;
