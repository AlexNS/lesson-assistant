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
      })
    };
  },
});

export const { useFetchLessonAttendanceQuery } = attendanceApiSlice;