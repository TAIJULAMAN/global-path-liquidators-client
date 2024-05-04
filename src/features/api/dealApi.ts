import { apiSlice } from "./apiSlice";

const deal = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDealData: builder.query({
      query: () => ({
        url: `/deal-types/all-dealtypes`,
      }),
      providesTags: ["deals"],
    }),

    getDealBySign: builder.query({
      query: (sign) => ({
        url: `/deal-types/dealtype/sign/${sign}`,
      }),
      providesTags: ["deals"],
    }),
  }),
});

export const { useGetAllDealDataQuery, useGetDealBySignQuery } = deal;
