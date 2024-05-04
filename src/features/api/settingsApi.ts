import { apiSlice } from "./apiSlice";

const settingsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => ({
                url: `/gpl_settings/all_settings`,
            }),
            providesTags: ["settings"],
        }),
        getDealType: builder.query({
            query: () => ({
                url: `/deal-types/all-dealtypes`,
            }),
            providesTags: ["settings"],
        }),
        getAllLinks: builder.query({
            query: () => ({
                url: "/socialLinks/all_links",
            }),
          
        }),
        
    })
});

export const {
    useGetSettingsQuery,
    useGetAllLinksQuery,
    useGetDealTypeQuery
} = settingsApi