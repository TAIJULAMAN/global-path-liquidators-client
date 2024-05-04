import { apiSlice } from "./apiSlice";

const truckloadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTruckloads: builder.query({
      query: (queries) => ({
        url: `/truckloads/getAllTruckloadProducts?${
          queries.category_id && "category_id=" + queries.category_id
        }&${queries.condition_id && "condition_id=" + queries.condition_id}
                      &${
                        queries.manifest_status &&
                        "manifest_status=" + queries.manifest_status
                      } &${queries.store_id && "store_id=" + queries.store_id}
          &${queries.price_min && "price_min=" + queries.price_min}
                &${queries.price_max && "price_max=" + queries.price_max}
                &${queries.page && "page=" + queries.page}
                &${queries.perPage && "limit=" + queries.perPage}`,
      }),
      providesTags: ["truckload"],
    }),
    getAllTruckloadsWithoutQueries: builder.query({
      query: () => ({
        url: `/truckloads/getAllTruckloadProducts`,
      }),
      providesTags: ["truckload"],
    }),

    getTruckload: builder.query({
      query: (id) => ({
        url: `truckloads/getSingleTruckloadProduct/${id}`,
      }),
      providesTags: ["truckload-single"],
    }),
  }),
});

export const {
  useGetAllTruckloadsQuery,
  useGetAllTruckloadsWithoutQueriesQuery,
  useGetTruckloadQuery,
} = truckloadApi;
