import React from "react";
import { Bidding } from "./MyBidding";
import { PriceFormate } from "components/PriceFormate";
import { Link } from "react-router-dom";
import { useGetauctionProductWinnerQuery } from "features/api/auctionApi";

const BidDetails = ({
  item,
  handleEditClick,
}: {
  item: Bidding;
  handleEditClick: (
    id: number,
    amount: number,
    bidIncrement: number,
    auctionID: number
  ) => void;
}) => {
  const userDetailsString = localStorage.getItem("UserDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const userId = userDetails?.user?.user_id;
  console.log(userId)
  const currentdate = new Date();
  const {data:WinnerData} = useGetauctionProductWinnerQuery(item?.Auction_id)
console.log(WinnerData?.result)
  return (
    <tr
      key={item.id}
      className="border-b border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <td className="flex justify-center items-center px-5 py-4">
        <img
          className="w-16 h-12 rounded"
          src={`https://darktechteam.com/api/${item?.product_image}`}
          alt=""
        />
      </td>
      <td className="text-left px-5 py-4">{item.product_name}</td>
      <td className="text-center px-5 py-4">
        {PriceFormate(
          item.amount > item.Current_Bid ? item.amount : item.Current_Bid
        )}
      </td>
      <td className="text-center px-5 py-4">{PriceFormate(item.amount)}</td>
      {/* <td className="text-center px-5 py-4 text-yellow-600">
        {item.bidStatus}
      </td> */}
      <td className="text-center px-5 py-4 space-x-1">
        <Link to={`/my-bidding-details/${item?.id}`}>
          <button className="items-start py-2 px-4 sm:px-6 text-sm font-medium border-slate-600 bg-[#00B0FF] rounded-full hover:bg-[#00E676]">
            Details
          </button>
        </Link>
      </td>
      <td className=" text-center px-5 py-4 space-x-2">
        {item?.status === 1 && item?.highest_bidder === userId ? (
          <small className="text-green-600 font-semibold">
            You are the highest bidder
          </small>
        ) : item?.status === 2 && WinnerData?.result?.user_id !== userId ? (
          <small className="text-red-600 font-semibold">Bid time is over</small>
        ) : item?.status === 2 && WinnerData?.result?.user_id === userId ? (
            <small className="text-green-600 font-semibold">You Win</small>
          ): item?.status === 1 && !item?.highest_bidder === userId && (
          <button
            onClick={() =>
              handleEditClick(
                item?.id,
                item?.Current_Bid,
                item?.Bid_Increment,
                item?.Auction_id
              )
            }
            className="py-2 px-4 sm:px-6 text-sm font-medium border-slate-600 bg-[#69F0AE] rounded-full hover:bg-[#00E676]"
          >
            Update Bid
          </button>
        )}
      </td>
    </tr>
  );
};

export default BidDetails;
