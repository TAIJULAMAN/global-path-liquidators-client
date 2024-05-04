import React from 'react';
import BagIcon from "components/BagIcon";
import NotifyAddToCartProduct from "components/NotifyAddToCartProduct";
import Prices from "components/Prices";
import {
    useCreateCartItemsMutation,
    useGetCartItemsQuery,
} from "features/api/cartApi";
import {
    useGetAllPalletDealsWithoutStateQuery,
} from "features/api/palletApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Heading from "shared/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import Swal from "sweetalert2";
import config from "utils/config";
import { useGetAllTruckloadsWithoutQueriesQuery } from 'features/api/truckloadApi';

const TruckloadDealsSection = () => {
    const navigate = useNavigate();

    let userDetails: any;
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString !== null) {
        userDetails = JSON.parse(userDetailsString);
    } else { }

    const { data: truckload, isLoading } = useGetAllTruckloadsWithoutQueriesQuery(undefined);
    // console.log(truckload);

    const truckloadProducts = truckload?.result;

    const userId = userDetails?.user?.user_id;
    const { data: cart } = useGetCartItemsQuery(userId);

    const addCart = (productId: any) => {
        if (userDetails) {
            handleAddToCart(productId);
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

    const handleAddToCart = async (productId: any) => {
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
                const product_quantity = "3";
                const deal_type_id = "2";

                const addItem = { user_id, product_id, product_quantity, deal_type_id };

                const response = await createCartItem(addItem);
                // console.log(response);
                notifyAddToCart(productId);
            } catch (error) {
                console.error("Error uploading product:", error);
            }
        }
    };
    return (
        <div className="nc-SectionGridFeatureItems relative">
            <Heading desc="Discover the most trending products.">Truckload Deals</Heading>
            <div
                className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
            > {
                    isLoading ? <div className="flex items-center justify-center h-screen">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                        </div>
                    </div> : <>
                        {truckloadProducts?.slice(0, 8).map((item: any, index: any) => (
                            <div
                                className={`nc-ProductCard relative flex flex-col bg-transparent border rounded-xl`}
                                data-nc-id="ProductCard"
                                key={index}
                            >
                                <Link
                                    to={`/truckload/product/details/${item?.truckload_id}`}
                                    className="absolute inset-0"
                                ></Link>
                                <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-xl overflow-hidden z-1 group">
                                    <Link
                                        to={`/truckload/product/details/${item?.truckload_id}`}
                                        className="block"
                                    >
                                        <NcImage
                                            containerClassName="flex aspect-w-8 aspect-h-8 w-full h-0 "
                                            src={`${config.PHOTO_URL}/${item?.product_image}`}
                                            className="object-cover w-full h-full drop-shadow-xl"
                                        />
                                    </Link>
                                </div>

                                <div className="space-y-4 px-3 pt-5 pb-2.5">
                                    <div className="flex justify-between items-start w-full ">
                                        <div>
                                            <h2
                                                className={`nc-ProductCard__title text-base font-semibold transition-colors `}
                                            >
                                                {item?.product_name}
                                            </h2>
                                        </div>
                                        <Prices price={item?.pallet_price} />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center ">
                                            <p
                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                            >
                                                Condition
                                            </p>
                                            <p
                                                className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                                            >
                                                {item?.condition_name || "NA"}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center ">
                                            <p
                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                            >
                                                Store
                                            </p>
                                            <p
                                                className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                                            >
                                                {item?.store_name || "NA"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className=" flex items-end p-3">
                                    <ButtonPrimary
                                        className="flex-1 flex-shrink-0 w-full rounded-lg"
                                    >
                                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                                        <span
                                            onClick={() => {
                                                addCart(item?.product_id);
                                            }}
                                            className="ml-3"
                                        >
                                            Add to cart
                                        </span>
                                    </ButtonPrimary>
                                </div>
                            </div>
                        ))}
                    </>
                }

            </div>
            <div className="flex mt-16 justify-center items-center">
                <ButtonPrimary
                    onClick={() => navigate("/truckload-page")}>Show me more</ButtonPrimary>
            </div>
        </div>
    );
};

export default TruckloadDealsSection;