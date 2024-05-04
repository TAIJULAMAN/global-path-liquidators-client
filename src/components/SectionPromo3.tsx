import React, { FC, useState } from "react";
import NcImage from "shared/NcImage/NcImage";
import rightImgDemo from "images/promo3.png";
import backgroundLineSvg from "images/BackgroundLine.svg";
import Badge from "shared/Badge/Badge";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Swal from "sweetalert2";

export interface SectionPromo3Props {
  className?: string;
}

const SectionPromo3: FC<SectionPromo3Props> = ({ className = "lg:pt-10" }) => {
  const [email, setEmail] = useState()

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }

  // console.log(userDetails)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const subscribeInfo = {
      user_id: userDetails?.user?.user_id,
      email: email || userDetails?.user?.email,
      general_subscriber: 1,
  
    }
    try {

      const response = await axios.post(
        "https://darktechteam.com/api/subscription/new_subscriber",
        subscribeInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        Swal.fire({
          icon: "success",
          toast: true,
          title: "Successfully subscribed",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
      // console.log(response);
    }
    catch (error) {
      console.error("Error subscription:", error);
    }
  }
  return (
    <div className={`nc-SectionPromo3 ${className}`}>
      <div className="relative flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <img
            className="absolute w-full h-full object-contain object-bottom dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[50%] max-w-lg relative">
          <h2 className="font-semibold text-4xl md:text-5xl">
            Don't miss out on special offers
          </h2>
          <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            Register to receive news about the latest, savings combos, discount
            codes...
          </span>
          <ul className="space-y-4 mt-10">
            <li className="flex items-center space-x-4">
              <Badge color="purple" name="01" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Savings combos
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <Badge name="02" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Freeship
              </span>
            </li>
            <li className="flex items-center space-x-4">
              <Badge color="red" name="03" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Premium magazines
              </span>
            </li>
          </ul>
          <form className="mt-10 relative max-w-sm">
            <Input
              required
              aria-required
              placeholder="Enter your email"
              type="email"
              rounded="rounded-full"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <ButtonCircle
              onClick={handleSubmit}
              type="submit"
              className="absolute transform top-1/2 -translate-y-1/2 right-1"
            >
              <ArrowSmallRightIcon className="w-6 h-6" />
            </ButtonCircle>
          </form>
        </div>

        <NcImage
          containerClassName="relative block lg:absolute lg:right-0 lg:bottom-0 mt-10 lg:mt-0 max-w-lg lg:max-w-[calc(50%-40px)]"
          src={rightImgDemo}
        />
      </div>
    </div>
  );
};

export default SectionPromo3;
