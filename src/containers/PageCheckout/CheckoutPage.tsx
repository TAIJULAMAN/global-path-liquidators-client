import Label from "components/Label/Label";

import Prices from "components/Prices";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "shared/Input/Input";
import ContactInfo from "./ContactInfo";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useGetCartItemsQuery,
  useRemoveUserCartMutation,
} from "features/api/cartApi";
import { useAddOrderMutation } from "features/api/orderApi";
import PaymentMethod from "./PaymentMethod";
import { PriceFormate } from "components/PriceFormate";
import { useAddNewReferralBonusMutation } from "features/api/referralsApi";

const CheckoutPage = () => {
  interface CartItem {
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
    flat_amount: number;
    condition_name: string;
    category_name: string;
    store_name: string;
    discount_amount: number
    // Add other properties as needed
  }

  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // console.log(cartItems);
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [forkliftChecked, setForkliftChecked] = useState(0);
  const [palletJackChecked, setPalletJackChecked] = useState(0);
  const [discount, setDiscountCode] = useState<Record<string, any>>({});
  // console.log(discount)
  const [inputDiscount, setInputDiscount] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // console.log(cartItems)

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location?.state);
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }
  const userId = userDetails?.user?.user_id;

  console.log(userDetails?.user?.phone_number)

  const { data: cart, isLoading } = useGetCartItemsQuery(userId);
  const [removeUserCart] = useRemoveUserCartMutation();
  const [createNewReferralBonus] = useAddNewReferralBonusMutation();

  useEffect(() => {
    setCartItems(location?.state);
  }, [location?.state]);

  const handleForkliftChange = (event: any) => {
    setForkliftChecked(event.target.checked ? 1 : 0);
  };

  const handlePalletJackChange = (event: any) => {
    setPalletJackChecked(event.target.checked ? 1 : 0);
  };

  //Coupon Code// Discount code

  const handleDiscountCode = (e: any) => {
    e.preventDefault();

    fetch(`https://darktechteam.com/api/coupons/coupon/${inputDiscount}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data?.message === "No coupon found") {
          Swal.fire({
            icon: "error",
            toast: true,
            title: `${data?.message}`,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
          // Optionally, you can clear the discount code state or display an error message
          setDiscountCode({});
        } else {
          setDiscountCode(data.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching discount code:", error);
        // Handle the error as needed (e.g., display an error message)
      });
  };
  const removeDiscount = () => {
    setDiscountCode({});
    setInputDiscount("");
  }
  const flatDiscount = discount?.flat_amount ? discount?.flat_amount : 0;
  const percentDiscount = discount?.percentage_amount
    ? discount?.percentage_amount
    : 0;

  const cartTotal = cartItems?.reduce((sum, cart) => sum + 1 * +cart?.price, 0);

  const finalDisccount = +flatDiscount + (+cartTotal * +percentDiscount) / 100;

  const subTotal = +cartTotal - +finalDisccount;
  const total = subTotal + 5 + 24;

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const [addOrder] = useAddOrderMutation();
  const handleOrder = async (e: any) => {
    e.preventDefault();
    if (
      address === "" ||
      suite === "" ||
      country === "" ||
      province === "" ||
      postalCode === "" ||
      city === ""
    ) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `${!address
          ? "Please Enter Your Address"
          : !suite
            ? "Enter Your Suite"
            : !country
              ? "Enter your country"
              : !province
                ? "Enter your province"
                : !postalCode
                  ? "Enter your postal code"
                  : !city
                    ? "Enter Your City"
                    : ""
          }`,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      const datas = {
        user_id: userId,
        billing_address: address,
        shipping_address: address,
        shipping_method: "Courier",
        payment_method: "cash_on_delivery",
        forklift: forkliftChecked,
        pallet_jack: palletJackChecked,
        total_amount: total,
        subtotal_amount: subTotal,
        deal_type_id: cartItems[0]?.deal_type_id,
        discount_amount: finalDisccount,
        tax_amount: 5,
        shipping_amount: 24,
        postal_code:postalCode,
        customer_province:province
      };
      try {
        const response: any = await addOrder(datas);

        const orderID: any = response?.data?.result?.insertId;
        // console.log(response?.data?.result?.insertId)

        removeUserCart(userId);
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err));
        insertTrakingStatus(orderID);
        handleOrderList(orderID);
        if (orderID) {
          if (userDetails?.user?.referrer_user_id) {
            await createNewReferralBonus({
              referrer_user_id: userDetails?.user?.referrer_user_id,
              referred_user_id: userId,
              total_payout: total,
            })
          }
          Swal.fire({
            icon: "success",
            text: "Successfully Ordered",
          }).then((res) => {
            navigate(`/order-details/${orderID}`);
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // console.log(userId);
  const handleOrderList = async (orderID: number) => {
    try {
      // const formData = new FormData();

      // Iterate through each cart item and send a separate request for each product
      for (const item of cartItems) {
        // console.log(item)
        const productInfo = {
          order_id: orderID,
          product_id: item?.product_id,
          quantity: item.product_quantity,
          unit_price: item?.price,
          deal_type_id: item?.deal_type_id,
        };

        // formData.append('product_info', JSON.stringify(productInfo));

        const response = await axios.post(
          "https://darktechteam.com/api/orderItems/create-order-item",
          productInfo,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data.result);

        // Clear the formData for the next iteration
        // formData.delete('product_info');
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Tracking Status er akane ata kno pathaite hobe? jeheto okane Status id ache... Tracking status Get api te order gular against e user_iod o vhul vhal dekay

  const insertTrakingStatus = async (orderID: number) => {
    try {
      const data = {
        tracking_status: "pending",
        order_id: orderID,
      };

      const response = await axios.post(
        "https://darktechteam.com/api/orderTracking/create-order-tracking",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.result);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const renderProduct = (item: CartItem, index: number) => {
    return (
      <div key={index} className="flex py-5 last:pb-0">
        <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <img
            src={`https://darktechteam.com/api/${item?.product_image}`}
            alt={item?.product_name}
            className="h-full w-full object-contain object-center"
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium ">{item?.product_name}</h3>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-400 ">
                  <span>{item?.category_name}</span>
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{item?.condition_name}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                  <span>{item?.store_name}</span>
                </p>
              </div>
              <Prices price={item?.price} className="mt-0.5" />
            </div>
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
                          {/* <span className="">
                            St. Paul's Road, Norris, SD 57560, Dakota, USA
                          </span> */}
                        </div>
                      </div>
                      <ButtonSecondary
                        sizeClass="py-2 px-4 "
                        fontSize="text-sm font-medium"
                        className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
                      >
                        Change
                      </ButtonSecondary>
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
                          <Label className="text-sm">Apt, Suite *</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setSuite(e.target.value)}
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
                          <Label className="text-sm">State/Province</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setProvince(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Postal code</Label>
                          <Input
                            className="mt-1.5"
                            onChange={(e) => setPostalCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div id="PaymentMethod" className="scroll-mt-24">
                  <PaymentMethod
                    // setCardExpiredate={setCardExpiredate}
                    // setCardNumber={setCardNumber}
                    // setCvc={setCvc}
                    // setShippinngMethodId={setShippinngMethodId}
                    // isActive={tabActive === "PaymentMethod"}
                    onOpenActive={() => {
                      setTabActive("PaymentMethod");
                      handleScrollToEl("PaymentMethod");
                    }}
                    onCloseActive={() => setTabActive("PaymentMethod")}
                  />
                </div> */}
              </div>
            </div>

            <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

            {/* //// MAin order PArt Start  */}

            <div className="w-full lg:w-[36%] ">
              <h3 className="text-lg font-semibold">Order summary</h3>
              <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                {cartItems?.length && cartItems?.map(renderProduct)}
              </div>

              <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                <div className="flex">
                  <div className="md:col-span-2 space-x-1">
                    <input
                      type="checkbox"
                      name="forklift"
                      checked={forkliftChecked === 1}
                      onChange={handleForkliftChange}
                      className="rounded"
                    />
                    <label>Forklift</label>
                  </div>
                  <div className="md:col-span-2 ml-5 space-x-1">
                    <input
                      type="checkbox"
                      name="palletJack"
                      checked={palletJackChecked === 1}
                      onChange={handlePalletJackChange}
                      className="rounded"
                    />
                    <label>Pallet Jack</label>
                  </div>
                </div>

                <div className="mt-4 flex justify-between py-2.5">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    {PriceFormate(cartTotal)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Shipping estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    +{PriceFormate(5)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Tax estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    +{PriceFormate(24.90)}
                  </span>
                </div>
                <div className="mt-4">
                  <Label className="text-sm">Discount code</Label>
                  <div className="flex mt-1.5">
                    <Input
                      sizeClass="h-10 px-4 py-3"
                      className="flex-1"
                      onChange={(e) => setInputDiscount(e.target.value)}
                    />
                    <button
                      className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors"
                      onClick={handleDiscountCode}
                    >
                      Apply
                    </button>
                  </div>
                  {finalDisccount ? (
                    <div className="flex justify-between mt-3">
                      <p className="text-[15px] font-medium text-qblack">
                        Coupon Code:{" "}
                        <span className="font-bold">{discount?.code}</span>{" "}
                        <p className=" text-[12px]">
                          {discount?.coupon_type === "flat_amount"
                            ? `(${discount?.coupon_type
                            } $${+discount?.flat_amount})`
                            : `(${discount?.coupon_type
                            }-${+discount?.percentage_amount}%)`} <small className="text-red-600 text-[12px] cursor-pointer" onClick={removeDiscount}>remove</small>
                        </p>{" "}
                      </p>
                      <p className="text-[15px] font-medium text-slate-900">
                        -{PriceFormate(finalDisccount)}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                  <span>Order total</span>
                  <span>{PriceFormate(total)}</span>
                </div>
              </div>
              <button
                // type="submit"
                // href="/account-my-order"
                onClick={handleOrder}
                className="mt-8 w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              >
                Confirm order
              </button>
              <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
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
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;
