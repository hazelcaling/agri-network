import { useDispatch } from 'react-redux';
import './SearchBar.css'
import { FiSearch } from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { thunkLoadProducts } from '../../redux/product';

function SearchBar () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilter, setShowFilter] = useState(false)

    const handleSearch = () => {
        setShowFilter(true)
        if (searchQuery !== '') {
            navigate(`?q=${searchQuery}`)
        }
        if (searchQuery === '') {
            setShowFilter(false)
            navigate('/products')
        }
        dispatch(thunkLoadProducts({ product_type: searchQuery, description: searchQuery}))
    }

    const handleKeyPress = e => {
        setShowFilter(true)
        if (e.key === 'Enter' && searchQuery !== '') {
            navigate(`?q=${searchQuery}`)
            dispatch(thunkLoadProducts({ product_type: searchQuery, description: searchQuery}))
        }
        if (searchQuery === '') {
            setShowFilter(false)
            navigate('/products')
            dispatch(thunkLoadProducts())
        }
    }
    return (
        <div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by product or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <span className='search-icon' onClick={handleSearch}><FiSearch /> </span>
            </div>
            {showFilter ? 'Filter here' : null}
        </div>

    )
}

export default SearchBar
