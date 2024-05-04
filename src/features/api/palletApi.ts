import { apiSlice } from "./apiSlice";

const palletDeals = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPalletDeals: builder.query({
      query: (queries) => ({
        url: `/pallet-deals/all-pallets?${
          queries.category_id && "category_id=" + queries.category_id
        }&${queries.condition_id && "condition_id=" + queries.condition_id}
          &${
            queries.manifest_status &&
            "manifest_status=" + queries.manifest_status
          }&${queries.store_id && "store_id=" + queries.store_id}
          &${queries.price_min && "price_min=" + queries.price_min}
          &${queries.price_max && "price_max=" + queries.price_max}
          &${queries.page && "page=" + queries.page}
          &${queries.perPage && "limit=" + queries.perPage}`,
      }),
      providesTags: ["pallet-page"],
    }),

    getAllPalletDealsWithoutState: builder.query({
      query: () => ({
        url: `/pallet-deals/all-pallets`,
      }),
      providesTags: ["pallet-page"],
    }),

    getPalletDeal: builder.query({
      query: (id) => ({
        url: `/pallet-deals/single-pallet/${id}`,
      }),
      providesTags: ["pallet-page"],
    }),
    getPalletProductPhotos: builder.query({
      query: (id) => ({
        url: `/images/product-images/${id}`,
      }),
      providesTags: ["pallet-page"],
    }),
  }),
});

export const {
  useGetAllPalletDealsQuery,
  useGetPalletDealQuery,
  useGetPalletProductPhotosQuery,
  useGetAllPalletDealsWithoutStateQuery,
} = palletDeals;
