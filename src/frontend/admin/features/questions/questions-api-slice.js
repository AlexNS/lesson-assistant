import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionsApiSlice = createApi({
  reducerPath: 'apiQuestions',
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
      fetchQuestions: builder.query({
        query() {
          return `/questions`;
        },
      }),
    };
  },
});

export const { useFetchQuestionsQuery } = questionsApiSlice;