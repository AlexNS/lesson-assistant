import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const studentsApiSlice = createApi({
  reducerPath: 'apiStudents',
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
      fetchStudents: builder.query({
        query() {
          return `/students`;
        },
      }),
    };
  },
});

export const { useFetchStudentsQuery } = studentsApiSlice;