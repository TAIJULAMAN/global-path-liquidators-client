import { apiSlice } from "./apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCartShow: builder.query({
      query: (userId) => ({
        url: `cart/cart-items/${userId}`,
      }),
      providesTags: ["cart-items"],
    }),

    getCartCheckout: builder.query({
      query: (userId) => ({
        url: `/cart/checkout-items/${userId}`,
      }),
      providesTags: ["cart-items"],
    }),

    getAllTerms: builder.query({
      query: () => ({
        url: "/termsConditions/get_all",
      }),
      // providesTags: ["home/all-product"],
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: "/home/all-product",
      }),
      // providesTags: ["home/all-product"],
    }),

    addToCart: builder.mutation({
      query: (data) => ({
        url: `/addToCartProduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart-items"],
    }),

    getCartItems: builder.query({
      query: (userId) => ({
        url: `cart/cart-items/${userId}`,
      }),
      providesTags: ["cart-items"],
    }),
    getOrderData: builder.query({
      query: (orderId) => ({
        url: `/orderItems/items-by-order-id/${orderId}`,
      }),
      providesTags: ["cart-items"],
    }),
    createCartItems: builder.mutation({
      query: (data) => ({
        url: `/cart/create-cart-item`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart-items"],
    }),
    removeSingleCart: builder.mutation({
      query: (id) => ({
        url: `/cart/remove-cart-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart-items"],
    }),
    removeUserCart: builder.mutation({
      query: (id) => ({
        url: `/cart/remove-all-cart-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart-items"],
    }),
  }),
});

export const {
  useGetAllCartShowQuery,
  useGetCartCheckoutQuery,
  useGetAllProductsQuery,
  useGetAllTermsQuery,
  useGetCartItemsQuery,
  useAddToCartMutation,
  useCreateCartItemsMutation,
  useRemoveSingleCartMutation,
  useGetOrderDataQuery,
  useRemoveUserCartMutation,
} = cartApi;
