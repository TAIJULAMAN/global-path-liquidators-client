import React from "react";
import { FaCcStripe, FaCcPaypal } from "react-icons/fa";
// import { FaPaypal } from "react-icons/fa";

// import { FaStripe } from "react-icons/fa";

export default function BidPaymentPop() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Pay Now
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative mx-auto max-w-5xl">
              {/*content*/}
              <div className="mx-20 my-10 border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="border-b border-solid border-blueGray-200 rounded-t py-2">
                  <h3 className="text-3xl font-semibold">Bid Final Payment</h3>
                </div>
                {/*body*/}
                <div>
                  <h1 className="flex justify-start px-6">
                    Select Your Payment Method :
                  </h1>
                  <div className="flex justify-start p-6 gap-4">
                    <FaCcStripe className="w-20 h-10" />
                    <FaCcPaypal className="w-20 h-10" />
                  </div>
                  <div className="flex justify-between px-6">
                    <p>Payment amount :</p>
                    <p>$100.00</p>
                  </div>
                  <div className="flex justify-between px-6">
                       <p>5% Tax :</p>
                       <p>$5.00</p>
                  </div>
                  <div className="flex justify-between px-6">
                  <p>Total Payment :</p>
                       <p>$105.00</p>
                  </div>
                </div>
                {/*footer-payment button*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Pay $100.50
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
