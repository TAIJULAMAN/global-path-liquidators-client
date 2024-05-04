import Label from "components/Label/Label";
import NcInputNumber from "components/NcInputNumber";
import Prices from "components/Prices";
import { Product, PRODUCTS } from "data/data";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useCreateBidInfoMutation,
  useCreateBidItemsMutation,
  useGetAuctionDetailsQuery,
  useUpdateAuctionMutation,
  useUpdateBidMutation,
} from "features/api/auctionApi";
import { PriceFormate } from "components/PriceFormate";
import Switch from "./Switch";
import SubscribeCheckbox from "./SubscribeCheckbox";

const CheckoutPageBid = () => {
  interface BidItem {
    cart_id: number;
    user_id: number;
    product_quantity: number;
    product_image: string;
    product_name: string;
    price: number;
    deal_type_name: string;
    cartId: number;
    product_id: number;
    deal_type_id: number;
    // price: number;
    // Add other properties as needed
  }

  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");
  const [card_number, setCardNumber] = useState("");
  const [card_expiry, setCardExpiredate] = useState("");
  const [cvc, setCvc] = useState("");
  const [payment_method_id, setShippinngMethodId] = useState(null);
  const [bidDetails, setBidDetails] = useState<BidItem[]>([]);

  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [city, setCity] = useState("");

  const details = {
    address,
    suite,
    country,
    province,
    postalCode,
    city,
  };

  const navigate = useNavigate();
  const { id, amount } = useParams();

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userId = userDetails?.user?.user_id;

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  //fetch Auction detils by Auction Id
  const { data: auction } = useGetAuctionDetailsQuery(id);
  const auctionData = auction?.result;

  //
  // Calculation
  //   const subTotal = cartItems?.reduce((sum, cart) => sum + 1 * +cart?.price, 0);
  //   const total = subTotal+5+24
  const [createBidInfo] = useCreateBidInfoMutation();
  const [createBids] = useCreateBidItemsMutation();
  const [updateAuction] = useUpdateAuctionMutation();
  const [updateBid] = useUpdateBidMutation();
  const handleCreateBid = async (e: any) => {
    e.preventDefault();
    // if (
    //   !card_number ||
    //   !card_expiry ||
    //   !cvc ||
    //   !postalCode ||
    //   !address ||
    //   !province ||
    //   !city || !country || !shippingMethod
    // ) 
    if (shippingMethod === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please select a shipping method`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (country === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please select your country`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (province === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please select your province`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (postalCode === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please give your postal code`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (address === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please give your address`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    // else if (suite === '') {
    //   Swal.fire({
    //     icon: "error",
    //     toast: true,
    //     title: `Please give your suite`,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 1300,
    //     timerProgressBar: true,
    //   });
    // }

    else if (city === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please give your city`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (card_number === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please give your card number`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (card_expiry === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please give your card expiry date`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else if (cvc === '') {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please give your cvc`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1300,
        timerProgressBar: true,
      });
    }
    else {
      try {
        const user_id = userId;
        const Auction_id = id;
        const payment_method_id = 2;
        const shipping_method = shippingMethod;
        //   const cvc = "1236";
        //   const card_expiry = "12/02/26";
        //   const card_number = "4564564322123";
        const zip_code = postalCode;
        const state = province;
        const shipping_address = address;
        const addItem = {
          user_id,
          Auction_id,
          payment_method_id,
          shipping_method,
          cvc,
          card_expiry,
          card_number,
          zip_code,
          state,
          shipping_address,
        };
        console.log(addItem);
        const response = await createBidInfo(addItem);
        console.log(response);
        const insertId =
          "data" in response ? response?.data?.result.insertId : undefined;
        if (insertId) {
          await handleAddtoBid(insertId);
        }
        console.log(response);
        if (response) {
          Swal.fire({
            text: "Bid has been placed successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate("/auction-page");
        }
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    }
  };
  const handleAddtoBid = async (insert_id: any) => {
    try {
      const user_id = userId;
      const Auction_id = id;
      const bidStatus = "processing";
      const user_auction_info_id = insert_id;
      const addItem = {
        user_id,
        Auction_id,
        amount,
        bidStatus,
        user_auction_info_id,
      };

      await createBids(addItem)
        .then(async (response: any) => {
          if (response) {
            await updateAuction({
              id: id,
              highest_bidder: userId,
              Current_Bid: amount,
            })
              .then((response: any) => console.log(response))
              .catch((error: any) => console.log(error));

            // await updateBid({
            //   id: insert_id,
            //   amount: amount,
            // })
            //   .then((response: any) => console.log(response))
            //   .catch((error: any) => console.log(error));
          }
        })
        .catch((error: any) => {
          console.error("Error uploading product:", error);
        });
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  // Tracking Status er akane ata kno pathaite hobe? jeheto okane Status id ache... Tracking status Get api te order gular against e user_iod o vhul vhal dekay

  //   const insertTrakingStatus = async (orderID: number) => {
  //     try {

  //      const data = {
  //        tracking_status : 'pending' ,
  //        order_id : orderID,
  //      }

  //         const response = await axios.post(
  //           'https://darktechteam.com/api/orderTracking/create-order-tracking',
  //           data,
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           }
  //         );

  //         console.log(response.data.result);

  //         // Clear the formData for the next iteration
  //         // formData.delete('product_info');

  //     }catch (error) {
  //       console.error('Error creating order:', error);
  //     }
  //   };

  //   const removeCartItems = async () => {
  //     try {
  //       const response = await axios.delete(`https://darktechteam.com/api/cart/remove-all-cart-item/${userId}`);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error removing cart items:', error);
  //     }
  //   };
  const renderProduct = () => {
    return (
      <div
        key={auctionData?.product_id}
        className="relative flex py-7 first:pt-0 last:pb-0"
      >
        <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`https://darktechteam.com/api/${auctionData?.product_image}`}
            alt={auctionData?.product_name}
            className="h-full w-full object-contain object-center"
          />
          <Link to="/" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div className="flex-[1.5] ">
                <h3 className="text-base font-semibold">
                  <Link to="/">{auctionData?.product_name}</Link>
                </h3>
                {/* <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.35 1.94995L9.69 3.28992"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.07 11.92L17.19 11.26"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 22H16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>{`Black`}</span>
                  </div>
                  <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>
                  <div className="flex items-center space-x-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 9V3H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 15V21H9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 3L13.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 13.5L3 21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>{`2XL`}</span>
                  </div>
                </div> */}

                <div className="mt-3 flex justify-between w-full sm:hidden relative">


                  <Prices
                    contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                  // price={amount}
                  />
                </div>
              </div>

              <div className="hidden flex-1 sm:flex justify-end">
                {/* <Prices price={typeof auctionData?.price} className="mt-0.5" /> */}
              </div>
            </div>
          </div>

          <div className="flex mt-auto pt-4 items-end justify-between text-sm">
            {/* <div className="hidden sm:block text-center relative">
              <NcInputNumber className="relative z-10" />
            </div> */}
            <div></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CheckoutPage">
      <Helmet>
        <title>Checkout || Global Path Liquidators</title>
      </Helmet>
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          {/* <Switch></Switch> */}
          {/* <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link to={"/#"} className="">
            Homepage
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <Link to={"/#"} className="">
            Clothing Categories
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Checkout</span>
          </div> */}
        </div>
        <form>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
              <div className="space-y-8">
                <div id="ContactInfo" className="scroll-mt-24">
                  <ContactInfo
                    isActive={tabActive === "ContactInfo"}
                    onOpenActive={() => {
                      setTabActive("ContactInfo");
                      handleScrollToEl("ContactInfo");
                    }}
                    onCloseActive={() => {
                      setTabActive("ShippingAddress");
                      handleScrollToEl("ShippingAddress");
                    }}
                  />
                </div>

                <div id="ShippingAddress" className="scroll-mt-24">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                    <div className="p-6 flex flex-col sm:flex-row items-start">
                      <span className="hidden sm:block">
                        <svg
                          className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <div className="sm:ml-8">
                        <h3 className=" text-slate-700 dark:text-slate-300 flex ">
                          <span className="uppercase">SHIPPING ADDRESS</span>
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </h3>
                        <div className="font-semibold mt-1 text-sm">
                          <span className="">
                            {address}, {province}, {postalCode}, {city},{" "}
                            {country}.
                          </span>
                        </div>
                      </div>
                      {/* <ButtonSecondary
                        sizeClass="py-2 px-4 "
                        fontSize="text-sm font-medium"
                        className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
                      >
                        Change
                      </ButtonSecondary> */}
                    </div>
                    <div
                      className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6`}
                    >
                      {/* ============ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                        <div>
                          <Label className="text-sm">First name</Label>
                          <Input
                            className="mt-1.5"
                            value={userDetails?.user?.first_name}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Last name</Label>
                          <Input
                            className="mt-1.5"
                            value={userDetails?.user?.last_name}
                          />
                        </div>
                      </div>

                      {/* ============ */}
                      <div className="sm:flex space-y-4 sm:space-y-0 sm:space-x-3">
                        <div className="flex-1">
                          <Label className="text-sm">Address</Label>
                          <Input
                            className="mt-1.5"
                            placeholder=""
                            // defaultValue={"123, Dream Avenue, USA"}
                            onChange={(e) => setAddress(e.target.value)}
                            type={"text"}
                            required
                          />
                        </div>
                        <div className="sm:w-1/3">
                          <Label className="text-sm">State</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* ============ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                        <div>
                          <Label className="text-sm">City</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Country</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* ============ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3">
                        <div>
                          <Label className="text-sm">Postal code</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Shipping Method</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setShippingMethod(e.target.value)}
                            placeholder="ex: courier"
                          />
                        </div>
                      </div>

                      {/* ============ */}
                      {/* <div>
            <Label className="text-sm">Address type</Label>
            <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Radio
                label={`<span class="text-sm font-medium">Home <span class="font-light">(All Day Delivery)</span></span>`}
                id="Address-type-home"
                name="Address-type"
                defaultChecked
              />
              <Radio
                label={`<span class="text-sm font-medium">Office <span class="font-light">(Delivery <span class="font-medium">9 AM - 5 PM</span>)</span> </span>`}
                id="Address-type-office"
                name="Address-type"
              />
            </div>
          </div> */}

                      {/* ============ */}
                      {/* <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={}
            >
              Save and next to Payment
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
            >
              Cancel
            </ButtonSecondary>
          </div> */}
                    </div>
                  </div>
                </div>

                {/* //PAyment Method  */}
                <div id="PaymentMethod" className="scroll-mt-24">
                  <PaymentMethod
                    setCardExpiredate={setCardExpiredate}
                    setCardNumber={setCardNumber}
                    setCvc={setCvc}
                    setShippinngMethodId={setShippinngMethodId}
                    isActive={tabActive === "PaymentMethod"}
                    onOpenActive={() => {
                      setTabActive("PaymentMethod");
                      handleScrollToEl("PaymentMethod");
                    }}
                    onCloseActive={() => setTabActive("PaymentMethod")}
                  />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

            {/* //// MAin order PArt Start  */}

            <div className="w-full lg:w-[36%] ">
              <h3 className="text-lg font-semibold">Order summary</h3>
              <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                {auctionData && renderProduct()}
              </div>

              <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Bid Amount</span>
                  <span>${PriceFormate(amount)}</span>
                </div>
              </div>
              {/* <Switch></Switch> */}
              <SubscribeCheckbox></SubscribeCheckbox>
              <button
                // type="submit"
                // href="/account-my-order"
                onClick={handleCreateBid}
                className="mt-4 w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              >
                Confirm Bid
              </button>
              {/* <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                <p className="block relative pl-5">
                  <svg
                    className="w-4 h-4 absolute -left-1 top-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9945 16H12.0035"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Learn more{` `}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Taxes
                  </a>
                  <span>
                    {` `}and{` `}
                  </span>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="##"
                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                  >
                    Shipping
                  </a>
                  {` `} infomation
                </p>
              </div> */}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPageBid;
