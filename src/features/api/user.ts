import { apiSlice } from "./apiSlice";

const user = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "/users/allUsers",
            }),
            providesTags: ["user"],
        }),
        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/users/getUser/${userId}`,
            }),
            providesTags: ["user"],
        }),
        getReferredUsers: builder.query({
            query: (userId) => ({
                url: `/users/referred_users/${userId}`,
            }),
            providesTags: ["user"],
        }),

        createLoginUser: builder.mutation({
            query: (data) => ({
                url: `/users/signin`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        createUser: builder.mutation({
            query: (data) => ({
                url: `/users/register`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/users/update-user/${data.id}`,
                method: "PATCH",
                body: { last_login: data.last_login },
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useGetReferredUsersQuery,
    useCreateLoginUserMutation,
    useCreateUserMutation,
    useUpdateUserMutation,
} = user;
