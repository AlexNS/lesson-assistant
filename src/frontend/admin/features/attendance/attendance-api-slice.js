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
      }),
      fetchLessonAttendanceFormInfo: builder.query({
        query(id) {
          return `/lessons/${id}/attendance-form`;
        },
        providesTags: (result, error, id) => [{ type: 'LessonAttendanceForm', id }]
      }),
      createLessonAttendanceForm: builder.mutation({
        query: (lessonId) => ({
          url: `/lessons/${lessonId}/attendance-form`,
          method: 'POST',
        }),
        invalidatesTags: (result, error, data) =>[{ type: 'LessonAttendanceForm', id: data }],
      }),
      disableLessonAttendanceForm: builder.mutation({
        query: (lessonId) => ({
          url: `/lessons/${lessonId}/attendance-form/disable`,
          method: 'POST',
        }),
        invalidatesTags: (result, error, data) =>[{ type: 'LessonAttendanceForm', id: data }],
      }),
      enableLessonAttendanceForm: builder.mutation({
        query: (lessonId) => ({
          url: `/lessons/${lessonId}/attendance-form/enable`,
          method: 'POST',
        }),
        invalidatesTags: (result, error, data) =>[{ type: 'LessonAttendanceForm', id: data }],
      }),
    };
  },
});

export const { useFetchLessonAttendanceQuery, useAddLessonAttendanceMutation, 
               useFetchLessonAttendanceFormInfoQuery, useCreateLessonAttendanceFormMutation,
               useDisableLessonAttendanceFormMutation, useEnableLessonAttendanceFormMutation
             } = attendanceApiSlice;