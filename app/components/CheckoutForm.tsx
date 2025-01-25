import React, {useState} from "react";

export const CheckoutForm: React.FC = () => {
    const [province, setProvicne] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Address info</h2>
            <form className="space-y-4">
                 <div>
                    <label className="block font-medium text-gray-700">Full Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter Your full Name" />
                 </div>
                 {/* email */}
                 <div>
                    <label className="block font-medium text-gray-700">EMail address</label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter Your Email" />
                 </div>
                 {/* address */}
                 <div>
                    <label className="block font-medium text-gray-700">Address</label>
                    <div className="flex flex-col space-y-2">
                        <select value={province} onChange={(e) => setProvicne(e.target.value)} className="p-2 border-gray-300 rounded-lg">
                            <option value="">Select Province</option>
                            <option value="Province 1">Province 1</option>
                            <option value="Province 2">Province 2</option>
                            <option value="Province 3">Province 3</option>
                        </select>
                        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="p-2 border-gray-300 rounded-lg">
                            <option value="">Select District</option>
                            <option value="District 1">District 1</option>
                            <option value="District 2">District 2</option>
                            <option value="District 3">District 3</option>
                        </select>
                        <select value={city} onChange={(e) => setCity(e.target.value)} className="p-2 border-gray-300 rounded-lg">
                            <option value="">Select District</option>
                            <option value="City 1">City 1</option>
                            <option value="City 2">City 2</option>
                            <option value="City 3">City 3</option>
                        </select>

                        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg" placeholder="Enter Street Address" />
                    </div>
                 </div>
            </form>
        </div>
    );
};

export default CheckoutForm;