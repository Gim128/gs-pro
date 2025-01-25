import React, { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle } from "lucide-react"; // Success Icon

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    city: "",
    streetAddress: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSelection = (method: string) => {
    setPaymentMethod(method);
    if (method === "card") {
      router.push("/add-card");
    }
  };

  const handleOrderConfirmation = async () => {
    const { fullName, email, phone, province, district, city, streetAddress } = formData;

    // Basic validation
    if (!fullName || !email || !phone || !province || !district || !city || !streetAddress) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/confirm-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          address: { province, district, city, streetAddress },
          paymentMethod,
          totalAmount: 1400,
        }),
      });

      if (response.ok) {
        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <span>Payment Successful!</span>
          </div>,
          {
            autoClose: 5000,
            onClose: () => router.push("/"), // Redirect to home page
          }
        );
      } else {
        alert("Failed to confirm order. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toast container for notifications */}
      <h2 className="text-2xl font-bold mb-6">Personal Info</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <div className="space-y-4">
            <select
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
            </select>
            <select
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select District</option>
              <option value="District A">District A</option>
              <option value="District B">District B</option>
            </select>
            <select
              name="city"
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
              name="streetAddress"
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
            <div
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                paymentMethod === "card" ? "border-blue-500 ring-2 ring-blue-500" : "border-gray-300"
              }`}
              onClick={() => handlePaymentSelection("card")}
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full border border-blue-500 text-blue-500 mr-4">
                {paymentMethod === "card" && <span className="block w-3 h-3 bg-blue-500 rounded-full"></span>}
              </span>
              <span className="font-medium">Debit Card / Credit Card</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            onClick={handleOrderConfirmation}
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
