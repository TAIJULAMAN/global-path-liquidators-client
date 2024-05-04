import { apiSlice } from "./apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderData: builder.query({
      query: (orderId) => ({
        url: `/orderItems/items-by-order-id/${orderId}`,
      }),
      providesTags: ["order-items"],
    }),
    getOrderTrackingInfo: builder.query({
      query: (orderId) => ({
        url: `/orderTracking/get-order-tracker/${orderId}`,
      }),
      providesTags: ["order-tracking"],
    }),
    getUserOrdersWithQuires: builder.query({
      query: (queries) => ({
        url: `/orders/user-orders/${queries.userId}?${queries.deal_type_id && "deal_type_id=" + queries.deal_type_id
          }&${queries.order_month && "order_month=" + queries.order_month}&${queries.order_status && "order_status=" + queries.order_status}`,
      }),
      providesTags: ["order-tracking"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: `/orders/create-order`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["order-items"],
    }),
    removeSingleCart: builder.mutation({
      query: (id) => ({
        url: `/cart/remove-cart-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order-items"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderTrackingInfoQuery,
  useGetUserOrdersWithQuiresQuery,
  useRemoveSingleCartMutation,
  useGetOrderDataQuery,
} = orderApi;
