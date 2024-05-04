import Label from 'components/Label/Label';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import Swal from 'sweetalert2';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState('');
    const [userId, setUserId] = useState('');


    const [showState, setShowState] = useState('email');

    const handleVerifyEmail = async () => {
        try {
            const response = await fetch(
                "https://darktechteam.com/api/users/forget_password_email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                }
            );
            const res = await response.json();

            if (res?.success) {
                Swal.fire({
                    icon: "success",
                    text: `${res?.message}`,
                }).then(() => {
                    setShowState('verify-code')
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: `${res?.message}`,
                })
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await fetch(
                "https://darktechteam.com/api/users/verify_user",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        verification_code: verificationCode
                    })
                }
            );

            const res = await response.json();



            // console.log(res)

            if (res?.success) {
                localStorage.setItem("token", res?.result?.accessToken);
                localStorage.setItem("UserDetails", JSON.stringify(res?.result));

                Swal.fire({
                    icon: "success",
                    text: "Verification Successful, Please change your password",
                }).then(() => {
                    setUserId(res?.result?.user?.user_id)
                    setShowState('password')
                })
            } else {
                Swal.fire({
                    icon: "error",
                    text: `${res?.message}`,
                })
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                icon: "error",
                toast: true,
                title: "Password doesn't match, Try again",
                position: "top-end",
                showConfirmButton: true,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }
        try {
            const response = await fetch(
                `https://darktechteam.com/api/users/change-password/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: newPassword,
                    })
                }
            );

            const res = await response.json();

            console.log(res)

            if (res?.success) {
                Swal.fire({
                    icon: "success",
                    text: `${res?.message}`,
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    icon: "error",
                    text: `${res?.message || "Please Try Again"}`,
                })
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={`nc-PageLogin `} data-nc-id="PageLogin">
            <Helmet>
                <title>Forget Password || Global Path Liquidators</title>
            </Helmet>
            <div className="container my-24 lg:my-32 space-y-6">
                {showState === 'email' ? <div className="max-w-lg mx-auto space-y-6">
                    <form className="grid grid-cols-1 gap-6 border rounded-lg shadow-lg p-10">
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
                        <div className='flex justify-end'>
                            <ButtonPrimary
                                type="submit"
                                onClick={handleVerifyEmail}
                            >
                                Enter
                            </ButtonPrimary>
                        </div>
                    </form>
                </div> : <></>}

                {showState === 'verify-code' ? <div className="max-w-lg mx-auto space-y-6">
                    <form className="grid grid-cols-1 gap-6 border rounded-lg shadow-lg p-10">
                        <div>
                            <Label>Verification Code</Label>
                            <div className="mt-2 flex">
                                <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                                    <i className="text-2xl las la-key"></i>
                                </span>
                                <Input
                                    type="text"
                                    className="!rounded-l-none"
                                    placeholder="Enter Verification Code"
                                    onChange={(e: any) =>
                                        setVerificationCode(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <ButtonPrimary
                                type="submit"
                                onClick={handleVerifyCode}
                            >
                                Enter
                            </ButtonPrimary>
                        </div>
                    </form>
                </div> : <></>}
                {showState === 'password' ? <div className="max-w-lg mx-auto space-y-6">
                    <form className="grid grid-cols-1 gap-6 border rounded-lg shadow-lg p-10">
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
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
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
                                        setConfirmNewPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <ButtonPrimary
                            onClick={() => {
                                handleChangePassword()
                            }}
                        >
                            Change Password
                        </ButtonPrimary>
                    </form>

                </div> : <></>}

            </div>
        </div>
    );
};

export default ForgetPassword;