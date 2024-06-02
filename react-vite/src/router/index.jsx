import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { ProductDetails, ProductList, ManageProductListings, CreateProductForm } from '../components/Products';
import HomePage from '../components/HomePage';
import BuyerRequestList from '../components/Buyer/AllBuyerRequests';
import { UserBuyerRequests, ManageBuyerRequests, BuyerRequestDetails } from '../components/Buyer';

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
        // children: [
        //   {
        //     path: ':productId',
        //     element: <ProductDetails />
        //   },
        // ]
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
        path: 'buyers/:buyerId/buyer-requests',
        element: <UserBuyerRequests />
      }
    ],
  },
]);
