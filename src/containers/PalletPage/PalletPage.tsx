import { Helmet } from "react-helmet-async";
import PalletFilter from "./PalletFilter";
import React, { FC } from "react";

export interface PageCollectionProps {
  className?: string;
}

const PalletPage: FC<PageCollectionProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Pallet Page || Global Path Liquidators</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          {/* <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Pallet collection
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              We not only help you design exceptional products, but also make it
              easy for you to share your designs with more like-minded people.
            </span>
          </div> */}

          {/* <hr className="border-slate-200 dark:border-slate-700" /> */}
          <main>
            <PalletFilter />
          </main>
        </div>
      </div>
    </div>
  );
};

export default PalletPage;
