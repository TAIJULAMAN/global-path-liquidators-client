/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";

const OrderProgress = () => {
  return (
    // <!-- component -->
    <div className=" p-5">
      
      <h1 className="text-2xl sm:text-3xl font-semibold py-5">Order Progress :</h1>

      {/* Step 1 */}
      <div className="flex relative pb-12">
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
            Order Received
          </h2>
          <p className="leading-relaxed">April 26, 2023 12.30 pm </p>
        </div>
      </div>
      {/* step 2 */}
      <div className="flex relative pb-12">
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-500 inline-flex items-center justify-center text-white relative z-10">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
            Store has started packaging{" "}
          </h2>
          <p className="leading-relaxed">April 28, 2023 8.00 am</p>
        </div>
      </div>
      {/* step 3 */}
      <div className="flex relative pb-12">
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
          </svg>
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
            Departed from the store{" "}
          </h2>
          <p className="leading-relaxed">April 29, 2023 05:31 am</p>
        </div>
      </div>
      {/* step 4 */}
      <div className="flex relative pb-12">
        <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-500 inline-flex items-center justify-center text-white relative z-10">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
            In transit to next facility.{" "}
          </h2>
          <p className="leading-relaxed">May 02, 2023 09:00 am</p>
        </div>
      </div>
      {/* step 5 */}
      <div className="flex relative">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
        </div>
        <div className="flex-grow pl-4">
          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
            Delivered{" "}
          </h2>
          <p className="leading-relaxed">May 02, 2023 11.00 am</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProgress;
