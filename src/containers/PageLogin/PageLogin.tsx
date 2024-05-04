import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {
  useCreateLoginUserMutation,
  useUpdateUserMutation,
} from "features/api/user";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  // {
  //   name: "Continue with Twitter",
  //   href: "#",
  //   icon: twitterSvg,
  // },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  // const { data: AllUsers } = useGetAllUsersQuery(undefined);
  // console.log(AllUsers);

  const [userLogin] = useCreateLoginUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const getCurrentTimeFormatted = () => {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
    const day = String(currentDateTime.getDate()).padStart(2, "0");
    const hours = String(currentDateTime.getHours()).padStart(2, "0");
    const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };
  const require = localStorage.getItem("require");

  const from = location.state?.path || require || "/";
  const handleLoginUser = () => {
    if (userEmail === "" || userPassword === "") {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `${!userEmail
          ? "Please Enter Your Email Address"
          : !userPassword
            ? "Please Enter Your Password"
            : "Please enter your Email and Password"
          }`,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      userLogin({
        email: userEmail,
        password: userPassword,
      })
        .then((res: any) => {
          if (res?.data?.success) {
            const loginTime = getCurrentTimeFormatted();
            localStorage.setItem(
              "UserDetails",
              JSON.stringify(res?.data.result)
            );
            // console.log(res)
            const loginData = {
              id: res?.data?.result?.user?.user_id,
              last_login: loginTime,
            };
            updateUser(loginData).then((res: any) => {
              Swal.fire({
                icon: "success",
                // title: "SuccessFull",
                text: "Login Successfully",
              });
              navigate(from, { replace: true });
            });
          } else {
            // console.log(res)
            Swal.fire({
              icon: "error",
              toast: true,
              title: `${res?.error?.data?.message}`,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error: any) => {
          // Handle the error
          console.error("Error login:", error);
          Swal.fire({
            icon: "error",
            toast: true,
            title: "Something went wrong",
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Global Path Liquidators</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-lg mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6 border rounded-lg shadow-lg p-10">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forget-password" className="text-sm text-green-600">
                  Forget password?
                </Link>
              </span>
              <Input
                type="password"
                className="mt-1"
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </label>
            <ButtonPrimary
              onClick={() => {
                handleLoginUser();
              }}
            >
              Login
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link className="text-green-600" to="/signup">
              Create an account
            </Link>
          </span>

          {/* OR */}
          {/* <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div> */}

          {/* SOCIAL LOGIN */}
          {/* <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
