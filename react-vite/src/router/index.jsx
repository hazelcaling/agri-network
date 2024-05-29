import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import { ProductDetails, ProductList, ManageProductListings, CreateProductForm } from '../components/Products';
import HomePage from '../components/HomePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: 'products',
        element: <ProductList />
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
      }
    ],
  },
]);
