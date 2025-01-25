import React, { useState } from "react";

export const OrderSummary: React.FC = () => {
  const [quantities, setQuantities] = useState([1, 1, 1]);

  const updateQuantity = (index: number, amount: number) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index ? Math.max(qty + amount, 1) : qty))
    );
  };

  const totalAmount = quantities.reduce((sum, qty) => sum + qty * 500, 0); // Price placeholder

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <img
                src={`/gas-cylinder-${index + 1}.png`} // Example image path
                alt="Gas Cylinder"
                className="w-12 h-12 rounded-lg"
              />
              <div className="ml-4">
                <p className="text-sm font-semibold">Gas Type {index + 1}</p>
                <p className="text-sm text-gray-500">RS. 500</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(index, -1)}
                className="px-3 py-1 bg-gray-300 rounded-lg"
              >
                -
              </button>
              <span>{quantities[index]}</span>
              <button
                onClick={() => updateQuantity(index, 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="flex justify-between">
          <span>Price</span>
          <span>RS. {totalAmount}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Charges</span>
          <span>RS. 200</span>
        </p>
        <p className="flex justify-between font-bold">
          <span>Total Amount</span>
          <span>RS. {totalAmount + 200}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;