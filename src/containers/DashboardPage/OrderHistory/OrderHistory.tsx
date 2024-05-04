import React from "react";
import OrderBar from "./OrderBar";
import OrderDetails from "./OrderDetails";
import DashboardCommonLayout from "../DashboardCommonLayout";
import { Helmet } from "react-helmet-async";

const OrderHistory = () => {
  return (
    <>
      <Helmet>
        <title>Order History || Global Path Liquidators</title>
      </Helmet>

      <DashboardCommonLayout>
        <div className=" overflow-hidden z-0 space-y-10 sm:space-y-12">
          {/* <h2 className="text-2xl sm:text-3xl font-semibold">
            Order History :
          </h2> */}
          <section>
            <OrderBar />
          </section>
          {/* <section>
            <OrderDetails />
          </section> */}
        </div>
      </DashboardCommonLayout>
    </>
  );
};

export default OrderHistory;
