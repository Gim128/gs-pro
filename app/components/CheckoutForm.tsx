import React, { useState } from "react";
import { useRouter } from "next/router";

export const CheckoutForm: React.FC = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
    if (method === "card") {
      router.push("/add-card"); // Redirect to the card-adding page
    }
};

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Info</h2>
      <form className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <div className="space-y-4">
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
            </select>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              <option value="District A">District A</option>
              <option value="District B">District B</option>
            </select>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City</option>
              <option value="City X">City X</option>
              <option value="City Y">City Y</option>
            </select>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter street address"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Payment Method</h3>
          <div className="space-y-4">
            {/* Card Payment Option */}
            <div
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                paymentMethod === "card" ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"
              }`}
              onClick={() => handlePaymentSelection("card")}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => handlePaymentSelection("card")}
                className="hidden"
              />
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-500 text-blue-500 mr-4">
                {paymentMethod === "card" && <span className="block w-3 h-3 bg-blue-500 rounded-full"></span>}
              </span>
              <span className="font-medium">Debit Card / Credit Card</span>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default CheckoutForm;