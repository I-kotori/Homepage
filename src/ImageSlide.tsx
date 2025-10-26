import React from "react";
import "./ImageSlide.css";
interface ImageSlideProps {
  src: string;
  alt: string;
}
const ImageSlide = ({src, alt}: ImageSlideProps) => {
    return (
        <div className="image-container">
        <img className = "showing-image" src={src} alt={alt} />
        </div>
    );
}

export default ImageSlide;