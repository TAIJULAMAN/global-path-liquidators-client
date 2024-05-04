import React, { FC } from 'react';
import { Helmet } from "react-helmet-async";
import DashboardCommonLayout from "./DashboardCommonLayout";

export interface AccountPageProps {
    className?: string;
}
const Messaging: FC<AccountPageProps> = ({ className = "" }) => {
    return (
        <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
            <Helmet>
                <title>Messaging || Global Path Liquidators</title>
            </Helmet>
            <DashboardCommonLayout>
                <div className="">
                    {/* HEADING */}
                    {/* <h2 className="text-2xl sm:text-3xl font-semibold">
                        Account infomation
                    </h2> */}
                    {/* <!-- component --> */}
                    <div className="mx-auto border rounded-lg">
                        {/* <!-- headaer --> */}
                        <div className="px-5 py-5 flex justify-between items-center border-b-2">
                            <div className="font-semibold text-2xl">Dark Tech</div>

                            <div className="h-12 w-12 p-2 bg-[#0F172A] dark:bg-gray-200 rounded-full text-white dark:text-gray-800 font-semibold flex items-center justify-center">
                                DT
                            </div>
                        </div>
                        {/* <!-- end header --> */}
                        {/* <!-- Chatting --> */}
                        {/* <!-- message --> */}
                        <div className="w-full flex flex-col justify-between">
                            <div className="px-5 flex flex-col mt-5">
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
                                    <div className="ml-2 py-3 px-4 bg-[#0F172A] dark:bg-gray-200 dark:text-gray-800 rounded-lg text-white">
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
                                    <div className="ml-2 py-3 px-4 bg-[#0F172A] rounded-lg text-white dark:bg-gray-200 dark:text-gray-800">
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
                                    <div className="ml-2 py-3 px-4 bg-[#0F172A] rounded-lg text-white dark:bg-gray-200 dark:text-gray-800">
                                        Absolutely! We offer both domestic and international shipping.
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex items-center border-t-2">
                                <input
                                    className="w-full bg-white dark:bg-gray-200 py-5 px-3 rounded-xl"
                                    type="text"
                                    placeholder="type your message here..."
                                />
                                <div className="ml-3">
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
                    </div>
                </div>
            </DashboardCommonLayout>
        </div>
    );
};

export default Messaging;