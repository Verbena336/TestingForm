import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IInitialState } from '../reducers/formSlice';
import { BACKENDURL } from '../../data/constants';

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BACKENDURL }),
  endpoints: (builder) => ({
    fetchData: builder.mutation<{ status: string; message: string }, IInitialState>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useFetchDataMutation } = commonApi;
