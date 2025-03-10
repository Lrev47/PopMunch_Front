import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            <img
              src="https://imagizer.imageshack.com/img922/3152/npjpsD.png"
              alt="PopMunch Logo"
            />
          </Link>
          <p className="footer-description">
            Your ultimate destination for movie and TV show reviews. Discover new films, 
            share your thoughts, and connect with fellow cinephiles.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <span>𝕏</span>
            </a>
            <a href="#" className="social-link">
              <span>ƒ</span>
            </a>
            <a href="#" className="social-link">
              <span>𝓲</span>
            </a>
            <a href="#" className="social-link">
              <span>▶</span>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Explore</h3>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/movies" className="footer-link">Movies</Link>
            <Link to="/tv" className="footer-link">TV Shows</Link>
            <Link to="/collections/1" className="footer-link">Collections</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Categories</h3>
          <div className="footer-links">
            <Link to="/movies?genre=action" className="footer-link">Action</Link>
            <Link to="/movies?genre=comedy" className="footer-link">Comedy</Link>
            <Link to="/movies?genre=drama" className="footer-link">Drama</Link>
            <Link to="/movies?genre=horror" className="footer-link">Horror</Link>
            <Link to="/movies?genre=scifi" className="footer-link">Sci-Fi</Link>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-description">
            Subscribe to our newsletter for the latest movie news, reviews, and recommendations.
          </p>
          <div className="footer-newsletter">
            <form className="newsletter-form">
              <input 
                type="email" 
                className="newsletter-input" 
                placeholder="Your email address" 
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PopMunch. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
