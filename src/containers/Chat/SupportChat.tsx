import React from "react";

const SupportChat = () => {
  return (
    <div>
      {/* <!-- component --> */}
      <div className="container mx-auto shadow-lg rounded-lg">
        {/* <!-- headaer --> */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">Dark Tech</div>
          {/* <div className="w-1/2">
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
        />
      </div> */}
          <div className="h-12 w-12 p-2 bg-[#0F172A] rounded-full text-white font-semibold flex items-center justify-center">
            DT
          </div>
        </div>
        {/* <!-- end header --> */}
        {/* <!-- Chatting --> */}
        <div className="flex flex-row justify-between bg-white">
          {/* <!-- chat list --> */}
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {/* <!-- search compt --> */}
            {/* <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div> */}
            {/* <!-- end search compt --> */}
            {/* <!-- user list --> */}
            {/* <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Md Khorshed Alam</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div> */}
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/otT2199XwI8/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Fahad Bin Bashar</div>
                <span className="text-gray-500">Hi</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Md Mayin Uddin</div>
                <span className="text-gray-500">Thanks</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Al Amin Saifur</div>
                <span className="text-gray-500">some one can fix this</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Tohirul Islam</div>
                <span className="text-gray-500">price please</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Md Borhan Uddin</div>
                <span className="text-gray-500">hello</span>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Md Shah Aman</div>
                <span className="text-gray-500">need support</span>
              </div>
            </div>

            {/* <!-- end user list --> */}
          </div>
          {/* <!-- end chat list --> */}
          {/* <!-- message --> */}
          <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
              <div className="flex justify-end mb-4 ">
                <div className="mr-2 py-3 px-4  bg-blue-400  rounded-lg text-white">
                  Is it still available?
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>

              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-[#0F172A] rounded-lg text-white">
                  Hi there! Yes, it's still available.
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-lg text-white">
                  That's great to hear! I'm eyeing the product.
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>

              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-[#0F172A] rounded-lg text-white">
                  Fantastic choice!
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-lg text-white">
                  Perfect! How about shipping?
                </div>
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
              </div>

              <div className="flex justify-start mb-4">
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div className="ml-2 py-3 px-4 bg-[#0F172A] rounded-lg text-white">
                  Absolutely! We offer both domestic and international shipping.
                </div>
              </div>
            </div>
            <div className="py-5 flex items-center">
              <input
                className="w-full bg-white py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
              />
              <div className=" ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="blue"
                  className="w-8 h-8"
                >
                  <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .811 1.022 24.89 24.89 0 0 0 11.668-5.115.75.75 0 0 0 0-1.175A24.89 24.89 0 0 0 2.869 2.298Z" />
                </svg>
              </div>
            </div>
          </div>
          {/* <!-- end message --> */}
          {/* <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
