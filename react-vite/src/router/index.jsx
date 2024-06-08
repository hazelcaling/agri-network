import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { ProductDetails, ProductList, ManageProductListings, CreateProductForm, FarmerListings, UpdateProduct } from '../components/Products';
import HomePage from '../components/HomePage';
import BuyerRequestList from '../components/Buyer/AllBuyerRequests';
import { UserBuyerRequests, ManageBuyerRequests, BuyerRequestDetails, EditBuyerRequest } from '../components/Buyer';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductList />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetails />
      },
      {
        path: 'products/create',
        element: <CreateProductForm />
      },
      {
        path: 'user/products',
        element: <ManageProductListings />
      },
      {
        path: 'user/products/:productId',
        element: <ProductDetails />

      },
      {
        path: 'user/products/:productId/edit',
        element: <UpdateProduct />

      },
      {
        path: 'farmers/:farmerId/products',
        element: <FarmerListings />

      },
      {
        path: 'buyer-requests',
        element: <BuyerRequestList />
      },
      {
        path: 'buyer-requests/:buyerReqId',
        element: <BuyerRequestDetails />

      },
      {
        path: 'user/buyer-requests',
        element: <ManageBuyerRequests />
      },
      {
        path: 'user/buyer-requests/:listingId/edit',
        element: <EditBuyerRequest />

      },
      {
        path: 'buyers/:buyerId/buyer-requests',
        element: <UserBuyerRequests />
      }
    ],
  },
]);
