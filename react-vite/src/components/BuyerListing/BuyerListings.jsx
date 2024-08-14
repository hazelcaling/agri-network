import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkLoadAllBuyerReq } from "../../redux/buyer";
import BuyerRequestCard from "./BuyerRequestCard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateBuyerRequest from "./CreateBuyerRequest";
import AuthModal from "../AuthModal/AuthModal";
import SFS from "./SearchFilterSort";
import useFilterBuyerListings from "../../custom-hooks/userFilterBuyerListings";
import { useModal } from "../../context/Modal";
import BuyerListingModalContent from "./BuyerListingModalContent";
import { LoadingSpinner } from "../LoadingSpinner";
import './BuyerListings.css'

function BuyerListings() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [buyerListings, setBuyerListings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const isLoggedIn = useSelector((state) => state.session.user !== null);
  const isBuyer = useSelector((state) => state.session.user?.user_type === "buyer");

  const { setModalContent, closeModal } = useModal();

  const filteredBuyerListings = useFilterBuyerListings(buyerListings, searchQuery, filterLocation, sortOption);

  useEffect(() => {
    dispatch(thunkLoadAllBuyerReq()).then((data) => {
      const sortedProducts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setBuyerListings(sortedProducts);
      setIsLoaded(true)
    });
  }, [dispatch]);

  const openModal = (listing) => {
    setModalContent(<BuyerListingModalContent listing={listing} closeModal={closeModal} />);
  };

  if (!isLoaded) return <LoadingSpinner />



  return (
    <div className="buyer-listing-page">
      <div className="buyer-listing-create">
      {!isLoggedIn ? (
        <div >
          <OpenModalButton
            buttonText="Create a new Listing"
            modalComponent={<AuthModal />}
          />
        </div>
      ) : isBuyer ? (
        <div >
          <OpenModalButton
            buttonText="Create a new Listing"
            modalComponent={<CreateBuyerRequest />}
          />
        </div>
      ) : (
        ""
      )}
      </div>
      <hr className="separator"/>
      <div className="buyer-listing-body">
      <SFS
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="product-list">
        {filteredBuyerListings.length > 0 ? (
          filteredBuyerListings.map((listing) => (
            <BuyerRequestCard key={listing.id} listing={listing} openModal={openModal} />
          ))
        ) : (
          <p>No Listings found</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default BuyerListings;
