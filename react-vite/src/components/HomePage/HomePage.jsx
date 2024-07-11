import { Link } from "react-router-dom"

import './HomePage.css'
import { useState } from "react"
import { useEffect } from "react"

function HomePage () {
    const images = ['farmer-at-work.jpg', 'support-local-farmer.jpg', 'strawberry.jpg', 'eggplant.jpg', 'tomatoes.jpeg']
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment index to show next image
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 2 seconds

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [images]); // Run effect whenever images change

    const handleClick = () => {
        return alert('Feature coming soon')
    }

    return (
        <div className="homepage-container">
            <div className="hero">
              <h1><span className="explore action">Explore listings</span> or <span className="post action">Post your own</span> to connect with Farmers, Buyers, and Investors</h1>
              <p>"Join us in transforming agriculture together."</p>
              <div className="hero-buttons">
                    <button className="browse-button"><Link to='/products'>Browse Listings from Farmers</Link></button>
                    <button className="browse-button"><Link to='/buyer-requests' >Browse Buyer Inquiries</Link></button>
                    <button className="browse-button" onClick={handleClick}><Link>Invest in Farmers</Link></button>
                </div>
            </div>
            <div className="image-section">
                <img
                    src={images[currentIndex]}
                    onError={() => {setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                }} />
            </div>


function HomePage() {
  const handleClick = () => {
    return alert("Feature coming soon")
  }
  return (
    <div className="homepage-container">
      <div className="hero">
        <h1>Connecting Farmers, Buyers, and Investors</h1>
        <p>
          Our network makes it easy for farmer and buyers to connect and trade.
          Through our innovative technology and user-friendly interfaces,
          providing platform for farmers to showcase their products, buyers to
          access quality goods, and investors to support agricultural ventures.
        </p>
        <div className="hero-buttons">
          <button className="browse-button">
            <Link to="/products">Browse Listings from Farmers</Link>
          </button>
          <button className="browse-button">
            <Link to="/buyer-requests">Browse Buyer Inquiries</Link>
          </button>
          <button
            className="browse-button"
            onClick={handleClick}
          >
            <Link>Invest in Farmers</Link>
          </button>
        </div>
      </div>
      <div className="image-section">
        <img
          src="slide-strawberries.jpg"
          alt=""
        />
      </div>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 AgriNetwork. All rights reserved.</p>
                    <div className="footer-links">
                        <p>Connect with me:</p>
                        <a href="https://github.com/hazelcaling" target="_blank">Github</a> |
                        <a href="https://linkedin.com/in/hazel-c-37255a59" target="_blank">LinkedIn</a>
                    </div>
                </div>
            </footer>

        </div>
      </footer>
    </div>
  )
}

export default HomePage
