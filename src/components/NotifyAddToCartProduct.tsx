import { Transition } from "@headlessui/react";
import Prices from "components/Prices";
import { PRODUCTS } from "data/data";
import { useGetSingleProductQuery } from "features/api/productApi";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import config from "utils/config";

interface Props {
  show: boolean;
  id: any;

}

const NotifyAddToCartProduct: FC<Props> = ({
  show,
  id
}) => {
  const data = useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });

  const productInfo = data?.data?.result;

  // console.log(productInfo)

  const renderProductCartOnNotify = () => {
    return (
      <div className="flex ">
        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`${config.PHOTO_URL}/${productInfo?.product_image}`}
            alt={productInfo?.product_name}
            className="h-full w-full object-contain object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{productInfo?.product_name}</h3>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-400 ">
                  <span>
                    {productInfo?.category_name}
                  </span>
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {productInfo?.condition_name}
                  </span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{productInfo?.store_name}</span>
                </p>
              </div>
              <Prices price={productInfo?.price} className="mt-0.5" />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div></div>

            <div className="flex">
              <Link
                to={"/cart"}
                className="font-medium text-primary-6000 dark:text-primary-500 "
              >
                View cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Transition
      appear
      show={show}
      className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
      enter="transition-all duration-150"
      enterFrom="opacity-0 translate-x-20"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-20"
    >
      <p className="block text-base font-semibold leading-none">
        Added to cart!
      </p>
      <hr className=" border-slate-200 dark:border-slate-700 my-4" />
      {renderProductCartOnNotify()}
    </Transition>
  );
};

export default NotifyAddToCartProduct;
