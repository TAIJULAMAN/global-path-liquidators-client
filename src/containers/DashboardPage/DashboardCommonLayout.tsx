import React from "react";
import { FC } from "react";
import { HiOutlineMail, HiOutlinePhone, HiOutlineUserCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const DashboardCommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const storedUserData: any = localStorage.getItem("UserDetails");
  const userData = Object.assign(JSON.parse(storedUserData)).user;
  return (
    <div className="nc-CommonLayoutProps container">
      <div className="mt-8 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="md:flex justify-center gap-5 mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
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
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex justify-between space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {[
              {
                name: "Dashboard",
                link: "/dashboard",
              },
              {
                name: "Order History",
                link: "/order-history",
              },
              // {
              //   name: "Shipments Status",
              //   link: "/shipment-status",
              // },
              {
                name: "Notifications",
                link: "/notifications",
              },
              // {
              //     name: "Messaging",
              //     link: "/messaging",
              // },
              {
                name: "Ticket",
                link: "/alltickets",
              },
              {
                name: "Subscriptions",
                link: "/subscriptions",
              },
              // {
              //     name: "Promotions",
              //     link: "/promotions",
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
      <div className="max-w-4xl mx-auto py-8 sm:py-8 lg:py-12">{children}</div>
    </div>
  );
};

export default DashboardCommonLayout;
