import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const lessonsApiSlice = createApi({
  reducerPath: 'apiLessons',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders(headers, { getState }) {
      const { auth: { userToken } } = getState()
      headers.set('Authorization', `Bearer ${userToken}`);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchLessons: builder.query({
        query() {
          return `/lessons`;
        },
        providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Lessons', id })) : [],
      }),
      addLesson: builder.mutation({
        query: ({title, date}) => ({
          url: '/lessons',
          method: 'POST',
          body: {
            title,
            date
          },
        }),
        invalidatesTags: ['Lessons']
      })
    };
  },
});

export const { useFetchLessonsQuery, useAddLessonMutation } = lessonsApiSlice;