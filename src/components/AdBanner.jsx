
import React from "react";

const BannerAd = ({ imageUrl, altText, linkUrl, adText }) => {
  return (
    <div className="banner-ad">
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt={altText} className="banner-ad__image" />
      </a>
      {adText && <div className="banner-ad__text">{adText}</div>}
    </div>
  );
};

export default BannerAd;
