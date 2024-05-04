import React, { useEffect, useState } from "react";
import BinStoreDayCard from "./BinStoreDayCard";
import { Helmet } from "react-helmet-async";
import {
  useGetAllWeekdaysQuery,
  useGetWeeklyBinProductsQuery,
} from "features/api/binStore";

export type BinProduct = {
  bin_id: number;
  product_id: number;
  feature_date: string;
  bin_status: "active" | "inactive";
  weekday: string;
  flat_rate: number;
  created_at: string;
  updated_at: string;
  product_name: string;
  product_image: string;
  category_id: number;
  condition_id: number | null;
  store_id: number;
  manifest_status: number;
  manifest_url: string | null;
  price: number;
  product_status: "active" | "inactive";
  allow_offers: 0 | 1;
  offer_def: string | null;
  product_desc: string | null;
  category_name: string;
  category_status: "active" | "inactive";
  condition_name: string | null;
  store_name: string;
  store_open: 0 | 1;
};

export interface WeekDay {
  date: string;
  products: Array<BinProduct>;
}

export interface IWeekDays {
  [key: string]: WeekDay;
}

const BinStore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weekdays, setWeekdays] = useState<IWeekDays | null>(null);

  const {
    data: weeklyBinProductsData,
    isLoading: weeklyBinProductsDataLoading,
  } = useGetWeeklyBinProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(weeklyBinProductsData);
  const { data: weekdaysData } = useGetAllWeekdaysQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // console.log(weekdaysData);
  // console.log(weekdays);

  useEffect(() => {
    if (!weeklyBinProductsDataLoading && weeklyBinProductsData) {
      setWeekdays(weeklyBinProductsData?.result);
      setIsLoading(false);
    }
  }, [weeklyBinProductsDataLoading, weeklyBinProductsData]);

  return (
    <div>
      <Helmet>
        <title>Bin Store || Global Path Liquidators</title>
      </Helmet>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : weekdays ? (
        !weeklyBinProductsDataLoading &&
        weekdays &&
        Object.keys(weekdays).map((day, index) => {
          if (
            weekdaysData?.result.find(
              (dayData: any) =>
                dayData.weekday_name.toLowerCase() === day.toLowerCase()
            )?.bin_status !== 1
          )
            return "";
          if (weekdays[day].products?.length === 0) return "";
          // console.log(weekdays[day]);
          return (
            <BinStoreDayCard
              key={index}
              dayName={day}
              weeklyProducts={weekdays[day] as WeekDay}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinStore;
