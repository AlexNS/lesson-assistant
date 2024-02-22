import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from '../utils';

export const lessonsApiSlice = createApi({
  reducerPath: 'apiLessons',
  baseQuery: getApiBaseQuery(),
  endpoints(builder) {
    return {
      fetchLessons: builder.query({
        query() {
          return `/lessons`;
        },
        providesTags: (result) => result ? result.map(({ id }) => ({ type: 'Lessons', id })) : [],
      }),
      addLesson: builder.mutation({
        query: ({title, date, course}) => ({
          url: '/lessons',
          method: 'POST',
          body: {
            title,
            date,
            courseId: course
          },
        }),
        invalidatesTags: ['Lessons']
      })
    };
  },
});

export const { useFetchLessonsQuery, useAddLessonMutation } = lessonsApiSlice;