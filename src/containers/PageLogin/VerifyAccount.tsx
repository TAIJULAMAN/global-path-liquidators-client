import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from 'shared/Input/Input';
import Swal from 'sweetalert2';
import Label from "components/Label/Label";
import ButtonPrimary from 'shared/Button/ButtonPrimary';

const VerifyAccount = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [verificationCode, setVerificationCode] = useState('');

    const handleVerifyAccount = async () => {

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
                    text: "Account Verification Successful",
                }).then(() => {
                    navigate('/');
                    setIsLoading(false);
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20 space-y-10 min-h-screen">
            {
                isLoading ?
                    <>
                        <div className="flex justify-center items-center h-48">
                            <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
                        </div>
                    </> :
                    <></>
            }
            <div className='mx-auto max-w-lg mx-auto space-y-6 shadow rounded-xl p-5 md:p-10 border '>
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
                        className=""
                        type="submit"
                        onClick={handleVerifyAccount}
                    >
                        Enter
                    </ButtonPrimary>
                </div>

            </div>

        </div>
    );
};

export default VerifyAccount;