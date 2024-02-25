import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from '../utils';

export const attendanceApiSlice = createApi({
  reducerPath: 'apiAttendance',
  baseQuery: getApiBaseQuery(),
  endpoints(builder) {
    return {
      fetchLessonAttendance: builder.query({
        query(id) {
          return `/lessons/${id}/attendance`;
        },
        providesTags: (result, error, id) => [{ type: 'LessonAttendance', id: 'LIST_'+id }]
      }),
      addLessonAttendance: builder.mutation({
        query: ({lessonId, email}) => ({
          url: `/lessons/${lessonId}/attendance`,
          method: 'POST',
          body: {
            email
          },
        }),
        invalidatesTags: (result, error, data) =>[{ type: 'LessonAttendance', id: 'LIST_'+data.lessonId }],
      })
    };
  },
});

export const { useFetchLessonAttendanceQuery, useAddLessonAttendanceMutation } = attendanceApiSlice;