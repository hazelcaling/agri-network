# Backend Routes

## User Authentication:
* **Signup**: POST `/api/auth/signup`
* **Login**: POST `/api/auth/login`
* **Get Current User**: GET `api/auth/session`
* **Logout**: `/api/auth/logout`

## Product Listings:
* **Get All Listings**: GET `/api/products`
* **Get Single Listing**: GET `/api/products/:productId`
* **Create Listing**: POST `/api/products`
* **Update Listing**: PUT `/api/products/:productId`
* **Delete Listing**: DELETE `/api/products/:productId`

## Buyer Requests:
* **Get All Requests**: GET `/api/buyer-requests`
* **Get Single Request**: GET `/api/buyer-requests/:buyerRequestId`
* **Create Request**: POST `/api/buyer-requests`
* **Update Request**: PUT `/api/buyer-requests/:buyerRequestId`
* **Delete Request**: DELETE `/api/buyer-requests/:buyerRequestId`

## Images:
* **Upload product image**: POST `/api/products/:productId/images/upload`
* **Delete Image**: DELETE `/api/product-images/:imageId`
