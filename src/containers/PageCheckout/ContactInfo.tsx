import Label from "components/Label/Label";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Checkbox from "shared/Checkbox/Checkbox";
import Input from "shared/Input/Input";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

const ContactInfo: FC<Props> = ({ isActive, onCloseActive, onOpenActive }) => {
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userId = userDetails?.user?.user_id;
  console.log(userDetails?.user)
  const renderAccount = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 ">
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:ml-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">CONTACT INFO</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900 dark:text-slate-100 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
            <div className="font-semibold mt-1 text-sm">
              <span className="">{userDetails?.user?.first_name} {userDetails?.user?.last_name}</span>
              <span className="ml-3 tracking-tighter">,{userDetails?.user?.phone_number}</span>
            </div>
          </div>
          {/* <ButtonSecondary
            sizeClass="py-2 px-4 "
            fontSize="text-sm font-medium"
            className="bg-slate-50 dark:bg-slate-800 mt-5 sm:mt-0 sm:ml-auto !rounded-lg"
            onClick={() => onOpenActive()}
          >
            Change
          </ButtonSecondary> */}
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between flex-wrap items-baseline">
            <h3 className="text-lg font-semibold">Contact infomation</h3>
            <span className="block text-sm my-1 md:my-0">
              Do not have an account?{` `}
              <a href="##" className="text-primary-500 font-medium">
                Log in
              </a>
            </span>
          </div>
          <div className="max-w-lg">
            <Label className="text-sm">Your phone number</Label>
            <Input className="mt-1.5" defaultValue={userDetails?.user?.phone_number} type={"tel"} />
          </div>
          <div className="max-w-lg">
            <Label className="text-sm">Email address</Label>
            <Input className="mt-1.5" type={'email'}  value={userDetails?.user?.email}/>
          </div>
          <div>
            <Checkbox
              className="!text-sm"
              name="uudai"
              label="Email me news and offers"
              defaultChecked
            />
          </div>

          {/* ============ */}
          <div className="flex flex-col sm:flex-row pt-6">
            <ButtonPrimary
              className="sm:!px-7 shadow-none"
              onClick={() => onCloseActive()}
            >
              Save and next to Shipping
            </ButtonPrimary>
            <ButtonSecondary
              className="mt-3 sm:mt-0 sm:ml-3"
              onClick={() => onCloseActive()}
            >
              Cancel
            </ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return renderAccount();
};

export default ContactInfo;
