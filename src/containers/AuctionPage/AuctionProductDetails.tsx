import { PRODUCTS } from "data/data";
import React, { useEffect, useState } from "react";

import { ClockIcon } from "@heroicons/react/24/outline";
import BagIcon from "components/BagIcon";

import Input from "shared/Input/Input";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllBidHistoryQuery,
  useGetAuctionDetailsQuery,
  useGetAuctionProductPhotosQuery,
  useGetSingleUserBidHistoryQuery,
  useUpdateAuctionMutation,
  useUpdateBidMutation,
} from "features/api/auctionApi";
import config from "utils/config";
import Swal from "sweetalert2";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { formatDate } from "components/FormateDate";
import { PriceFormate } from "components/PriceFormate";

const AuctionProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const { data: auction, refetch: refetchAuctionDetails } = useGetAuctionDetailsQuery(id);

  const auctioData = auction?.result;

  const initialBid = auctioData?.Bid_Increment ? auctioData?.Bid_Increment : 0;



  // console.log(auctioData)

  // const End_Time: string = auction?.result?.End_Time;

  // const Start_Time: string = auction?.result?.Start_Time;

  // const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const Start_Time = new Date(auction?.result?.Start_Time);
  const End_Time = new Date(auction?.result?.End_Time);

  const calculateRemainingTime = () => {
    const currentTime = new Date();
    let timeDiff: number = Math.max(
      End_Time.getTime() - currentTime.getTime(),
      0
    );

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= minutes * 1000 * 60;

    const seconds = Math.floor(timeDiff / 1000);

    return { hours, minutes, seconds };
  };
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      if (newRemainingTime !== remainingTime) {
        setRemainingTime(newRemainingTime);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [End_Time, Start_Time, remainingTime]);


  // console.log(remainingTime.seconds)
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {

  }
  const userId = userDetails?.user?.user_id;

  //Bid History
  const { data: bidHistory, isLoading: isBidHistoryLoading } = useGetAllBidHistoryQuery(
    auction?.result?.Auction_id
  );


  const highestBid =
    bidHistory?.result?.length > 0
      ? bidHistory?.result?.map((item: any) => item?.amount)
      : [];



  const currentBid = highestBid?.length > 0 ? Math.max(...highestBid) : 0;
  // console.log(initialBid)
  // console.log(currentBid)
  //State for input
  const [inputBid, setInputBid] = useState(currentBid === 0  &&  initialBid === 0 ? (auction?.result?.Starting_Price + 1) : Number(currentBid + initialBid));

  useEffect(() => {
    setInputBid(auctioData?.Current_Bid === 0 && initialBid === 0 ? (auction?.result?.Starting_Price + 1) : (currentBid === 0) ? (auction?.result?.Starting_Price + initialBid) : (currentBid + initialBid));
  }, [currentBid, auction?.result?.Starting_Price, initialBid, auctioData?.Current_Bid]);

  // console.log(inputBid)

  // increment
  const handleIncrement = () => {
    if (initialBid === 0) {
      setInputBid((prevValue: any) => +prevValue + 1)
    }
    else { setInputBid((prevValue: any) => +prevValue + +initialBid) }
  };

  const handleDecrement = () => {
    if (initialBid === 0) {
      setInputBid((prevValue: any) => +prevValue - 1)
    }
    else { setInputBid((prevValue: any) => +prevValue - +initialBid) }
  };
  const addBid = () => {
    if (userDetails) {
      handleBid();
    } else {
      localStorage.setItem("require", window.location.pathname);
      navigate("/login");
    }
  };
  // console.log(inputBid)
  const handleBid = async () => {
    if (remainingTime?.seconds === 0) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Bid time has expired`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    }

    else if (currentBid === 0 && initialBid === 0 && inputBid < auction?.result?.Starting_Price) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please enter an amount greater than $${+auction?.result?.Starting_Price
          }.`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
      setErrorMessage(
        `Bid amount: Minimum $${+auction?.result?.Starting_Price
        }.`
      );
      return;
    }
    else if (inputBid <= currentBid) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please enter an amount greater than $${+currentBid
          }.`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
      setErrorMessage(
        `Bid amount: Minimum $${+currentBid + 1
        }.`
      );
      return;
    }

    else {
      navigate(`/bid-checkout/${id}/${inputBid}`);
    }
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    // console.log(value);
    setInputBid(value);

    // Clear error message when the input becomes valid
    if (value > auction?.result?.Starting_Price) {
      setErrorMessage("");
    }
  };
  //  Fetch Mulitple Image 
  const { data: photos, isLoading: imgLoading } =
    useGetAuctionProductPhotosQuery(auction?.result?.product_id);

  /// find individual Bid History
  const singleBidHistory = bidHistory?.result?.filter((item: any) => item?.user_id === userId);

  const bidId = bidHistory?.result?.find((item: any) => item?.user_id === userId);
  // console.log(bidId)
  //handleUpdateBit
  const [updateAuction] = useUpdateAuctionMutation();
  const [updateBid] = useUpdateBidMutation();
  const handelUpdateBid = async () => {
    if (inputBid <= currentBid) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Updated bid amount is less than the current bid amount`,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      try {

        const response: any = await updateBid({
          id: bidId?.id,
          amount: inputBid,
        });
        // console.log(response);

        if (response) {
          Swal.fire({
            icon: "success",
            text: "Bid successfully updated",
          });
          await updateAuction({
            id: id,
            highest_bidder: userId,
            Current_Bid: inputBid,
          })
          // .then((response: any) => console.log(response))
          // .catch((error: any) => console.log(error));
          refetchSingleUserBidHistory()
          refetchAuctionDetails()
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  //Singe user Bid History 

  const { data: singleUserBidHistory, refetch: refetchSingleUserBidHistory } = useGetSingleUserBidHistoryQuery(bidId?.id);

  // console.log(singleBidHistory)
  const renderBidHistory = () => {
    return (
      <div>
        <div className="mb-3 text-xl font-bold">Bid History </div>
        <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
          <div className="min-w-full overflow-x-auto rounded-lg">
            <table
              className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg "
            >
              <thead className=" bg-gray-100 dark:bg-gray-800 rounded-lg ">


                <th
                  scope="col"
                  className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase"
                >
                  Bid Price
                </th>
                <th
                  scope="col"
                  className="px-5 text-right font-bold text-dark dark:text-white  py-6 text-xs uppercase"
                >
                  Date
                </th>
              </thead>
              <tbody>
                {singleUserBidHistory?.result
                  ? [...singleUserBidHistory?.result]
                    .sort((a: any, b: any) => b?.amount - a?.amount)
                    .slice(0, 10).map((item: any, key: any) => (
                      <tr key={key}
                        className="border-b border-gray-200 dark:border-gray-700"
                      >

                        <td
                          scope="row"
                          className="px-5 text-center py-4 whitespace-nowrap text-sm font-semibold  text-blue-500 "
                        >
                          {PriceFormate(item?.amount)}
                        </td>
                        <td
                          scope="row"
                          className="px-5 text-right py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                        >
                          {formatDate(item?.bid_placed_at)}
                        </td>
                      </tr>

                    )) : <p className='text-center font-semibold text-lg p-5'>No Bid History Available</p>
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <div className="border bg-red-100 rounded-lg p-3 mb-3 text-red-400 flex justify-center items-center gap-3 text-2xl sm:text-3xl font-semibold">
            <ClockIcon className="w-8 h-8" />
            {isNaN(remainingTime.hours) ||
              isNaN(remainingTime.minutes) ||
              isNaN(remainingTime.seconds) ? (
              <span className="">Loading...</span>
            ) : (
              <span className="">
                {remainingTime.hours}h, {remainingTime.minutes}m,{" "}
                {remainingTime.seconds}s
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {auction?.result?.Title}
          </h2>
        </div>

        <div className="">
          <div className="flex justify-between items-center ">
            <p className={`text-lg text-dark dark:text-slate-400 mt-1 `}>
              Number of Bids
            </p>
            <p
              className={`text-lg text-natural-500 font-semibold dark:text-green-500 mt-1 `}
            >
              {bidHistory?.result?.length}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <p className={`text-lg text-dark dark:text-slate-400 mt-1 `}>
              Starting Price
            </p>
            <p
              className={`text-lg text-natural-500 font-semibold dark:text-green-500 mt-1 `}
            >
              {PriceFormate(auction?.result?.Starting_Price)}
            </p>
          </div>
          <div className="flex justify-between items-center ">
            <p className={`text-lg text-dark dark:text-slate-400 mt-1 `}>
              Current Bid
            </p>
            <p
              className={`text-lg text-green-500 font-semibold dark:text-green-500 mt-1 `}
            >
              {/* ${currentBid < 0 ? 0 : currentBid} */}
              {/* {PriceFormate(auctioData?.Current_Bid)} */}
              {/* {PriceFormate(currentBid)} */}
              { PriceFormate(currentBid > auctioData?.Current_Bid  ?  currentBid : auctioData?.Current_Bid)}
            </p>
          </div>

          <div className="flex justify-between items-center ">
            <p className={`text-lg text-dark dark:text-slate-400 mt-1 `}>
              Close Date
            </p>
            <p
              className={`text-lg text-red-500 font-semibold dark:text-red-500 mt-1 `}
            >
              {formatDate(End_Time)}
            </p>
          </div>
        </div>

        {/*  ---------- OFFER AND BID NOW BUTTON ---------- */}
        <div>
          {auctioData?.highest_bidder === userId ? <p className="text-lg font-semibold text-dark flex justify-center">You are the highest bidder</p>
            :
            <div className="md:flex md:space-x-3.5" >
              <div className="md:w-1/2 flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-lg">
                <button className="text-3xl font-medium" onClick={handleDecrement}>-</button>
                <input
                  type="text"
                  className="w-full text-center dark:text-gray-950 rounded-lg font-semibold"
                  value={inputBid}
                  onChange={handleInputChange}
                />
                <button onClick={handleIncrement} className="text-3xl font-medium">+</button>

              </div>
              {
                singleBidHistory?.length > 0 ? <button
                  className="w-full flex-1 rounded-lg bg-slate-800"
                  onClick={handelUpdateBid}
                // disabled={auctioData?.highest_bidder === userId ? true : false}
                >
                  <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5 text-white" />
                  <span className="ml-3 text-white">Update Bid</span>
                </button> : <button
                  className="w-full flex-1 rounded-lg bg-slate-800"
                  onClick={addBid}
                >
                  <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5 text-white" />
                  <span className="ml-3 text-white">Bid Now</span>
                </button>
              }
            </div>
          }
        </div>
        {errorMessage && <small className="text-red-500">{errorMessage}</small>}

        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>

        {singleBidHistory?.length === 0 ? '' : renderBidHistory()}

      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className=" text-justify">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <div
            dangerouslySetInnerHTML={{ __html: auction?.result?.Description }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={`nc-ProductDetailPage`}>
        {/* MAIn */}
        <main className="container my-5 lg:my-12">
          <div className="lg:flex">
            {/* CONTENT */}
            <div className="w-full lg:w-[55%] ">
              {/* HEADING */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-16">
                  <img
                    src={`${config.PHOTO_URL}/${auction?.result?.product_image}`}
                    className="w-full rounded-2xl object-cover"
                    alt="product detail 1"
                  />
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
            </div>

            {/* SIDEBAR */}
            <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              {renderSectionContent()}
            </div>
          </div>

          <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>

          {/* product detail */}
          {renderDetailSection()}
        </main>
      </div>
    </div>
  );
};

export default AuctionProductDetails;

