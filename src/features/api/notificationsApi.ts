import { apiSlice } from "./apiSlice";

const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserNotifications: builder.query({
            query: (userId) => ({
                url: `/notifications/user-notifications/${userId}`,
            }),
            providesTags: ["notifications"],
        }),
        updateNotification: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/notifications/update-notification/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["notifications"],
        }),
    })
});

export const {
    useGetUserNotificationsQuery,
    useUpdateNotificationMutation
} = notificationsApi