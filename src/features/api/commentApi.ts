import { apiSlice } from "./apiSlice";

const comments = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCommentsForAttachment: builder.mutation({
            query: (data) => ({
                url: `/attachments/upload`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["comments"],
        }),

        getTIcketsComment: builder.query({
            query: (ticketId) => ({
                url: `/ticket-comments/ticket-comments/${ticketId}`,
            }),
            providesTags: ["comments"],
        }),
    }),
});

export const { useCreateCommentsForAttachmentMutation,useGetTIcketsCommentQuery } = comments;
