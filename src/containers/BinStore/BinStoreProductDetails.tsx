import BagIcon from "components/BagIcon";
import NcInputNumber from "components/NcInputNumber";
import NotifyAddToCartProduct from "components/NotifyAddToCartProduct";
import { PriceFormate } from "components/PriceFormate";
import Policy from "containers/ProductDetailPage/Policy";

import {
  useCreateCartItemsMutation,
  useGetCartItemsQuery,
} from "features/api/cartApi";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Swal from "sweetalert2";

export const notifyAddToCart = (id: any) => {
  toast.custom((t) => <NotifyAddToCartProduct show={t.visible} id={id} />, {
    position: "top-right",
    id: "nc-product-notify",
    duration: 3000,
  });
};

const BinStoreProductDetails = () => {
  // console.log(id);
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }
  const userId = userDetails?.user?.user_id;
  const { data: cart } = useGetCartItemsQuery(userId);
  const [createCartItem] = useCreateCartItemsMutation();
  const { bin } = useLocation()?.state;
  const { product_name, flat_rate, category_name, condition_name, store_name } =
    bin;

  const [qualitySelected, setQualitySelected] = React.useState(1);
  const navigate = useNavigate();

  const [duplicateMap, setDuplicateMap] = useState<Record<string, any>>({});

  useEffect(() => {
    // Initialize the state based on cart items on page load
    const initialDuplicateMap: Record<string, any> = {};
    cart?.result?.forEach((item: any) => {
      initialDuplicateMap[item.product_id] = item;
    });
    setDuplicateMap(initialDuplicateMap);
  }, [cart]);
  const addCart = (productId: any) => {
    if (userDetails) {
      handleAddtoCart(productId);
      notifyAddToCart(productId);
    } else {
      navigate("/login");
    }
  };
  const handleAddtoCart = async (productId: any) => {
    const duplicate = cart?.result?.find(
      (item: any) => item.product_id === productId
    );

    if (duplicate) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: "Item already added to cart",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      try {
        const user_id = userId;
        const product_id = productId;
        const deal_type_id = 1;

        const addItem = { user_id, product_id, deal_type_id };

        await createCartItem(addItem);
        // console.log(response);
        notifyAddToCart(productId);
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    }
  };

  const renderDetailSection = (details: any) => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          {details}
        </div>
      </div>
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-5 2xl:space-y-5">
        {/* name,price,review,cart button  */}
        <h2 className="text-2xl sm:text-3xl font-semibold">{product_name}</h2>

        {/* new price  */}
        <div className="flex items-center">
          <p className="flex items-center">
            <span className="font-semibold text-slate-800">Price:</span>
            <span className="ml-2 text-green-600 text-xl font-semibold">
              {PriceFormate(flat_rate)}
            </span>
          </p>
        </div>
        <div className="pb-3 px-3 bg-gray-200 rounded-md shadow-md">
          {/* categories */}
          <div className="flex items-center space-x-4 px-4 pt-4 pb-2">
            <p className="flex items-center">
              <span className="font-semibold text-slate-800">Catagories:</span>
              <span className="ml-2 text-green-600">{category_name}</span>
            </p>
          </div>
          {/* product condition */}
          <div className="flex items-center space-x-4 px-4 py-2">
            <p className="flex items-center">
              <span className="font-semibold text-slate-800">Condition:</span>
              <span className="ml-2 text-green-600">{condition_name}</span>
            </p>
          </div>
          {/* store */}
          <div className="flex items-center space-x-4 px-4 py-2">
            <p className="flex items-center">
              <span className="font-semibold text-slate-800">Store:</span>
              <span className="ml-2 text-green-600">{store_name}</span>
            </p>
          </div>
          {/* status  */}
        </div>

        {/*  quantity and cart button */}
        <div className="flex space-x-3.5">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
            className={`flex-1 flex-shrink-0 w-full rounded-lg ${
              duplicateMap[bin?.product_id] !== undefined
                ? "disabled opacity-50"
                : ""
            }`}
            onClick={() => {
              addCart(bin?.product_id);
            }}
            disabled={duplicateMap[bin?.product_id] !== undefined} // Disable the button if duplicate is found
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>
        {/*  */}
        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        {/* shipping,retun,delivery,refund */}
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={`nc-ProductDetailPage`}>
        {/* MAIN */}
        <main className="container mt-5 lg:mt-11">
          <div className="lg:flex">
            {/* CONTENT */}
            <div className="w-full  lg:w-[55%] ">
              {/* HEADING */}
              <div className="relative">
                {/* big */}
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={`https://darktechteam.com/api/${bin?.product_image}`}
                    className="w-full rounded-2xl object-cover"
                    alt="product detail 1"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[45%] pt-5 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              {renderSectionContent()}
            </div>
          </div>
          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            <div className="block xl:hidden">
              <Policy />
            </div>
            {renderDetailSection(bin?.product_desc)}
            <hr className="border-slate-200 dark:border-slate-700" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BinStoreProductDetails;
