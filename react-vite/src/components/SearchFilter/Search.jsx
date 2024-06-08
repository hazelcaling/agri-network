import './SearchBar.css'
import { FiSearch } from "react-icons/fi";
function SearchBar () {

    const handleClick = () => {
        return alert('Feature coming soon')
    }
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search products..." />
            <span className='search-icon' onClick={handleClick}><FiSearch /> </span>
        </div>
    )
}

export default SearchBar
