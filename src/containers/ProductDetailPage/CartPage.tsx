import { PriceFormate } from "components/PriceFormate";
import Prices from "components/Prices";
import {
  useGetCartCheckoutQuery,
  useRemoveSingleCartMutation,
} from "features/api/cartApi";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Swal from "sweetalert2";

const CartPage = () => {
  interface CartItem {
    cart_id: number;
    user_id: number;
    product_quantity: number;
    product_image: string;
    product_name: string;
    price: number;
    deal_type_name: string;
    cartId: number;
    condition_name: string;
    category_name: string;
    store_name: string;
    deal_type_id: number;
    value: number;
  }

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }
  const userId = userDetails?.user?.user_id;

  const [selectedOption, setSelectedOption] = useState<string>("");

  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  console.log(checkoutItems);
  const { data: checkoutProducts, isLoading } = useGetCartCheckoutQuery(
    userId,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      if (
        selectedOption === "" &&
        checkoutProducts?.result?.bin?.items.length > 0
      ) {
        setSelectedOption("bin");
        setCheckoutItems(checkoutProducts?.result?.bin?.items);
      } else if (
        selectedOption === "" &&
        checkoutProducts?.result?.case?.items.length > 0
      ) {
        setSelectedOption("case");
        setCheckoutItems(checkoutProducts?.result?.case?.items);
      } else if (
        selectedOption === "" &&
        checkoutProducts?.result?.pallet?.items.length > 0
      ) {
        setSelectedOption("pallet");
        setCheckoutItems(checkoutProducts?.result?.pallet?.items);
      } else if (
        selectedOption === "" &&
        checkoutProducts?.result?.truckload?.items.length > 0
      ) {
        setSelectedOption("truckload");
        setCheckoutItems(checkoutProducts?.result?.truckload?.items);
      }
    }
  }, [checkoutProducts?.result, isLoading, selectedOption]);

  // Calculation
  const subTotal = checkoutItems?.reduce(
    (sum, cart) => sum + 1 * +cart?.price,
    0
  );

  // Delete single Cart List
  const [removeFromCart] = useRemoveSingleCartMutation();
  const handleDeleteCartItem = async (cartId: any) => {
    const response = await removeFromCart(cartId);
    if (response) {
      Swal.fire({
        icon: "success",
        toast: true,
        title: "Remove Product Successfully",
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then((response) => {
        setSelectedOption("");
        setCheckoutItems([]);
      });
    }
  };

  return (
    <div className="nc-CartPage">
      <Helmet>
        <title>Shopping Cart || Ciseco Ecommerce Template</title>
      </Helmet>

      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        {
          checkoutItems.length === 0 ?
            <div className="text-center">
              <p className="text-2xl font-bold">Your cart is empty</p>
              <p className="text-gray-500">
                Add items to it now, or <Link to='/'><span className="text-blue-500 hover:text-blue-800">continue shopping</span></Link>
              </p>
            </div> : <div>
              <div className="mb-12 sm:mb-16">
                <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                  Shopping Cart
                </h2>
              </div>

              <hr className="border-slate-200 dark:border-slate-700 my-6 xl:my-8" />

              <div className="flex flex-col lg:flex-row">
                {/* checkoutItems?.length  */}
                <div className="lg:w-[60%] xl:w-[55%]">
                  {checkoutProducts?.result?.bin?.items?.length > 0 ? (
                    <div>
                      <div className="my-2">
                        <input
                          type="radio"
                          id="bin"
                          name="radioOption"
                          value="bin"
                          checked={selectedOption === "bin"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          onClick={() =>
                            setCheckoutItems(checkoutProducts?.result?.bin?.items)
                          }
                        />
                        <label htmlFor="bin" className="mx-3 text-lg font-semibold">
                          Bin Store
                        </label>
                      </div>

                      {selectedOption === "bin" && (
                        <div className="w-full  divide-y divide-slate-200 dark:divide-slate-700 ">
                          {checkoutProducts?.result?.bin?.items.map((item: any) => {
                            return (
                              <div key={item?.cart_id} className="py-5">
                                <div className="flex gap-5">
                                  <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                                          <h3 className="text-base font-medium ">
                                            {item?.product_name}
                                          </h3>
                                          <p className="mt-1 text-sm text-slate-700 dark:text-slate-400 ">
                                            <span>{item?.category_name}</span>
                                          </p>
                                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            <span>{item?.condition_name}</span>
                                            <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                            <span>{item?.store_name}</span>
                                          </p>
                                        </div>
                                        <Prices
                                          price={item?.price}
                                          className="mt-0.5"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div></div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDeleteCartItem(item?.cart_id)
                                          }
                                          className="font-medium text-primary-6000 dark:text-primary-500 "
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <hr className="border-blue-200 dark:border-blue-700 my-6 xl:my-8" />
                    </div>
                  ) : (
                    <></>
                  )}
                  {checkoutProducts?.result?.case?.items?.length > 0 ? (
                    <div>
                      <div className="my-2">
                        <input
                          type="radio"
                          id="case"
                          name="radioOption"
                          value="case"
                          checked={selectedOption === "case"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          onClick={() =>
                            setCheckoutItems(checkoutProducts?.result?.case?.items)
                          }
                        />
                        <label
                          htmlFor="case"
                          className="mx-3 text-lg font-semibold"
                        >
                          Case Deals
                        </label>
                      </div>

                      {selectedOption === "case" && (
                        <div className="w-full  divide-y divide-slate-200 dark:divide-slate-700 ">
                          {checkoutProducts?.result?.case?.items.map(
                            (item: any) => {
                              return (
                                <div key={item?.cart_id} className="py-5">
                                  <div className="flex gap-5">
                                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                                            <h3 className="text-base font-medium ">
                                              {item?.product_name}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-400 ">
                                              <span>{item?.category_name}</span>
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                              <span>{item?.condition_name}</span>
                                              <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                              <span>{item?.store_name}</span>
                                            </p>
                                          </div>
                                          <Prices
                                            price={item?.price}
                                            className="mt-0.5"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div></div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDeleteCartItem(item?.cart_id)
                                            }
                                            className="font-medium text-primary-6000 dark:text-primary-500 "
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <hr className="border-blue-200 dark:border-blue-700 my-6 xl:my-8" />
                    </div>
                  ) : (
                    <></>
                  )}
                  {checkoutProducts?.result?.pallet?.items?.length > 0 ? (
                    <div>
                      <div className="my-2">
                        <input
                          type="radio"
                          id="pallet"
                          name="radioOption"
                          value="pallet"
                          checked={selectedOption === "pallet"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          onClick={() =>
                            setCheckoutItems(
                              checkoutProducts?.result?.pallet?.items
                            )
                          }
                        />
                        <label
                          htmlFor="pallet"
                          className="mx-3 text-lg font-semibold"
                        >
                          Pallet Deals
                        </label>
                      </div>

                      {selectedOption === "pallet" && (
                        <div className="w-full  divide-y divide-slate-200 dark:divide-slate-700 ">
                          {checkoutProducts?.result?.pallet?.items.map(
                            (item: any) => {
                              return (
                                <div key={item?.cart_id} className="py-5">
                                  <div className="flex gap-5">
                                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                                            <h3 className="text-base font-medium ">
                                              {item?.product_name}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-400 ">
                                              <span>{item?.category_name}</span>
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                              <span>{item?.condition_name}</span>
                                              <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                              <span>{item?.store_name}</span>
                                            </p>
                                          </div>
                                          <Prices
                                            price={item?.price}
                                            className="mt-0.5"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div></div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDeleteCartItem(item?.cart_id)
                                            }
                                            className="font-medium text-primary-6000 dark:text-primary-500 "
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <hr className="border-blue-200 dark:border-blue-700 my-6 xl:my-8" />
                    </div>
                  ) : (
                    <></>
                  )}
                  {checkoutProducts?.result?.truckload?.items?.length > 0 ? (
                    <div>
                      <div className="my-2">
                        <input
                          type="radio"
                          id="truckload"
                          name="radioOption"
                          value="truckload"
                          checked={selectedOption === "truckload"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          onClick={() =>
                            setCheckoutItems(
                              checkoutProducts?.result?.truckload?.items
                            )
                          }
                        />
                        <label
                          htmlFor="truckload"
                          className="mx-3 text-lg font-semibold"
                        >
                          Truckload Deals
                        </label>
                      </div>
                      {selectedOption === "truckload" && (
                        <div className="w-full  divide-y divide-slate-200 dark:divide-slate-700 ">
                          {checkoutProducts?.result?.truckload?.items.map(
                            (item: any) => {
                              return (
                                <div key={item?.cart_id} className="py-5">
                                  <div className="flex gap-5">
                                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                                            <h3 className="text-base font-medium ">
                                              {item?.product_name}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-700 dark:text-slate-400 ">
                                              <span>{item?.category_name}</span>
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                              <span>{item?.condition_name}</span>
                                              <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                                              <span>{item?.store_name}</span>
                                            </p>
                                          </div>
                                          <Prices
                                            price={item?.price}
                                            className="mt-0.5"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div></div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleDeleteCartItem(item?.cart_id)
                                            }
                                            className="font-medium text-primary-6000 dark:text-primary-500 "
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <hr className="border-blue-200 dark:border-blue-700 my-6 xl:my-8" />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>



                <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
                <div className="flex-1">
                  <div>
                    <p className="my-2 text-lg font-semibold">Products List</p>
                    <div className="w-full  divide-y divide-slate-200 dark:divide-slate-700 ">
                      {checkoutItems?.map((item: any) => (
                        <div key={item?.cart_id} className="py-5">
                          <div className="flex gap-5">
                            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
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
                                    <h3 className="text-base font-medium ">
                                      {item?.product_name}
                                    </h3>
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
                              {/* <div className="flex flex-1 items-end justify-between text-sm">
                          <div></div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleDeleteCartItem(item?.cart_id)}
                              className="font-medium text-primary-6000 dark:text-primary-500 "
                            >
                              Remove
                            </button>
                          </div>
                        </div> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sticky top-28">
                    <h3 className="text-lg font-semibold ">Order Summary</h3>
                    <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                      <div className="flex justify-between pb-4">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-200">
                          {PriceFormate(subTotal)}
                        </span>
                      </div>
                      {/* <div className="flex justify-between py-4">
                  <span>Shpping estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    $5.00
                  </span>
                </div> */}
                      {/* <div className="flex justify-between py-4">
                  <span>Tax estimate</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">
                    $24.90
                  </span>
                </div> */}
                      <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                        <span>Order total</span>
                        <span>{PriceFormate(subTotal)}</span>
                      </div>
                    </div>
                    {checkoutItems?.length > 0 ? (
                      <ButtonPrimary
                        href="/checkout"
                        state={checkoutItems}
                        className="mt-8 w-full"
                      >
                        Checkout
                      </ButtonPrimary>
                    ) : (
                      ""
                    )}

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
              </div>
            </div>
        }
      </main>
    </div>
  );
};

export default CartPage;
