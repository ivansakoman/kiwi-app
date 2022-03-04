import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SCHEMA}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API}/`,
    }),
    tagTypes: ['message'],
    endpoints: () => ({}),
});
