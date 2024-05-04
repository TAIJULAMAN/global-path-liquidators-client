import React from "react";
import BagIcon from "components/BagIcon";
import { useGetAllAuctionDataQuery } from "features/api/auctionApi";
import { Link, useNavigate } from "react-router-dom";
import Heading from "shared/Heading/Heading";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import config from "utils/config";

const AuctionPageSection = () => {
    const navigate = useNavigate();
    const { data: products, isLoading } = useGetAllAuctionDataQuery(undefined);
    const auctionProducts = products?.result;

    function formatDate(dateString: any) {
        const date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let getDate = day + '-' + month + '-' + year;
        return getDate;
    }
    return (
        <div className="nc-SectionGridFeatureItems relative">
            <Heading desc="Discover the most trending products.">Auction</Heading>
            <div
                className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
            > {
                    isLoading ? <div className="flex items-center justify-center w-full ">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                        </div>
                    </div> : <>
                        {auctionProducts?.slice(0, 8).map((item: any, index: any) => (
                            <div
                                className={`nc-ProductCard relative flex flex-col bg-transparent border rounded-xl`}
                                data-nc-id="ProductCard"
                                key={item?.Auction_id}
                            >
                                <Link
                                    to={`/auction/product/details/${item?.Auction_id}`}
                                    className="absolute inset-0"
                                ></Link>

                                <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-xl overflow-hidden z-1 group">
                                    <Link
                                        to={`/auction/product/details/${item?.Auction_id}`}
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
                                    <div>
                                        <h2
                                            className={`nc-ProductCard__title text-base font-semibold transition-colors`}
                                        >
                                            {item.name}
                                        </h2>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center ">
                                            <p
                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                            >
                                                Number of Bids
                                            </p>
                                            <p
                                                className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                                            >
                                                12
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center ">
                                            <p
                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                            >
                                                Current Bid
                                            </p>
                                            <p
                                                className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                                            >
                                                ${item?.Current_Bid}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center ">
                                            <p
                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                            >
                                                Start Date
                                            </p>
                                            <p
                                                className={`text-sm text-red-500 font-semibold dark:text-red-500 mt-1 `}
                                            >
                                                {formatDate(item?.Start_Time)}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center ">
                                            <p
                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                            >
                                                End Date
                                            </p>
                                            <p
                                                className={`text-sm text-red-500 font-semibold dark:text-red-500 mt-1 `}
                                            >
                                                {formatDate(item?.End_Time)}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <Link
                                    to={`/auction/product/details/${item?.Auction_id}`}
                                    className="flex items-end p-2.5"
                                >
                                    <ButtonPrimary
                                        className="flex-1 flex-shrink-0 w-full rounded-lg"
                                        onClick={() =>
                                            navigate(`/auction/product/details/${item?.Auction_id}`)
                                        }
                                    >
                                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                                        <span className="ml-3">Bid Now</span>
                                    </ButtonPrimary>
                                </Link>
                            </div>
                        ))}
                    </>
                }

            </div>
            <div className="flex mt-16 justify-center items-center">
                <ButtonPrimary
                    onClick={() => navigate("/auction-page")}>Show me more</ButtonPrimary>
            </div>
        </div>
    );
};

export default AuctionPageSection;