import React from "react";

interface ProductCarouselProps {
  images: string[];
  setMainImage: React.Dispatch<React.SetStateAction<string>>;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images, setMainImage }) => {
  return (
    <div className="flex gap-4 mt-6">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gas Cylinder ${index}`}
          className="w-20 h-20 cursor-pointer rounded-md border"
          onClick={() => setMainImage(image)}
        />
      ))}
    </div>
  );
};

export default ProductCarousel;