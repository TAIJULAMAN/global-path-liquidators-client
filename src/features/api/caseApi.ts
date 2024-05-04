import { apiSlice } from "./apiSlice";

const cases = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCasesWithQuery: builder.query({
      query: (queries) => ({
        url: `/cases/get-case-products?${queries.category_id && "category_id=" + queries.category_id
          }&${queries.condition_id && "condition_id=" + queries.condition_id}
          &${queries.manifest_status &&
          "manifest_status=" + queries.manifest_status
          }&${queries.store_id && "store_id=" + queries.store_id}
          &${queries.price_min && "price_min=" + queries.price_min}
          &${queries.price_max && "price_max=" + queries.price_max}
          &${queries.page && "page=" + queries.page}
          &${queries.perPage && "limit=" + queries.perPage}`,
      }),
      providesTags: ["cases"],
    }),

    getAllcasesProducts: builder.query({
      query: () => ({
        url: `/cases/get-case-products`,
      }),
      providesTags: ["cases"],
    }),

    getSingleCaseData: builder.query({
      query: (id) => ({
        url: `/cases/get-single-case-product/${id}`,
      }),
      providesTags: ["cases"],
    }),
    getCaseProductPhotos: builder.query({
      query: (id) => ({
        url: `/images/product-images/${id}`,
      }),
      providesTags: ["cases"],
    }),
  }),
});

export const {
  useGetAllCasesWithQueryQuery,
  useGetSingleCaseDataQuery,
  useGetCaseProductPhotosQuery,
  useGetAllcasesProductsQuery,
} = cases;
