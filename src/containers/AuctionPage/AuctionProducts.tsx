import BagIcon from "components/BagIcon";
import { formatDate } from "components/FormateDate";
import { PriceFormate } from "components/PriceFormate";
import { PRODUCTS } from "data/data";
import { useGetAllAuctionDataQuery } from "features/api/auctionApi";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonCircle from "shared/Button/ButtonCircle";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import NcImage from "shared/NcImage/NcImage";
import config from "utils/config";

const AuctionProducts = () => {
  const navigate = useNavigate();

  const [perPage, setPerPage] = useState(16);
  const [page, setPage] = useState(1);

  // Construct queries object with updated perPage and page values
  const queries = {
    perPage: perPage, // Updated perPage value
    page: page, // Updated page value
  };

  const { data: products, isLoading } = useGetAllAuctionDataQuery(queries, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(products);

  const metaData = products?.meta;

  const metaPage = metaData?.page;

  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on the search query
  const filteredResults = products?.result?.filter((item: any) =>
    item?.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const auctionEndDate = new Date(products?.result[0]?.End_Time);
  // const Start_Time: string = auction?.result?.Start_Time;
  // function formatDate(dateString: any) {
  //   const date = new Date(dateString);
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   let getDate = day + "-" + month + "-" + year;
  //   return getDate;
  // }
  // formateDate()
  // const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  return (
    <>
      {filteredResults?.length !== 0 ? (
        <div>
          <div className="container mt-10">
            <header className="max-w-md mx-auto -mt-10 flex flex-col lg:-mt-7">
              <form
                className="relative w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Search all icons</span>
                  <Input
                    className="shadow-lg border-0 dark:border"
                    id="search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by product name"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    rounded="rounded-full"
                  />
                  <ButtonCircle
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                  >
                    <i className="las la-arrow-right text-xl"></i>
                  </ButtonCircle>
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 22L20 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </label>
              </form>
            </header>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8">
              {filteredResults?.map((item: any, index: any) => (
                // <ProductCard data={item} key={index} />
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
                          className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                        >
                          {item?.Title}
                        </p>
                      </div>
                      {/* <div className="flex justify-between items-center ">
                    <p
                      className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                    >
                      Number of Bids
                    </p>
                    <p
                      className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                    >
                      ${item?.Current_Bid}
                    </p>
                  </div> */}

                      <div className="flex justify-between items-center ">
                        <p
                          className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                        >
                          Current Bid
                        </p>
                        <p
                          className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                        >
                          {PriceFormate(item?.Current_Bid)}
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

                    {/* <div className="flex justify-center items-end ">
                            <Prices price={item.price} />
                            <div className="flex items-center mb-0.5">
                                <StarIcon className="w-5 h-5 pb-[1px] text-amber-400" />
                                <span className="text-sm ml-1 text-slate-500 dark:text-slate-400">
                                    {(Math.random() * 1 + 4).toFixed(1)} (
                                    {Math.floor(Math.random() * 70 + 20)} reviews)
                                </span>
                            </div>
                        </div> */}
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
            </div>
          )}

          {/* Pagination */}
          <nav className="flex items-center justify-end space-x-2 mt-5">
            <button
              className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
              disabled={metaPage === 1}
              onClick={(e) => setPage(page - 1)}
            >
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </button>

            <span className="rounded-lg bg-primary-200 p-3 inline-block">
              {metaPage}
            </span>

            <button
              className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
              onClick={() => setPage(page + 1)}
            >
              <span className="sr-only">Next</span>
              <span aria-hidden="true">»</span>
            </button>
          </nav>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-bold">No auction available for bid</p>
          <p className="text-gray-500">
            Show others categories{" "}
            <Link to="/">
              <span className="text-blue-500 hover:text-blue-800">
                continue
              </span>
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default AuctionProducts;
