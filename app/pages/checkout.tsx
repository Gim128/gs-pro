import React, {useState} from "react";
import { CheckoutForm } from "../components/CheckoutForm";
import PaymemtMethods from "../components/PaymentMethods";
import OrderSummery from "../components/OrderSummery";

const Checkout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12">
             <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
                {/* left */}
                <div className="w-full lg:w-1/2">
                    <CheckoutForm />
                    <PaymemtMethods />
                </div>
                {/* right */}
                <div className="w-full lg:w-1/2">
                    <OrderSummery />
                </div>
             </div>
        </div>
    );
};

export default Checkout;