import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadProducts } from "../../redux/product";
import citiesInPhilippines from '../../constants/philippinesCities';
import { ProductCard, ProductModalContent } from "../FarmerListing";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ProductForm from '../FarmerListing/FarmerListingForm';
import { useModal } from '../../context/Modal';
import { LoadingSpinner } from "../LoadingSpinner";
import AuthModal from "../AuthModal/AuthModal";
import './SearchFilterSort.css';

const SearchFilterSort = () => {
  const dispatch = useDispatch();
  const [farmerListings, setFarmerListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterInStock, setFilterInStock] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const isLoggedIn = useSelector(state => state.session.user !== null);
  const isFarmer = useSelector(state => state.session.user?.user_type === 'farmer');
  const { setModalContent, closeModal } = useModal();
  const [isLoaded, setIsloaded] = useState(false)

  useEffect(() => {
    dispatch(thunkLoadProducts()).then(res => {
      const sortedProducts = res.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setFarmerListings(sortedProducts);
      setIsloaded(true)
    });

  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationFilter = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleInStockFilter = (e) => {
    setFilterInStock(e.target.checked);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
    setFilterLocation('');
    setFilterInStock(false);
    setSortOption('');
  };

  const filterAndSortFarmerListings = () => {
    let filteredListings = farmerListings.filter((listing) =>
      listing.product_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterLocation) {
      filteredListings = filteredListings.filter((listing) =>
        listing.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (filterInStock) {
      filteredListings = filteredListings.filter((listing) => listing.available_now);
    }

    if (sortOption === 'harvestDate') {
      filteredListings.sort((a, b) => new Date(a.harvest_date) - new Date(b.harvest_date));
    } else if (sortOption === 'postedDate') {
      filteredListings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOption === 'alphabetical') {
      filteredListings.sort((a, b) => a.product_type.localeCompare(b.product_type));
    }

    return filteredListings;
  };

  const openModal = (product) => {
    setModalContent(<ProductModalContent product={product} closeModal={closeModal} />);
  };

  if (!isLoaded) {
    return <LoadingSpinner />
}

  return (
    <>
      {!isLoggedIn ? (
        <div className='create'>
          <OpenModalButton
            buttonText='Create a new Listing'
            modalComponent={<AuthModal />}
          />
        </div>
      ) : isFarmer ? (
        <div className='create'>
          <OpenModalButton
            buttonText='Create a new Listing'
            modalComponent={<ProductForm />}
          />
        </div>
      ) : ''}
      <div className="sfs-container">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by product or description ..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <select id='location' value={filterLocation} onChange={handleLocationFilter}>
            <option value="">All Locations</option>
            {citiesInPhilippines.map((city, index) => (
              <option value={city} key={index}>{city}</option>
            ))}
          </select>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={filterInStock}
                onChange={handleInStockFilter}
              />
              In Stock
            </label>
          </div>
          <div className="select-sort">
            <select value={sortOption} onChange={handleSortChange}>
              <option value="">Sort By</option>
              <option value="harvestDate">Harvest Date (Newest to Latest)</option>
              <option value="postedDate">Date Posted (Newest to Latest)</option>
              <option value="alphabetical">Product (A-Z)</option>
            </select>
          </div>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
        <div>
          <div className="product-list">
            {filterAndSortFarmerListings().length > 0 ? (
              filterAndSortFarmerListings().map((listing) => (
                <ProductCard key={listing.id} product={listing} openModal={openModal} />
              ))
            ) : (
              'No Listings found'
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilterSort;
