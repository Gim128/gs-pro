import React, {useState} from "react";
import { CheckoutForm } from "../components/CheckoutForm";
import { OrderSummery } from "../components/OrderSummery";
import { PaymemtMethod } from "../components/PaymemtMethod";

const Checkout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12">
             <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
                {/* left */}
                <div className="flex-1">
                    <CheckoutForm />
                    {/* <PaymemtMethod /> */}
                </div>
                {/* right */}
                <div className="flex-1">
                    <OrderSummery />
                </div>
             </div>
        </div>
    );
};

export default Checkout;