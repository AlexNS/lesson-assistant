import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from '../utils';

export const studentsApiSlice = createApi({
  reducerPath: 'apiStudents',
  baseQuery: getApiBaseQuery(),
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