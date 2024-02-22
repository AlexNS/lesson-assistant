import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from '../utils';

export const questionsApiSlice = createApi({
  reducerPath: 'apiQuestions',
  baseQuery: getApiBaseQuery(),
  endpoints(builder) {
    return {
      fetchQuestions: builder.query({
        query() {
          return `/questions`;
        },
      }),
    };
  },
});

export const { useFetchQuestionsQuery } = questionsApiSlice;