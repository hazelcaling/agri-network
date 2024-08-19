# Frontend Routes

## Home Page:
* **Route**: `/`
* **Component**: HomePage

## Product Listings:
* **Route**: `/products`
* **Component**: ProductListings
* **Description**: Display a list of all product listings.

## Edit Product Listing:
* **Route**: `/user/products/:productId/edit`
* **Component**: UpdateProduct
* **Description**: Form for editing an existing product listing (farmers only).

## Buyer Requests:
* **Route**: `/buyer-requests`
* **Component**: BuyerListings
* **Description**: Display a list of all buyer requests.

## Edit Buyer Request:
* **Route**: `/buyer-requests/:buyerRequestId/edit`
* **Component**: EditBuyerRequest
* **Description**: Form for editing an existing buyer request (buyers only).


## Modals and UI Components

These routes do not have URLs but are triggered by user actions within the application.

### Create Product Listing Modal

- **Trigger:** Click on the "Create a new  Listing" button.
- **Description:** Opens a modal for users to create a new product listing. The modal includes a form for entering details such as the product, description, location, availability, and image. It does not have a URL but is accessible from the product listings page.

### Product Details Modal

- **Trigger:** Click on a product card from the product listings page.
- **Description:** Opens a modal overlay displaying detailed information about the selected product. The modal includes information such as the product, description, location, availability and image. This modal is used to provide a closer look at the product without navigating away from the product listings page.


### Delete Product Listing Modal
- **Trigger:** Click on the "Delete" button in the Manage Listings page.
- **Description:** Opens a modal to confirm the deletion of a product listing.

### Create Product Listing Modal

- **Trigger:** Click on the "Create a new  Listing" button.
- **Description:** Opens a modal for users to create a new product listing. The modal includes a form for entering details such as the product, description, location, availability, and image. It does not have a URL but is accessible from the product listings page.

### Buyer Request Details Modal

- **Trigger:** Click on a product card from the product listings page.
- **Description:** Opens a modal overlay displaying detailed information about the selected product. The modal includes information such as the product, description, location, availability and image. This modal is used to provide a closer look at the product without navigating away from the product listings page.


### Delete Buyer Request Modal
- **Trigger:** Click on the "Delete" button in the Manage Listings page.
- **Description:** Opens a modal to confirm the deletion of a buyer request listing.
