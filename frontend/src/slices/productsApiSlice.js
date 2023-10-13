import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 10,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: PRODUCTS_URL + "/" + productId,
      }),
      keepUnusedDataFor: 10,
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 10,
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    // deleteProduct: builder.mutation({
    //   query: () => ({
    //     url: PRODUCTS_URL,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["Product"],
    // }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetAllProductsQuery,
  useCreateProductMutation,
} = productsApiSlice;
