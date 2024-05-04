import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://darktechteam.com/api",
  }),
  endpoints: (builder) => ({}),
  tagTypes: [
    "user",
    "binstore",
    "pallet-page",
    "cases",
    "truckload",
    "truckload-single",
    "auction",
    "show_cartlist",
    "cart-items-list",
    "single-product",
    "cart-items",
    "order-items",
    "order-tracking",
    "weekdays",
    "notifications",
    "settings",
    "deals",
    "conditions",
    "comments",
    "ref-bonus",
    "subs",
  ],
});
