import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.svg";
import logoLightImg from "images/logo-light.svg";
import { useGetSettingsQuery } from "features/api/settingsApi";
import config from "utils/config";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className = "flex-shrink-0",
}) => {

  const { data: settings } = useGetSettingsQuery(undefined);

  const dynamicLogo = settings?.result?.gpl_logo;

  // console.log(settings)


  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          // className={`block max-h-8 sm:max-h-10 ${imgLight ? "dark:hidden" : ""
          //   }`}
          className={`block max-h-8 sm:max-h-10`}
          src={`${config.PHOTO_URL}/${dynamicLogo}`}
          alt="GPL Logo"
        />
      ) : (
        "GPL Logo"
      )}
      {/* {imgLight && (
        <img
          className="hidden max-h-8 sm:max-h-10 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )} */}
    </Link>
  );
};

export default Logo;
