import { apiSlice } from "./apiSlice";

const auction = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllAuctionData: builder.query({
    //   query: () => ({
    //     url: "/auctions/getAllAuctionProductss",
    //   }),
    //   providesTags: ["auction"],
    // }),


    getAllAuctionData: builder.query({
      query: (queries) => ({
        url: `/auctions/getAllAuctionProductss?status=1&${queries.page && "page=" + queries.page}
                &${queries.perPage && "limit=" + queries.perPage}`,
      }),
      providesTags: ["auction"],
    }),

    getAuctionDetails: builder.query({
      query: (id) => ({
        url: `/auctions/getSingleAuctionProducts/${id}`,
      }),
      providesTags: ["auction"],
    }),

    createBidItems: builder.mutation({
      query: (data) => ({
        url: `/bids/create-bid`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auction"],
    }),
    createBidInfo: builder.mutation({
      query: (data) => ({
        url: `/auctionInfo/create-auction-info`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auction"],
    }),
    getAuctionProductPhotos: builder.query({
      query: (id) => ({
        url: `/images/product-images/${id}`,
      }),
      providesTags: ["auction"],
    }),
    getAllBidHistory: builder.query({
      query: (id) => ({
        url: `/bids/auction-bids/${id}`,
      }),
      providesTags: ["auction"],
    }),
    getSingleUserBidHistory: builder.query({
      query: (bidId) => ({
        url: `/bidHistory/bids/${bidId}`,
      }),
      providesTags: ["auction"],
    }),
    getSingleBidDetails: builder.query({
      query: (id) => ({
        url: `/bids/single-bid/${id}`,
      }),
      providesTags: ["auction"],
    }),
    getauctionProductWinner: builder.query({
      query: (auctionId) => ({
        url: `history/auction-product-winner/${auctionId}`,
      }),
      providesTags: ["auction"],
    }),
    updateAuction: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/auctions/update-item/${id}`,
          method: "put",
          body: data,
        }
      },
    }),
    updateBid: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/bids/update-bid/${id}`,
          method: "put",
          body: data,
        }
      },
    }),
  }),
});

export const {
  useGetAllAuctionDataQuery,
  useGetAuctionDetailsQuery,
  useCreateBidItemsMutation,
  useGetAuctionProductPhotosQuery,
  useGetAllBidHistoryQuery,
  useGetSingleBidDetailsQuery,
  useCreateBidInfoMutation,
  useUpdateAuctionMutation,
  useUpdateBidMutation,
  useGetSingleUserBidHistoryQuery,
  useGetauctionProductWinnerQuery
} = auction;
