import Label from "components/Label/Label";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
// import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet-async";
import userImg from "../../images/avatars/user-icon.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useGetSingleUserQuery } from "features/api/user";

export interface AccountPageProps {
  className?: string;
}

const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }
  const userId = userDetails?.user?.user_id;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [typeOfBusiness, setTypeOfBusiness] = useState("");
  const [resalePermitNumber, setResalePermitNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [lookingToPurchase, setLookingToPurchase] = useState("");

  const { data: user, isLoading } = useGetSingleUserQuery(userId);
  // console.log(user?.result)
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFirstName(user?.result?.first_name);
      setLastName(user?.result?.last_name);
      setBusinessName(user?.result?.business_name);
      setBusinessAddress(user?.result?.business_address);
      setWebsiteLink(user?.result?.websites);
      setYearsInBusiness(user?.result?.business_years);
      setTypeOfBusiness(user?.result?.business_type);
      setResalePermitNumber(user?.result?.resale_permit);
      setBillingAddress(user?.result?.billing_address);
      setLookingToPurchase(user?.result?.to_purchase);
      setFlag(true);
    }
  }, [user, isLoading]);


  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(
        `https://darktechteam.com/api/users/update-user/${userId}`,
        {
          first_name: firstName,
          last_name: lastName,
          business_name: businessName,
          business_address: businessAddress,
          websites: websiteLink,
          business_years: yearsInBusiness,
          business_type: typeOfBusiness,
          resale_permit: resalePermitNumber,
          to_purchase: lookingToPurchase,
          billing_address: billingAddress,
        }
      );

      const message = response.data?.success;
      if (message === true) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: response.data?.message,
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Global Path Liquidators</title>
      </Helmet>
      <CommonLayout>
        {flag && (
          <div className="space-y-5 sm:space-y-6">
            {/* info */}
            <div className="space-y-5 sm:space-y-6 shadow-lg rounded-lg border px-10 py-10">
              <div className="flex items-center justify-center my-5">
                <div className="relative rounded-full overflow-hidden flex">
                  <img
                    src={userImg}
                    alt=""
                    className="w-32 h-32 rounded-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="mt-1 text-xs">Change Image</span>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-2">
                <div className="w-full">
                  <Label>First Name</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-user"></i>
                    </span>
                    <Input
                      value={`${firstName}`}
                      className="!rounded-l-none"
                      placeholder="Enter First Names"
                      onChange={(e: any) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label>Last Name</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-user"></i>
                    </span>
                    <Input
                      value={lastName}
                      className="!rounded-l-none"
                      placeholder="Enter Last Name"
                      onChange={(e: any) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-2">
                <div className="w-full">
                  <Label>Company Name</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-briefcase"></i>
                    </span>
                    <Input
                      value={businessName}
                      className="!rounded-l-none"
                      placeholder="Company Name"
                      onChange={(e: any) => setBusinessName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label>Business Address</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-map-signs"></i>
                    </span>
                    <Input
                      value={businessAddress}
                      className="!rounded-l-none"
                      placeholder="Business Address"
                      onChange={(e: any) => setBusinessAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-2">
                <div className="w-full">
                  <Label>Website link</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-link"></i>
                    </span>
                    <Input
                      type="text"
                      value={websiteLink}
                      className="!rounded-l-none"
                      placeholder="Enter Website Link"
                      onChange={(e: any) => setWebsiteLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <Label>Years In Business</Label>
                  <Select
                    value={yearsInBusiness}
                    className="mt-1.5"
                    onChange={(e: any) => setYearsInBusiness(e.target.value)}
                  >
                    <option value="0">None</option>
                    <option value="1">One Year</option>
                    <option value="1-3">One to Three Years</option>
                    <option value="3-5">Three to Five Years</option>
                    <option value=" 5+"> More than Five Years</option>
                  </Select>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-2">
                <div className="w-full">
                  <Label>Type Of Business</Label>
                  <Select
                    value={typeOfBusiness}
                    className="mt-1.5"
                    onChange={(e: any) => setTypeOfBusiness(e.target.value)}
                  >
                    <option value="swap meet">Swap Meet</option>
                    <option value="yard sales">Yard Sales</option>
                    <option value="online">Online</option>
                    <option value="retail store">Retail Store</option>
                    <option value="wholesaler">Wholesaler</option>
                    <option value="broker">Broker</option>
                    <option value="auctioneer">Auctioneer</option>
                    <option value="new">New</option>
                  </Select>
                </div>
                {/* resalePermitNumber */}
                <div className="w-full">
                  <Label>Resale Permit Number</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-hashtag"></i>
                    </span>
                    <Input
                      type="text"
                      value={resalePermitNumber}
                      className="!rounded-l-none"
                      placeholder="If you reside in California"
                      onChange={(e: any) =>
                        setResalePermitNumber(e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center gap-2">
                <div className="w-full">
                  <Label>Looking to purchase</Label>
                  <Select
                    value={lookingToPurchase}
                    className="mt-1.5"
                    onChange={(e: any) => setLookingToPurchase(e.target.value)}
                  >
                    <option value="cases">Cases</option>
                    <option value="Pallet">Pallet</option>
                    <option value="loads">Loads (a truckload with X # of pallets)</option>
                    <option value="unsure">Unsure</option>
                  </Select>
                </div>
                <div className="w-full">
                  <Label>Billing Address</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-map-signs"></i>
                    </span>
                    <Input
                      type="text"
                      value={billingAddress}
                      className="!rounded-l-none"
                      placeholder="Billing Address"
                      onChange={(e: any) => setBillingAddress(e.target.value)}
                    />
                  </div>
                </div>

              </div>
              {/* where to go? */}
              <div className="flex justify-center pt-2">
                <ButtonPrimary
                  onClick={() => {
                    handleUpdateProfile();
                  }}
                >
                  Update account
                </ButtonPrimary>
              </div>
            </div>
          </div>
        )}
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
