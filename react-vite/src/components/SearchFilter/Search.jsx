import './SearchBar.css'
import { FiSearch } from "react-icons/fi";
function SearchBar () {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <span className='search-icon'><FiSearch /> </span>
        </div>
    )
}

export default SearchBar
