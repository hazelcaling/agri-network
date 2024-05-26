import { Link } from "react-router-dom"

function HomePage () {
    return (
        <div>
            <h1>Welcome to AgriNetwork</h1>
            <p>Connecting farmers, buyers, and investors to empower local agriculture. Join our community to support sustainable farming practices and build a brighter future together.</p>
            <button><Link to='/products'>Browse product listing from farmers</Link></button>
        </div>
    )
}

export default HomePage
