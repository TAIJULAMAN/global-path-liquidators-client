import { Update, current } from "@reduxjs/toolkit";
import axios from "axios";
import { PriceFormate } from "components/PriceFormate";

import { useGetAuctionDetailsQuery, useGetauctionProductWinnerQuery, useUpdateAuctionMutation, useUpdateBidMutation } from "features/api/auctionApi";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BidDetails from "./BidDetails";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}
export type Bidding = {
  prodict_id: number;
  product_name: string;
  product_image: string;
  updated_at: string;
  bidStatus: string;
  End_Time: string;
  amount: number;
  id: number;
  Current_Bid: number;
  Bid_Increment: number;
  Auction_id: number;
  highest_bidder: number;
  status:number
};
const MyBidding: FC<CommonLayoutProps> = () => {
  

  const [bids, setBids] = useState<Bidding[]>([]);
  console.log(bids)
  const [editPopup, setEditPopup] = useState(false);
  const [bidId, setBidId] = useState(0);
  const [auctionId, setAuctionId] = useState(0);
  const [currentBidAmount, setCurrentBidAmount] = useState(0);
  const [updatedAmount, setUpdatedAmount] = useState(0);

  const [incrementBid, setIncrementBid] = useState(0);
  const userDetailsString = localStorage.getItem("UserDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const userId = userDetails?.user?.user_id;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://darktechteam.com/api/bids/user-bids/${userId}`
      );
      setBids(response.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { data: auction } = useGetAuctionDetailsQuery(22);
  const auctioData = auction?.result;

  console.log(auctioData)
const {data:WinnerData} = useGetauctionProductWinnerQuery(22)
console.log(WinnerData?.result)
  const handleEditClick = (id: number, amount: number, bidIncrement: number, auctionID: number) => {
    setBidId(id);
    setCurrentBidAmount(amount);
    setUpdatedAmount(amount + bidIncrement);
    setIncrementBid(bidIncrement)
    setAuctionId(auctionID);
    setEditPopup(true);

  };
  // increment
  const handleIncrement = () => {

    setUpdatedAmount((prevValue: any) => +prevValue + incrementBid);

  };

  const handleDecrement = () => {
    setUpdatedAmount((prevValue: any) => +prevValue - incrementBid);

  };
  const [updateAuction] = useUpdateAuctionMutation();
  const [updateBid] = useUpdateBidMutation();
  const handleSubmit = async () => {
    if (currentBidAmount > updatedAmount) {
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
          id: bidId,
          amount: updatedAmount,
        });
        console.log(response);

        if (response) {
          Swal.fire({
            icon: "success",
            text: "Bid successfully updated",
          });
          await updateAuction({
            id: auctionId,
            highest_bidder: userId,
            Current_Bid: updatedAmount,
          })
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error));
        }
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }

    setEditPopup(false);
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setUpdatedAmount(value);

  };

  const handleClosePopup = () => {
    setEditPopup(false);
  };

  // time na thakle abave filter kore then ay product gula dekano
  const currentdate = new Date();

  const prodcutsWithDate = bids?.filter((product: any) => new Date(product?.End_Time) >= currentdate);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mt-10 mb-5">
        <div className="text-3xl font-bold uppercase">Bidding History</div>
      </div>

      <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700 mb-5">
        <div className="min-w-full overflow-x-auto rounded-lg">
          {bids && bids?.length > 0 ? ( // Check if bids array is defined and has elements
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800 rounded-lg">
                <tr>
                  <th className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Image
                  </th>
                  <th className="px-5 text-left font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Bidding Product
                  </th>
                  <th className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Current Bid
                  </th>
                  <th className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Bid Amount
                  </th>
                  {/* <th className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Status
                  </th> */}
                  <th className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Action
                  </th>
                  <th className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase">
                    Bid Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bids.map((item) => (
                 <BidDetails item={item} handleEditClick={handleEditClick}></BidDetails>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">Bid data not found</p> // If bids array is empty or undefined
          )}
        </div>
      </div>

      {editPopup && (
        <div className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden fixed z-50">
          <div className="bg-white p-4 rounded-md w-80 h-64 flex flex-col gap-y-2 relative">
            <p className="text-center mt-10 font-semibold">
              Product current bid amount is: {PriceFormate(currentBidAmount)}
            </p>
            <label htmlFor="updatedAmount" className="block">
              Updated Amount:
            </label>
            {/* <input
              type="number"
              id="updatedAmount"
              defaultValue={currentBidAmount}
              onChange={(e) => setUpdatedAmount(Number(e.target.value))}
              className="input"
            /> */}
            <div className="flex items-center justify-center w-70 h-56 bg-white p-4 sm:p-3 rounded-lg relative">
              <button
                className="text-3xl font-medium"
                onClick={handleDecrement}
              >
                -
              </button>
              <input
                type="text"
                className="text-center dark:text-gray-950 rounded-lg font-semibold"
                value={updatedAmount}
                onChange={handleInputChange}
              />
              <button
                onClick={handleIncrement}
                className="text-3xl font-medium"
              >
                +
              </button>
            </div>
            <div className="flex justify-center">
              <button className="btn btn-blue bg-blue-600 px-2 rounded text-white" onClick={handleSubmit}>
                Save
              </button>
              <button className="btn btn-red ml-2 bg-red-600 px-2 rounded text-white" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBidding;
