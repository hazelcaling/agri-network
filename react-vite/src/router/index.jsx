import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import {
  ProductDetails,
  ManageProductListings,
  FarmerListingForm,
  UpdateProduct,
} from "../components/FarmerListing"
import HomePage from "../components/HomePage"

import {
  UserBuyerRequests,
  ManageBuyerRequests,
  BuyerRequestDetails,
  EditBuyerRequest,
  BuyerListings
} from "../components/BuyerListing"
import AboutMe from "../components/AboutMe/AboutMe"
import SearchFilterSort from "../components/SearchFilterSort/SearchFilterSort"
import SuccessMessage from "../components/SuccessMessage/SuccessMessage"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },      {
        path: "success",
        element: <SuccessMessage />,
      },
      {
        path: "/aboutme",
        element: <AboutMe />,
      },
      {
        path: "products",
        element: <SearchFilterSort />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/create",
        element: <FarmerListingForm />,
      },
      {
        path: "user/products",
        element: <ManageProductListings />,
      },
      {
        path: "user/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "user/products/:productId/edit",
        element: <UpdateProduct />,
      },
      {
        path: "buyer-requests",
        element: <BuyerListings />,
      },
      {
        path: "buyer-requests/:buyerReqId",
        element: <BuyerRequestDetails />,
      },
      {
        path: "user/buyer-requests",
        element: <ManageBuyerRequests />,
      },
      {
        path: "user/buyer-requests/:listingId/edit",
        element: <EditBuyerRequest />,
      },
      {
        path: "buyers/:buyerId/buyer-requests",
        element: <UserBuyerRequests />,
      },
    ],
  },
])
