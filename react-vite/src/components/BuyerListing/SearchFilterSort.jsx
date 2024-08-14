import philippinesCities from "../../constants/philippinesCities";

export default function SFS ({ searchQuery, setSearchQuery, filterLocation, setFilterLocation, sortOption, setSortOption }) {
  return (
    <div className="sfs-container">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search by product or description ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          id="location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {philippinesCities.map((city, index) => (
            <option value={city} key={index}>{city}</option>
          ))}
        </select>

        <div className="select-sort">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="postedDate">Date Posted (Newest to Latest)</option>
            <option value="priceAsc">Price (Lowest to Highest)</option>
            <option value="priceDesc">Price (Highest to Lowest)</option>
            <option value="alphabetical">Product (A-Z)</option>
          </select>
        </div>

        <button
          className="reset-button"
          onClick={() => {
            setSearchQuery("");
            setFilterLocation("");
            setSortOption("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
