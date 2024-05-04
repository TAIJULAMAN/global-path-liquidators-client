// import Label from "components/Label/Label";
import React, { FC } from "react";
// import ButtonPrimary from "shared/Button/ButtonPrimary";
// import Input from "shared/Input/Input";
// import Select from "shared/Select/Select";
// import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet-async";
// import { avatarImgs } from "contains/fakeData";
import DashboardCommonLayout from "./DashboardCommonLayout";
import DashboardCounter from "./DashboardCounter/DashboardCounter";


export interface AccountPageProps {
  className?: string;
}

const Dashboard: FC<AccountPageProps> = ({ className = "" }) => {
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Dashboard || User Dashboard</title>
      </Helmet>
      <DashboardCommonLayout>
        <div className="space-y-5 sm:space-y-6  justify-center">
          <DashboardCounter />
        </div>
      </DashboardCommonLayout>
    </div>
  );
};

export default Dashboard;
