import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { PathName } from "routers/types";

interface SolutionItem {
  name: string;
  description: string;
  href?: PathName;
  icon: any;
  active?: boolean;
}

const CATEGORIES: SolutionItem[] = [
  {
    name: "Women",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16C15.866 16 19 12.866 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.866 8.13401 16 12 16Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 16V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 19H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    description: "New items in 2023 ",
  },
  {
    name: "Man",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.25 21.5C14.5302 21.5 18 18.0302 18 13.75C18 9.46979 14.5302 6 10.25 6C5.96979 6 2.5 9.46979 2.5 13.75C2.5 18.0302 5.96979 21.5 10.25 21.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.5 2.5L16 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 2.5H21.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    description: "Perfect for gentlemen",
  },

  {
    name: "Sports",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.1801 18C19.5801 18 20.1801 16.65 20.1801 15V9C20.1801 7.35 19.5801 6 17.1801 6C14.7801 6 14.1801 7.35 14.1801 9V15C14.1801 16.65 14.7801 18 17.1801 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.81995 18C4.41995 18 3.81995 16.65 3.81995 15V9C3.81995 7.35 4.41995 6 6.81995 6C9.21995 6 9.81995 7.35 9.81995 9V15C9.81995 16.65 9.21995 18 6.81995 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.81995 12H14.1799" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22.5 14.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.5 14.5V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
     `,
    description: "The needs of sports ",
  },
  {
    name: "Beauty",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.7 18.98H7.30002C6.88002 18.98 6.41002 18.65 6.27002 18.25L2.13002 6.66999C1.54002 5.00999 2.23002 4.49999 3.65002 5.51999L7.55002 8.30999C8.20002 8.75999 8.94002 8.52999 9.22002 7.79999L10.98 3.10999C11.54 1.60999 12.47 1.60999 13.03 3.10999L14.79 7.79999C15.07 8.52999 15.81 8.75999 16.45 8.30999L20.11 5.69999C21.67 4.57999 22.42 5.14999 21.78 6.95999L17.74 18.27C17.59 18.65 17.12 18.98 16.7 18.98Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6.5 22H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 14H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
     `,
    description: "Luxury and nobility",
  },
  {
    name: "Jewelry",
    icon: `<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.7998 3.40005L7.19982 7.70005C7.09982 7.90005 6.99982 8.20005 6.89982 8.40005L5.19982 17C5.09982 17.6 5.39982 18.3 5.89982 18.6L11.1998 21.6C11.5998 21.8 12.2998 21.8 12.6998 21.6L17.9998 18.6C18.4998 18.3 18.7998 17.6 18.6998 17L16.9998 8.40005C16.9998 8.20005 16.7998 7.90005 16.6998 7.70005L13.0998 3.40005C12.4998 2.60005 11.4998 2.60005 10.7998 3.40005Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.8002 8.5L12.5002 20.7C12.3002 21.1 11.7002 21.1 11.6002 20.7L7.2002 8.5" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
     `,
    description: "Diamond always popular",
  },
];

export default function DropdownCategories() {
  return (
    <div className="DropdownCategories">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`${open ? "" : "text-opacity-90"}
                group py-2 h-10 sm:h-12 flex items-center rounded-md text-sm sm:text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-0 `}
            >
              <span>Shops</span>
              <ChevronDownIcon
                className={`${open ? "-rotate-180" : "text-opacity-70 "}
                  ml-2 h-5 w-5 text-neutral-700 group-hover:text-opacity-80 transition ease-in-out duration-150 `}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-40 w-80 mt-3.5 transform -translate-x-1/2 left-1/2 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-5 bg-white dark:bg-neutral-800 p-7 ">
                    {CATEGORIES.map((item, index) => (
                      <Link
                        key={index}
                        to={"/page-collection"}
                        onClick={() => close()}
                        className={`flex items-center focus:outline-none focus-visible:ring-0 ${
                          item.active ? "" : ""
                        }`}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-primary-50 rounded-md text-primary-500 sm:h-12 sm:w-12"
                        ></div>
                        <div className="ml-4 space-y-0.5">
                          <p className="text-sm font-medium ">{item.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-300">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* FOOTER */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-700">
                    <Link
                      to="/page-collection-2"
                      className="flow-root px-2 py-2 space-y-0.5 transition duration-150 ease-in-out rounded-md focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center">
                        <span className="text-sm font-medium ">
                          Go to our shop
                        </span>
                      </div>
                      <span className="block text-sm text-slate-500 dark:text-neutral-400">
                        Look for what you need and love.
                      </span>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
