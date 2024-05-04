import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import facebook from "images/socials/facebook.svg";
import twitter from "images/socials/twitter.svg";
import telegram from "images/socials/telegram.svg";
import youtube from "images/socials/youtube.svg";
import { useGetAllLinksQuery } from "features/api/settingsApi";

export interface SocialsList1Props {
  className?: string;

}
type DataRecord = Record<string, any>;
type UserRecord = Record<string, any>;

const socials: SocialType[] = [
  { name: "Facebook", icon: facebook, href: "#" },
  { name: "Youtube", icon: youtube, href: "#" },
  { name: "Telegram", icon: telegram, href: "#" },
  { name: "Twitter", icon: twitter, href: "#" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {

  const { data: linksData } = useGetAllLinksQuery({
    refetchOnMountOrArgChange: true,
  });

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userId = userDetails?.user?.user_id;



  const resultData = linksData?.result;

  const handleClicks = async (social_link_id: any) => {
    try {
      let data: DataRecord = {};
      let datas: DataRecord = {};
  
      // Handle different cases based on social_link_id
      if (social_link_id === 1) {
        data.facebook_clicks = 1;
      } else if (social_link_id === 2) {
        data.twitter_clicks = 1;
      } else if (social_link_id === 3) {
        data.youtube_clicks = 1;
      } else if (social_link_id === 4) {
        data.telegram_clicks = 1;
      }
  
      // console.log(data);
  
      if (userId) {
        datas.user_id = userId;
      }
  
      // console.log(datas);
  
      // Merge data and datas into a single object
      const requestData = { ...data, ...datas };
  
      const response = await fetch(
        `https://darktechteam.com/api/social_clicks/newClick`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // specify content type
          },
          body: JSON.stringify(requestData), // convert object to JSON string
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      // console.log("check", responseData.result);
  
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };
  
  
  
  


  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      <div >
        {resultData?.map((item: any, index: any) => {
          const social = socials?.find(socialItem => socialItem?.name?.toLowerCase() === item?.social_name?.toLowerCase());
          if (social) {
            return (
              <a
                href={item?.social_link} target="blank"
                className="flex mt-2 items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
                key={index}
                onClick={() => {
                  handleClicks(item?.social_link_id);
                }}
              >
                <div className="flex-shrink-0 w-5">
                  <img src={social?.icon} alt="" />
                </div>
                <span className="hidden lg:block text-sm">{item?.social_name}</span>
              </a>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default SocialsList1;
