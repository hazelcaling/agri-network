// import { useState, useEffect, useMemo } from "react"
// import { Link } from "react-router-dom"
// import About from "./About.jsx";
// import './HomePage.css'

// function HomePage () {
//     const images = useMemo(() => {
//         // Initialize your images array here
//         return ['farmer-at-work.jpg', 'support-local-farmer.jpg', 'strawberry.jpg', 'eggplant.jpg', 'tomatoes.jpeg']; // Replace with actual image data
//       }, []);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             // Increment index to show next image
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//         }, 5000); // Change image every 2 seconds

//         return () => clearInterval(interval); // Clean up interval on unmount
//     }, [images]); // Run effect whenever images change

//     const handleClick = () => {
//         return alert('Feature coming soon')
//     }

//     return (
//         <div className="homepage-container">

//             <div className="hero">
//               <h1><span className="explore action">Explore listings</span> or <span className="post action">Post your own</span> to connect with Farmers, Buyers, and Investors</h1>
//               <p>&quot;Join us in transforming agriculture together.&quot;</p>
//               <p></p>
//               <div className="hero-buttons">
//                     <button className="browse-button"><Link to='/products'>Browse Listings from Farmers</Link></button>
//                     <button className="browse-button"><Link to='/buyer-requests' >Browse Buyer Inquiries</Link></button>
//                     <button className="browse-button" onClick={handleClick}><Link>Invest in Farmers</Link></button>
//                 </div>
//             </div>
//             <div className="image-section">
//                 <img
//                     src={images[currentIndex]}
//                     onError={() => {setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//                 }} />
//             </div>
//             <footer className="footer">
//                 <div className="footer-content">
//                     <p>&copy; 2024 AgriNetwork. All rights reserved.</p>
//                     <div className="footer-links">
//                         <p>Connect with me:</p>
//                         <a href="https://github.com/hazelcaling" target="_blank" rel="noopener noreferrer">Github</a> |
//                         <a href="https://linkedin.com/in/hazel-c-37255a59" target="_blank" rel="noopener noreferrer">LinkedIn</a>
//                     </div>
//                 </div>
//             </footer>

//         </div>
//     )


// }

// export default HomePage

import { Link } from "react-router-dom"
import './HomePage.css'

function HomePage () {

    const handleClick = () => {
        return alert('Feature coming soon')
    }


    return (
        <div className="home-page">
            <header className="homepage-header">
                <h1>Welcome to Agri Network</h1>
                <p>Your reliable platform for connecting Filipino farmers with buyers and investors.</p>
                <div className="homepage-buttons">
                    <button className="browse-button"><Link to='/products'>Browse Listings from Farmers</Link></button>
                    <button className="browse-button"><Link to='/buyer-requests' >Browse Buyer Inquiries</Link></button>
                    <button className="browse-button" onClick={handleClick}><Link>Invest in Farmers</Link></button>
                </div>
            </header>

            <section id="mission" className="homepage-section">
                <h2>Our Mission</h2>
                <p>At Agri Network, we’re committed to making farm-to-fork in the Philippines. Our platform empowers Filipino farmers to sell their produce directly to buyers, eliminating middlemen and ensuring better prices for both farmers and consumers in the local market.</p>
            </section>

            <section id="features" className="homepage-section">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li><strong>Direct Transactions:</strong> Connect with farmers and buy fresh produce directly, bypassing intermediaries.</li>
                    <li><strong>Transparency:</strong> Enjoy full visibility into the origin of your produce and the conditions in which it was grown.</li>
                    <li><strong>Cost Savings:</strong> Reduce costs with fair pricing and avoid markups from resellers and grocery stores.</li>
                </ul>
            </section>

            <section id="vision" className="homepage-section">
                <h2>Our Vision</h2>
                <p>We aim to revolutionize the agricultural supply chain by creating a seamless online marketplace. Farmers can easily list their products, while buyers can access high-quality, fresh produce with just a few clicks.</p>
            </section>

            <section id="features" className="homepage-section">
                <h2>Get Involved</h2>
                <ul>
                    <li><strong>Browse Listings:</strong> Explore a wide range of fresh products posted by local farmers and find the best produce near you..</li>
                    <li><strong>Connect with Farmers:</strong> Send messages and get detailed information directly from the source.</li>
                    <li><strong>Post Inquiries:</strong> If you are a buyer, post your inquiries and find what you need.</li>
                    <li><strong>Support Agriculture:</strong> Invest in local farms and contribute to the growth of sustainable agriculture in the Philippines.</li>
                    <li><strong>Farmers:</strong> Post your products, reach new customers, and grow your business.</li>
                </ul>
            </section>


            <footer className="footer">
                <p>&copy; 2024 Agri Network. All rights reserved.</p>
            </footer>
        </div>
    );


}

export default HomePage
