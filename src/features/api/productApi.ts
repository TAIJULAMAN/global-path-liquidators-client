import { apiSlice } from "./apiSlice";

const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // getAllTruckloads: builder.query({
        //     query: () => ({
        //         url: "/truckloads/getAllTruckloadProducts",
        //     }),
        //     providesTags: ["truckload"],
        // }),
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `products/single-product/${id}`,
            }),
            providesTags: ["single-product"],
        }),
        getProductManifestList: builder.query({
            query: (id) => ({
                url: `products/product-manifest?url=${id}`,
            }),
            providesTags: ["single-product"],
        }),
    }),
});

export const {
    // useGetAllTruckloadsQuery,
    useGetSingleProductQuery,
    useGetProductManifestListQuery
} = productApi;