import { apiSlice } from "./apiSlice";

const referralsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getSettings: builder.query({
        //     query: () => ({
        //         url: `/gpl_settings/all_settings`,
        //     }),
        //     providesTags: ["settings"],
        // }),
        // getDealType: builder.query({
        //     query: () => ({
        //         url: `/deal-types/all-dealtypes`,
        //     }),
        //     providesTags: ["settings"],
        // }),
        addNewReferralBonus: builder.mutation({
            query: (data) => ({
                url: `/referrals/new-bonus`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["ref-bonus"],
        }),
    })
});

export const {
    useAddNewReferralBonusMutation
} = referralsApi