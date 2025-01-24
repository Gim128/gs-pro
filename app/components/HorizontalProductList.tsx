import React from "react";
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface HorizontalProductListProps {
  products: Product[];
}

const HorizontalProductList: React.FC<HorizontalProductListProps> = ({ products }) => {
  const router = useRouter();

  return (
    <div className="flex overflow-x-scroll gap-6 py-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="min-w-[200px] bg-gray-100 rounded-md p-4 cursor-pointer"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
          <h3 className="text-lg font-bold mt-2">{product.name}</h3>
          <p className="text-blue-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default HorizontalProductList;
