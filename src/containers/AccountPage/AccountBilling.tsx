import React from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";

const AccountBilling = () => {
  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Payments & payouts
          </h2>
          <div className="max-w-2xl prose prose-slate dark:prose-invert">
            <span className="">
              When you receive a payment for a order, we call that payment to
              you a "payout." Our secure payment system supports several payout
              methods, which can be set up below. Go to FAQ.
              <br />
              <br />
              To get paid, you need to set up a payout method releases payouts
              about 24 hours after a guest’s scheduled time. The time it takes
              for the funds to appear in your account depends on your payout
              method.{` `}
              <a href="##">Learn more</a>
            </span>
            <div className="pt-10">
              <ButtonPrimary>Add payout mothod</ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountBilling;
