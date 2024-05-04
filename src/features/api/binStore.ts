import { apiSlice } from "./apiSlice";

const binStore = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllbinstore: builder.query({
      query: (query) => ({
        url: `/bin-store/bin-items?${query}`,
      }),
      providesTags: ["binstore"],
    }),

    getAllFaq: builder.query({
      query: () => ({
        url: "/FAQ/all_faqs",
      }),
      providesTags: ["binstore"],
    }),

    getWeeklyBinProducts: builder.query({
      query: () => ({
        url: `/bin-store/weekly-products`,
      }),
      providesTags: ["binstore"],
    }),
    getAllWeekdays: builder.query({
      query: () => ({
        url: `/weekdays/all-weekdays`,
      }),
      providesTags: ["weekdays"],
    }),
  }),
});

export const {
  useGetAllbinstoreQuery,
  useGetWeeklyBinProductsQuery,
  useGetAllWeekdaysQuery,
  useGetAllFaqQuery,
} = binStore;
