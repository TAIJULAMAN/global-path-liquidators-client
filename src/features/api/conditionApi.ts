import { apiSlice } from "./apiSlice";

const conditionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllConditionsWithQuery: builder.query({
      query: () => ({
        url: `/conditions/get-conditions`,
      }),
      providesTags: ["conditions"],
    }),
  }),
});

export const { useGetAllConditionsWithQueryQuery } = conditionApi;
