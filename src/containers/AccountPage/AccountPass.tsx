import Label from "components/Label/Label";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import axios from "axios";
import Swal from "sweetalert2";

const AccountPass = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [passMatch, setPasswordMatch] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }

  const userId = userDetails?.user?.user_id;

  const handleNewPasswordChange = (event: any) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangePssword = async () => {
    if (newPassword !== confirmPassword) {
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
      const response = await axios.put(
        `https://darktechteam.com/api/users/change-password/${userId}`,
        {
          password: newPassword,
        }
      );

      // console.log(response.data);
      const message = response.data?.message;
      if (message === "Password changed successfully") {
        Swal.fire({
          icon: "success",
          title: message,
          showConfirmButton: true,

        });
        setCurrentPassword("");
        setNewPassword("");
        setPasswordMatch(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://darktechteam.com/api/users/check-password/${userId}`,
        {
          password: currentPassword,
        }
      );

      // console.log(response.data);
      setPasswordMatch(response.data?.success);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">

          <div className="space-y-5 sm:space-y-6 shadow-lg rounded-lg border px-10 py-10">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Update your password
            </h2>
            <div className=" space-y-6">
              <div>
                <Label>Current password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    e.preventDefault();
                    setCurrentPassword(e.target.value);
                  }}
                  className="mt-1.5"

                />
              </div>
              {passMatch === true && (
                <div>
                  <div>
                    <Label>New password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="mt-1.5"
                    // disabled={passMatch === false ? true : false}
                    />
                  </div>
                  <div>
                    <Label>Confirm password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    // className="mt-1.5"
                    // disabled={passMatch === false ? true : false}
                    />
                  </div>
                </div>

              )}
              {passMatch === true && (
                <div>
                  <div className="flex justify-center pt-2">
                    <ButtonPrimary
                      onClick={() => {
                        handleChangePssword();
                      }}
                    >
                      Update password
                    </ButtonPrimary>
                  </div>
                </div>
              )}
              {passMatch === false && (
                <div className="flex justify-center pt-2">
                  <ButtonPrimary
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Update password
                  </ButtonPrimary>
                </div>
              )}
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
