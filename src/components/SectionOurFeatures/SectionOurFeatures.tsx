import React, { FC } from "react";
import rightImg from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "py-14",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col lg:flex-row items-center ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div className="max-w-2xl flex-shrink-0 mb-10 lg:mb-0 lg:pl-16 lg:w-2/5">
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          BENnefits
        </span>
        <h2 className="font-semibold text-4xl mt-5">Happening cities </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Advertising" />
            <span className="block text-xl font-semibold">
              Cost-effective advertising
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              With a free listing, you can advertise your rental with no upfront
              costs
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Exposure " />
            <span className="block text-xl font-semibold">
              Reach millions with Chisfis
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Millions of people are searching for unique places to stay around
              the world
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Secure" />
            <span className="block text-xl font-semibold">
              Secure and simple
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
