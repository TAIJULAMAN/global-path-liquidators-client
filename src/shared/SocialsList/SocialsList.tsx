import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import facebook from "images/socials/facebook.svg";
import twitter from "images/socials/twitter.svg";
import telegram from "images/socials/telegram.svg";
import youtube from "images/socials/youtube.svg";
import { useGetAllLinksQuery } from "features/api/settingsApi";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socials: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
  // socials = socialsDemo,
}) => {
  const { data: linksData } = useGetAllLinksQuery({
    refetchOnMountOrArgChange: true,
  });

  // console.log(linksData?.result)
  const resultData = linksData?.result;
  return (
    <div
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {resultData?.map((item: any, index: any) => {
        const social = socials.find(socialItem => socialItem?.name.toLowerCase() === item?.social_name.toLowerCase());
        if (social) {
          return (
            <a
              href={item?.social_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6"
              key={index}
            >
              <img src={social?.icon} alt="" className="w-5" />
            </a>

          );
        } else {
          return null;
        }
      })}
    </div >
  );
};

export default SocialsList;
