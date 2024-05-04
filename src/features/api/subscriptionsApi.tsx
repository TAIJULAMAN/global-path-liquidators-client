import { apiSlice } from "./apiSlice";

const subscriptionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getSubscriptions: builder.query({
            query: (userId) => ({
                url: `subscription/subscribers/user/${userId}`,
            }),
            providesTags: ["subs"],
        }),
    }),
});

export const { useGetSubscriptionsQuery} = subscriptionsApi;
