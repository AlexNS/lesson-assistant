import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from '../utils';

export const coursesApiSlice = createApi({
  reducerPath: 'apiCourses',
  baseQuery: getApiBaseQuery(),
  endpoints(builder) {
    return {
      fetchCourses: builder.query({
        query() {
          return `/courses`;
        },
      }),
    };
  },
});

export const { useFetchCoursesQuery } = coursesApiSlice;