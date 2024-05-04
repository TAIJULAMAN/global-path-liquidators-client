import React from "react";
import { FC } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUserCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const storedUserData: any = localStorage.getItem("UserDetails");
  const userData = Object.assign(JSON.parse(storedUserData)).user;
  return (
    <div className="nc-CommonLayoutProps container">
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          {/* <div className="shadow-lg rounded-lg bg-slate-100 px-10 py-5">
            <h1 className="text-3xl my-10 sm:text-3xl font-bold text-neutral-900 uppercase text-center">
              Account information
            </h1>
          </div> */}

          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold"> My Account</h2>
            <div className="md:flex gap-5 mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
              <div className="flex items-center gap-2 text-lg text-slate-900 dark:text-slate-200 font-semibold">
                <HiOutlineUserCircle />
                <span>
                  {userData?.first_name} {userData?.last_name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineMail />
                {userData?.email}
              </div>
              <div className="flex items-center gap-2">
                <HiOutlinePhone />
                {userData?.phone_number}
              </div>
            </div>
          </div>
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {[
              {
                name: "Account info",
                link: "/account",
              },
              // {
              //   name: "Save lists",
              //   link: "/account-savelists",
              // },
              // {
              //   name: " My order",
              //   link: "/account-my-order",
              // },
              {
                name: "Change password",
                link: "/account-change-password",
              },
              // {
              //   name: "Change Billing",
              //   link: "/account-billing",
              // },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                className={({ isActive }) =>
                  `block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0  text-sm sm:text-base ${isActive
                    ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
