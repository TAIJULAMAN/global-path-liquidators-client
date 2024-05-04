import React, { FC, useState } from "react";
// import facebookSvg from "images/Facebook.svg";
// import twitterSvg from "images/Twitter.svg";
// import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Label from "components/Label/Label";
import Swal from "sweetalert2";
import Checkbox from "shared/Checkbox/Checkbox";
import {
    useCreateLoginUserMutation,
    useCreateUserMutation,
    useUpdateUserMutation,
} from "features/api/user";
import { HiRefresh } from "react-icons/hi";

export interface PageSignUpProps {
    className?: string;
}

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   // {
//   //   name: "Continue with Twitter",
//   //   href: "#",
//   //   icon: twitterSvg,
//   // },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const referralCode = searchParams.get("ref-code");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [purchaseAgreement, setPurchaseAgreement] = useState(false);


    // const generateCaptcha = () => {
    //     const captcha = Math.floor(100000 + Math.random() * 9000);
    //     return captcha.toString();
    // }


    // const generateCaptcha = () => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&';
    //     let captcha = '';
    //     for (let i = 0; i < 8; i++) { // Change 6 to the desired length of your captcha
    //         captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    //     }
    //     return captcha;
    // }

    const generateCaptcha = () => {
        const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
        const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '@#$&';

        let captcha = '';

        // Generate 2 small letters
        for (let i = 0; i < 2; i++) {
            captcha += smallLetters.charAt(Math.floor(Math.random() * smallLetters.length));
        }

        // Generate 2 capital letters
        for (let i = 0; i < 2; i++) {
            captcha += capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length));
        }

        // Generate 2 numbers
        for (let i = 0; i < 2; i++) {
            captcha += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        // Generate 1 symbol
        captcha += symbols.charAt(Math.floor(Math.random() * symbols.length));

        // Shuffle the captcha characters
        captcha = captcha.split('').sort(() => Math.random() - 0.5).join('');

        // Ensure the total length is 8 digits
        if (captcha.length < 8) {
            const remainingLength = 8 - captcha.length;
            for (let i = 0; i < remainingLength; i++) {
                captcha += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
        } else if (captcha.length > 8) {
            captcha = captcha.substring(0, 8); // Trim excess characters
        }

        return captcha;
    }

    const regenerateCaptcha = () => {
        const newCaptcha = generateCaptcha();
        setCaptcha(newCaptcha);
    }

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [enterCaptcha, setEnterCaptcha] = useState("");

    // console.log(yearsInBusiness)

    // console.log(purchaseAgreement)

    const [userRegistration, { data }] = useCreateUserMutation();
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

    const handleUserRegistration = async () => {
        // e.preventDefault();

        const user_info = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            phone_number: phone,
            ref_code: referralCode ? referralCode : '',
        };

        // const checked = await checkFields()

        if (
            firstName === "" ||
            lastName === "" ||
            phone === "" ||
            email === "" ||
            password === ""
        ) {
            Swal.fire({
                icon: "error",
                toast: true,
                title: `${!firstName
                    ? "Please Enter Your First Name"
                    : !lastName
                        ? "Please Enter Your Last Name"
                        : !phone
                            ? "Please Enter Your Phone Number"
                            : !email
                                ? "Please Enter Your Email Address"
                                : !password
                                    ? "Please Enter Your Password"
                                    : ""
                    }`,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
            });

        } else if (captcha !== enterCaptcha) {
            Swal.fire({
                icon: "warning",
                toast: true,
                title: "Your captcha is incorrect, Please try again",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            regenerateCaptcha();
            return
        } else if (!purchaseAgreement) {
            Swal.fire({
                icon: "warning",
                toast: true,
                title: "Please agree with Merchandise Purchase Agreement to register",
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return
        } else {
            await userRegistration(user_info)
                .then(async (res: any) => {
                    // console.log(res);
                    Swal.fire({
                        icon: "success",
                        text: "Please check email, To verify your account",
                    }).then((res: any) => {
                        navigate('/account/verify');
                    })

                })
                .catch((error: any) => {
                    // Handle the error
                    console.error("Error login:", error);
                });
        };

    };

    return (
        <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
            <Helmet>
                <title>Sign up || Global Path Liquidators</title>
            </Helmet>
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    Signup
                </h2>
                <div className="max-w-3xl mx-auto space-y-6 ">
                    {/* FORM */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-lg shadow-lg p-10" >
                        {/* ---- */}
                        <div>
                            <Label>First Name</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-user"></i>
                                </span>
                                <Input
                                    className="!rounded-l-none"
                                    placeholder="Enter First Names"
                                    required
                                    onChange={(e: any) =>
                                        setFirstName(e.target.value)

                                    }
                                />
                            </div>
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                className="mt-1.5"
                                placeholder="Enter Last Name"
                                onChange={(e: any) =>
                                    setLastName(e.target.value)
                                }
                            />
                        </div>
                        {/* ---- */}
                        <div className="md:col-span-2">
                            <Label>Phone number</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-phone-volume"></i>
                                </span>
                                <Input
                                    type="number"
                                    className="!rounded-l-none"
                                    placeholder="Enter Phone Number"
                                    min={0}
                                    onChange={(e: any) =>
                                        setPhone(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* ---- */}
                        <div>
                            <Label>Email</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-envelope"></i>
                                </span>
                                <Input
                                    type="email"
                                    className="!rounded-l-none"
                                    placeholder="Enter Email Address "
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* ---- */}
                        <div>
                            <Label>Password</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-key"></i>
                                </span>
                                <Input
                                    type="password"
                                    className="!rounded-l-none"
                                    placeholder="Enter Password"
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* ---- */}
                        <div>
                            <Label>Enter Captcha</Label>
                            <div className="mt-1.5 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-key"></i>
                                </span>
                                <Input
                                    type="text"
                                    className="!rounded-l-none"
                                    placeholder="Enter Captcha"
                                    min={0}
                                    onChange={(e: any) =>
                                        setEnterCaptcha(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* ---- */}
                        <div>
                            <Label>Captcha</Label>
                            <div className="mt-1.5 flex items-center justify-between border rounded-2xl h-11 px-4 py-3 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
                                {/* <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-key"></i>
                                </span> */}
                                <h1
                                    className="text-2xl"
                                    style={{ letterSpacing: "6px" }}
                                >
                                    {captcha}
                                </h1>
                                <button onClick={regenerateCaptcha}>
                                    <HiRefresh className="text-2xl" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Checkbox
                                name="check"
                                label=""
                                sizeClassName="w-5 h-5"
                                labelClassName="text-sm font-normal "
                                onChange={(e: any) => setPurchaseAgreement(e)}
                            />
                            <Link to="/merchandise-purchase-agreement">
                                < label className="hover:text-blue-500 cursor-pointer">Merchandise Purchase Agreement</label>
                            </Link >

                        </div>

                        <ButtonPrimary
                            className="md:col-span-2"
                            type="submit"
                            onClick={handleUserRegistration}
                        >
                            Register
                        </ButtonPrimary>
                    </form>

                    {/* ==== */}
                    <span className="block text-center text-neutral-700 dark:text-neutral-300">
                        Already have an account? {` `}
                        <Link className="text-green-600" to="/login">
                            Sign in
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
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className=" flex justify-center gap-3 w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className=" text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div> */}
                </div>
            </div >
        </div >
    );
};

export default PageSignUp;
