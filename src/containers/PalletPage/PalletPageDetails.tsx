import BagIcon from "components/BagIcon";

import {
  useGetAllPalletDealsWithoutStateQuery,
  useGetPalletDealQuery,
  useGetPalletProductPhotosQuery,
} from "features/api/palletApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import config from "utils/config";

import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  useCreateCartItemsMutation,
  useGetCartItemsQuery,
} from "features/api/cartApi";
import NotifyAddToCartProduct from "components/NotifyAddToCartProduct";

import { HiOutlineDownload, HiOutlineEye } from "react-icons/hi";
import PalletSimilarProducts from "./PalletSimilarProducts";
import Swal from "sweetalert2";
import { PriceFormate } from "components/PriceFormate";
import { useGetDealBySignQuery } from "features/api/dealApi";

const PalletPageDetails = () => {
  const { id } = useParams();
  // console.log(id);

  const { data: palletDeal, isLoading } = useGetPalletDealQuery(id);
  // console.log(palletDeal?.result);
  const { data: photos, isLoading: imgLoading } =
    useGetPalletProductPhotosQuery(palletDeal?.result?.product_id);
  // console.log(photos?.result)
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }

  const userId = userDetails?.user?.user_id;
  const { data: cart } = useGetCartItemsQuery(userId);

  const filterId = cart?.result?.find(
    (item: any) => item?.product_id === palletDeal?.result?.product_id
  );
  // console.log(filterId);
  const navigate = useNavigate();

  const { data: dealTypeData, isLoading: dealTypeLoading } =
    useGetDealBySignQuery("pallet", {
      refetchOnMountOrArgChange: true,
    });

  const [dealInfo, setDealInfo] = useState<any>({});

  const deal_Id = dealInfo?.deal_type_id;

  useEffect(() => {
    if (!dealTypeLoading) {
      setDealInfo(dealTypeData?.result);
    }
  }, [dealTypeLoading, dealTypeData]);


  const addCart = (productId: any) => {
    if (userDetails) {
      handleAddtoCart(productId);
    } else {
      navigate("/login");
    }
  };
  const notifyAddToCart = (id: any) => {
    toast.custom((t) => <NotifyAddToCartProduct show={t.visible} id={id} />, {
      position: "top-right",
      id: "nc-product-notify",
      duration: 3000,
    });
  };
  const [createCartItem] = useCreateCartItemsMutation();

  const handleAddtoCart = async (productId: any) => {
    try {
      const user_id = userId;
      const product_id = productId;
      const product_quantity = "1";
      const deal_type_id = dealInfo?.deal_type_id;

      const addItem = { user_id, product_id, product_quantity, deal_type_id };

      const response = await createCartItem(addItem);
      // console.log(response);
      notifyAddToCart(productId);
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  const [offerPrice, setOfferPrice] = useState("");
  const handleChange = (event: any) => {
    // Update the state with the new value entered in the input field
    setOfferPrice(event.target.value);
  };

  //offer submit
  const handleOfferSubmit = () => {
    if (userDetails) {
      handleOffer();
    } else {
      navigate("/login");
    }
  };
  const handleOffer = async () => {
    try {
      const response = await fetch(
        "https://darktechteam.com/api/offers/makeOffer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: palletDeal?.result?.product_id,
            pallet_id: palletDeal?.result?.pallet_id,
            user_id: userId,
            offer_amount: offerPrice,
            deal_type_id: deal_Id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit offer");
      }

      const responseData = await response.json();
      // console.log("Response:", responseData);

      if (responseData.result?.insertId) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: "Offer added Successfully",
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
      }
      navigate('/pallet-page')

      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  //offer submit

  const renderMakeAnOffer = () => {
    return (
      <div className="relative">
        <Popover>
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`text-md w-full p-4 rounded-full text-white dark:text-slate-300 bg-green-500 hover:bg-green-700 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
              >
                Make an Offer
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 px-4 mt-3.5 left-0 sm:px-0">
                  <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative w-full bg-white dark:bg-neutral-800 p-5 space-y-5">
                      {/* <input className=" !rounded-r-none rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 "
                        type="text" />
                      <button className="cursor inline-flex items-center px-3 text-lg rounded-r-2xl border border-l-0 border-neutral-200 dark:border-neutral-700 bg-green-500 hover:bg-green-700 dark:bg-neutral-800 text-white">
                        send
                      </button> */}

                      <input
                        className="rounded"
                        type="text"
                        placeholder="offer price"
                        onChange={handleChange}
                      />
                      {/* <textarea
                        name="textarea"
                        className="rounded border w-full"
                        placeholder="short description"
                      ></textarea> */}
                      <button onClick={handleOfferSubmit} className="text-white rounded border px-3 bg-green-400 hover:bg-green-600 flex text-end">
                        Submit Offer
                      </button>

                      {/* <textarea name="postContent" /> */}

                      {/*                       
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700" /> */}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
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
                      src={`${config.PHOTO_URL}/${palletDeal?.result?.product_image}`}
                      className="w-full rounded-2xl object-cover"
                      alt="product detail 1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
                  <PhotoProvider>
                    {photos?.result
                      ?.slice(0, 3)
                      .map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16"
                          >
                            <PhotoView
                              src={`${config.PHOTO_URL}/${item?.image}`}
                            >
                              <img
                                src={`${config.PHOTO_URL}/${item?.image}`}
                                className="w-full rounded-2xl object-cover"
                                alt="product detail 1"
                              />
                            </PhotoView>
                          </div>
                        );
                      })}
                  </PhotoProvider>
                </div>
              </div>

              {/* sidebar:description */}
              <div className="w-full lg:w-[45%] pt-5 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
                <div className="space-y-5 2xl:space-y-5">
                  {/* name,price,review,cart button  */}
                  <h2 className="text-2xl sm:text-3xl font-semibold">
                    {palletDeal?.result?.product_name}
                  </h2>

                  {/* new price  */}
                  <div className="flex items-center">
                    <p className="flex items-center">
                      <span className="font-semibold text-slate-800">
                        Price:
                      </span>
                      <span className="ml-2 text-green-600 text-xl font-semibold">
                        {PriceFormate(palletDeal?.result?.pallet_price)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-justify">
                      {palletDeal?.result?.product_desc}
                    </p>
                  </div>
                  <div className="border rounded-md">
                    {/* categories */}
                    <div className="flex items-center justify-between space-x-4 px-4 pt-4 py-2">
                      <p className="font-semibold text-slate-800">
                        Category:
                      </p>
                      <p className="ml-2 text-green-600">
                        {palletDeal?.result?.category_name}
                      </p>
                    </div>
                    {/* product condition */}
                    <div className="flex items-center justify-between space-x-4 px-4 py-2">
                      <p className="font-semibold text-slate-800">
                        {" "}
                        Condition:
                      </p>
                      <p className="ml-2 text-green-600">
                        {palletDeal?.result?.condition_name}
                      </p>
                    </div>
                    {/* store */}
                    <div className="flex items-center justify-between space-x-4 px-4 py-2">
                      <p className="font-semibold text-slate-800">Store:</p>
                      <p className="ml-2 text-green-600">
                        {palletDeal?.result?.store_name}
                      </p>
                    </div>
                    {/* status  */}
                    <div className="flex items-center justify-between space-x-4 px-4 pt-2 pb-4">
                      <p className="font-semibold text-slate-800">Manifest:</p>
                      <div className="flex items-center">
                        {palletDeal?.result?.manifest_status == "1" ?
                          <div className="flex gap-2">
                            <Link to={`/manifest-details`}
                              className="text-dark bg-green-50 gap-1 dark:bg-gray-800 rounded-md p-1 border"
                              state={palletDeal?.result?.manifest_url}>
                              <HiOutlineEye />
                            </Link>

                            <button
                              className="text-dark bg-green-50 gap-1 dark:bg-gray-800 rounded-md p-1 border"
                              onClick={() => {
                                window.open(
                                  `${config.FRONTEND_API_URL}/${palletDeal?.result?.manifest_url}`,
                                  "_blank"
                                );
                              }}
                            >
                              <HiOutlineDownload />
                            </button>

                            <Link to={`/manifest-details`}
                              state={palletDeal?.result?.manifest_url}>
                              <p className="text-green-600 hover:text-blue-400 underline">Manifested</p>
                            </Link>
                          </div > : <p className="text-green-600">Unmanifested</p>
                        }

                      </div>
                    </div>
                  </div>

                  {/*  offer button */}
                  {/* {
                      palletDeal?.result?.allow_offers == '1' ?
                        <div className="mt-1.5 flex">
                          <Input
                            type="text"
                            className="w-1/2 !rounded-r-none"
                            placeholder="offer price"
                          />
                          <div className="w-1/2 cursor flex justify-center items-center rounded-r-2xl border border-l-0 border-neutral-200 dark:border-neutral-700 bg-green-50 dark:bg-green-200 text-green-500 text-sm font-semibold">
                            Make an offer
                          </div>
                        </div> : <></>
                    } */}

                  {/*  cart button */}
                  <div className="flex space-x-3.5">
                    {palletDeal?.result?.allow_offers == "1" ? (
                      <div>{renderMakeAnOffer()}</div>
                    ) : (
                      <></>
                    )}

                    <ButtonPrimary
                      className={`flex-1 flex-shrink-0 ${!filterId ? "bg-gray-800" : "opacity-50"
                        }`}
                      // onClick={notifyAddTocart}
                      disabled={filterId ? true : false}
                      onClick={() => {
                        addCart(palletDeal?.result?.product_id);
                      }}
                    >
                      <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                      <span
                        className="ml-3"
                      >
                        {!filterId ? "Add to cart" : "Added"}
                      </span>
                    </ButtonPrimary>
                  </div>
                  {/*  */}
                  {/* <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr> */}
                </div>
              </div>
            </div>

            {/* product detail */}
            {palletDeal?.result?.pallet_information ? (
              <div className="my-12 sm:mt-16 space-y-10 sm:space-y-16 w-full">
                <hr className="border-slate-200 dark:border-slate-700" />
                <div className="text-justify">
                  <h2 className="text-2xl font-semibold">Product Details</h2>
                  <div className="mt-7">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: palletDeal?.result?.pallet_information,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </main>
          {/* {
            palletDeal?.result && <PalletSimilarProducts palletDeal={palletDeal?.result} />
          } */}

        </div >
      )}
    </div >
  );
};

export default PalletPageDetails;
