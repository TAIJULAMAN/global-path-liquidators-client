// import ShippingDetails from './ShippingDetails';
import { Helmet } from "react-helmet-async";
import OrderBar from "../OrderHistory/OrderBar";
import OrderProgress from "./OrderProgress";
import ShippingDetails from "./ShippingDetails";
import DashboardCommonLayout from "../DashboardCommonLayout";
const ShipmentStatus = () => {
  return (
    <>
      <Helmet>
        <title>Shipment Status || Global Path Liquidators</title>
      </Helmet>
      <DashboardCommonLayout>
        <div>
          <OrderBar />
          {/* <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap">
              <div className="flex justify-between flex-wrap  w-full">
                <div className="lg:w-1/2 md:w-1/2 object-cover object-center  md:mt-0 mt-12">
                  <OrderProgress />
                </div>
                <div className="lg:w-1/2 md:w-1/2 object-cover object-center  md:mt-0 mt-12">
                  <ShippingDetails />
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </DashboardCommonLayout>
    </>
  );
};

export default ShipmentStatus;
