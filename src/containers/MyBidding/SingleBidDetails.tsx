import React from "react";
import image1 from "./image/2.png";
import { FC } from "react";
import BidPaymentPop from "./BidPaymentPop";

import { useGetSingleBidDetailsQuery } from "features/api/auctionApi";
import { useParams } from "react-router-dom";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}
const SingleBidDetails: FC<CommonLayoutProps> = () => {
  const { id } = useParams();
  const { data: singleBidDetails } = useGetSingleBidDetailsQuery(id)

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let getDate = day + '-' + month + '-' + year;
    return getDate;
  }
  return (
    <div className="nc-CommonLayoutProps container">
      <h1 className="my-5 text-3xl text-natural-900 font-bold uppercase">
        bidding details
      </h1>
      <div>
        {/* header card */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-2 bg-slate-50 dark:bg-slate-100">
          <div className="flex items-center justify-center space-x-1">
            <img
              className="w-24 h-24 space-x-4 rounded"
              src={`https://darktechteam.com/api/${singleBidDetails?.result[0]?.product_image}`}
              alt="productPic"
            />
            <div>
              {" "}
              <p className="text-lg font-semibold">#Bid-{id}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                <span>{formatDate(singleBidDetails?.result[0]?.created_at)}</span>
                <span className="mx-2">·</span>
                <span className="text-yellow-500">{singleBidDetails?.result[0]?.bidStatus}</span>
              </p>
              <p className="space-x-1">
                <span className="text-sm mt-1.5 sm:mt-2 text-slate-500 dark:text-slate-400">
                  {" "}
                  Bid Amount:
                </span>
                <span className="text-sm mt-1.5 sm:mt-2 text-slate-500 dark:text-blue-400">
                  ${singleBidDetails?.result[0]?.amount}
                </span>
              </p>
            </div>
          </div>
          <div className=" sm:justify-center sm:items-center mt-3 sm:mt-0 ml-40 mr-7 ">
            <button type="submit">

              <BidPaymentPop />
            </button>
          </div>
        </div>
        {/* bid status and details */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="flex justify-between flex-wrap  w-full">
              {/* progress bar */}
              <div className="lg:w-1/2 md:w-1/2 object-cover object-center  md:mt-0 mt-12">
                <div className=" p-5">
                  <h1 className="text-2xl sm:text-3xl font-semibold py-5">
                    Progress Bar :
                  </h1>

                  {/* Step 1 */}
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        Order Received
                      </h2>
                      <p className="leading-relaxed">
                        April 26, 2023 12.30 pm{" "}
                      </p>
                    </div>
                  </div>
                  {/* step 2 */}
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        Store has started packaging{" "}
                      </h2>
                      <p className="leading-relaxed">April 28, 2023 8.00 am</p>
                    </div>
                  </div>
                  {/* step 3 */}
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="5" r="3"></circle>
                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        Departed from the store{" "}
                      </h2>
                      <p className="leading-relaxed">April 29, 2023 05:31 am</p>
                    </div>
                  </div>
                  {/* step 4 */}
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        In transit to next facility.{" "}
                      </h2>
                      <p className="leading-relaxed">May 02, 2023 09:00 am</p>
                    </div>
                  </div>
                  {/* step 5 */}
                  <div className="flex relative">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                        Delivered{" "}
                      </h2>
                      <p className="leading-relaxed">May 02, 2023 11.00 am</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* details bar */}
              <div className="lg:w-1/2 md:w-1/2 object-cover object-center  md:mt-0 mt-12">
                <div className="p-5">
                  <h1 className="text-2xl sm:text-3xl font-semibold py-5">
                    Details Bar:
                  </h1>
                  <p><span className="font-bold"> Invoice No</span> :123456</p>
                  <p><span className="font-bold"> Location</span> :Your Location</p>
                  <p><span className="font-bold"> Date</span> :Delivery Date.</p>
                  <p><span className="font-bold"> Price</span> :Product Price</p>
                  <p><span className="font-bold"> Product Name</span>:burger</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleBidDetails;
