import { Link } from "react-router-dom"
import './HomePage.css'

function HomePage () {
    return (
        <div className="homepage-container">
            <div className="hero">
              <h1>Connecting Farmers, Buyers, and Investors</h1>
              <p>
                Our network makes it easy for farmer and buyers to connect and trade.
                Through our innovative technology and user-friendly interfaces, providing platform for farmers to showcase their products, buyers to access quality goods, and inventors to support agricultural ventures.

              </p>
              <div className="hero-buttons">
                    <button className="browse-button"><Link to='/products'>Browse Listings from Farmers</Link></button>
                    <button className="browse-button"><Link to='/buyer-requests' >Browse Buyer Inquiries</Link></button>
                    <button className="browse-button"><Link>Invest in Farmers</Link></button>
                </div>
            </div>
            <div className="image-section">
                <img src='slide-strawberries.jpg' alt="" />
            </div>



            <footer className="footer">
                <div className="container">
                    <p>
                        &copy; 2024 AgriNetwork. All rights reserved.
                    </p>
                    <div className="footer-links">
                        <a href="">About Us</a> |
                        <a href="">Privacy Policy</a> |
                        <a href="">Terms of Service</a> |
                        <a href="">My Contact</a> |
                        <a href="">About Me</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
