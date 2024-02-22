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
        providesTags: (result) => result
          ? [
              ...result.map(({ id }) => ({ type: 'Lesson', id })),
              { type: 'Lesson', id: 'LIST' },
            ]
          : [{ type: 'Lesson', id: 'LIST' }],
      }),
      getLesson: builder.query({
        query(id) {
          return `/lessons/${id}`;
        },
        providesTags: (result, error, id) => [{ type: 'Lesson', id }],
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
        invalidatesTags: [{ type: 'Post', id: 'LIST' }],
      })
    };
  },
});

export const { useFetchLessonsQuery, useAddLessonMutation, useGetLessonQuery } = lessonsApiSlice;