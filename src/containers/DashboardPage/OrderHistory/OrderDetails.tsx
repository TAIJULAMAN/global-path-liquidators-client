import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetOrderDataQuery,
  useGetOrderTrackingInfoQuery,
} from "features/api/orderApi";
import OrderedProducts from "./OrderedProducts";
import { PriceFormate } from "components/PriceFormate";
import { formatDate } from "components/FormateDate";
// import LoadingSpinner from "./LoadingSpinner"; // Assuming you have a loading spinner component

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [orders, setOrders] = useState<any[]>([]);
  const [orderUser, setOrderUser] = useState<any[]>([]);
  const [trackingInfo, setTrackingInfo] = useState<any[]>([]);
  const { data: orderHistoryData } = useGetOrderDataQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: trackingInfoData, isLoading: trackingInfoLoading } =
    useGetOrderTrackingInfoQuery(id, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    setOrders(orderHistoryData?.result || []);
    setTrackingInfo(trackingInfoData?.result || []);
  }, [orderHistoryData, trackingInfoData]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://darktechteam.com/api/orders/order-by-id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderUser(data?.result || []);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id]);
  console.log(orders)

  const cartTotal = orders?.reduce((sum, order) => sum + order.price, 0);

  const checkoutTotal = orders?.reduce(
    (sum, order) => sum + order.subtotal_amount,
    0
  );
  // const discount =  orders?.find((order) => order?.discount_amount);
  // console.log(discount)
  const discount = orders[0]?.discount_amount;

  const total = (cartTotal - discount) + 5 + 24;

  return (
    <div>
      <div className="nc-CommonLayoutProps container">
        <div className="max-w-4xl mx-auto py-8 sm:py-8 lg:py-12">
          <div className="border border-b-0 border-slate-200 dark:border-slate-700 rounded-t-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5 rounded-t-lg">
              <div>
                <p className="text-lg font-semibold">Order No: #{id}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                  <span>
                    {formatDate(orders?.length && orders[0]?.order_date)}
                  </span>
                  <span className="mx-2">·</span>
                  <span className="text-[#FFAB00]">{orders[0]?.order_status === 0 ? 'Received' : orders[0]?.order_status === 1 ? 'Processing' : orders[0]?.order_status === 2 ? 'Shipped' : orders[0]?.order_status === 3 ? 'Delivered' : orders[0]?.order_status === 4 ? 'Cancel' : ''}</span>
                </p>
              </div>
            </div>
          </div>
          {id && (
            <div className="mb-5">
              <OrderedProducts orderId={id} />
            </div>
          )}

          <div className="lg:flex justify-between gap-5 my-5 border border-slate-200 dark:border-slate-700  p-5 rounded-lg ">
            <div>
              <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
              <p className="text-sm text-gray-900 dark:text-gray-400 mb-4">
                Shipping Address: {orderUser[0]?.shipping_address} 
                <br />
                {/* Shipping City: Dhaka, {orderUser[0]?.customer_province}
                <br /> */}
                Province: {orderUser[0]?.customer_province}
                <br />
                Shipping Post Code: {orderUser[0]?.postal_code}
                <br />
                Mobile: {orderUser[0]?.phone_number}
              </p>
            </div>
            <div className="hidden lg:block bg-gray-200 w-px"></div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Payment Summary</h3>
              <p className="text-sm text-gray-900 dark:text-gray-400 mb-4">
                Sub Total: {PriceFormate(cartTotal)}
                <br />
                Delivery Fee: +{PriceFormate(24)}
                <br />
                Tax: +{PriceFormate(5)}
                <br />
                Discount: -{PriceFormate(discount)}
                <br />
                Total: {PriceFormate(total)}
              </p>
            </div>
          </div>

          <div className="card p-5 border border-slate-200 dark:border-slate-700 rounded-lg ">
            <h3 className="font-semibold text-lg mb-4">
              Order Status Activity
            </h3>
            <div className="flex flex-col space-y-4">
              {!trackingInfoLoading &&
                trackingInfo?.map((event: any, index: number) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center mb-2">

                      <div className="font-semibold mb-1 text-base">
                        {event?.tracking_status === 0 && (
                          <span style={{ color: "#ff9800" }}>Received</span>
                        )}
                        {event?.tracking_status === 1 && (
                          <span style={{ color: "#4caf50" }}>Processing</span>
                        )}
                        {event?.tracking_status === 2 && (
                          <span style={{ color: "#2196f3" }}>Shipped</span>
                        )}
                        {event?.tracking_status === 3 && (
                          <span style={{ color: "#8bc34a" }}>Delivered</span>
                        )}
                        {event?.tracking_status === 4 && (
                          <span style={{ color: "#f44336" }}>Cancel</span>
                        )}
                        {(event?.tracking_status < 0 || event?.tracking_status > 4) && (
                          <span style={{ color: "#9e9e9e" }}>Unknown</span>
                        )}
                      </div>

                    </div>

                    <div> {/* Format date here */}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
