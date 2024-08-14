import { useMemo } from "react";

const useFilterBuyerListings = (buyerListings, searchQuery, filterLocation, sortOption) => {
  return useMemo(() => {
    let filteredListings = [...buyerListings];

    // Apply search filter
    if (searchQuery) {
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.product_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (filterLocation) {
      filteredListings = filteredListings.filter(
        (listing) => listing.location.toLowerCase() === filterLocation.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "postedDate":
        return filteredListings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "alphabetical":
        return filteredListings.sort((a, b) => a.product_type.localeCompare(b.product_type));
      case "priceAsc":
        return filteredListings.sort((a, b) => a.offer_price - b.offer_price);
      case "priceDesc":
        return filteredListings.sort((a, b) => b.offer_price - a.offer_price);
      default:
        return filteredListings;
    }
  }, [buyerListings, searchQuery, filterLocation, sortOption]);
};

export default useFilterBuyerListings;
