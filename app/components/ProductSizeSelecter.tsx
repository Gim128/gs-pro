import React from "react";

interface SizeOption {
  label: string;
  price: number;
}

interface ProductSizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const ProductSizeSelector: React.FC<ProductSizeSelectorProps> = ({ sizes, selectedSize, setSelectedSize, setPrice }) => {
  return (
    <div className="flex gap-4 mt-4">
      {sizes.map((size) => (
        <button
          key={size.label}
          className={`px-4 py-2 rounded-md border ${
            selectedSize === size.label ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setSelectedSize(size.label);
            setPrice(size.price);
          }}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default ProductSizeSelector;