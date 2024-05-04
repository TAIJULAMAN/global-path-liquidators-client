import BagIcon from "components/BagIcon";
// import NotifyAddTocart from "components/NotifyAddTocart";
import Prices from "components/Prices";
import { PRODUCTS } from "data/data";
import React from "react";
import { Helmet } from "react-helmet-async";
// import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import TruckloadFilter from "./TruckloadFilter";
import TruckloadProducts from "./TruckloadProducts";

const TruckloadPage = ({ className = "" }) => {
  const navigate = useNavigate();

  //   const notifyAddTocart = (src: any) => {
  //     toast.custom(
  //       (t) => (
  //         <NotifyAddTocart
  //           productImage={src}
  //           qualitySelected={1}
  //           show={t.visible}
  //           sizeSelected={""}
  //           variantActive={0}
  //         />
  //       ),
  //       { position: "top-right", id: "nc-product-notify", duration: 3000 }
  //     );
  //   };
  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Truckload Page || Global Path Liquidators</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-6 space-y-16 sm:space-y-10 lg:space-y-10">
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
            <TruckloadFilter />
          </main>
        </div>
      </div>

    </div>
  );
};

export default TruckloadPage;
