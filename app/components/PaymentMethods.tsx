import React from 'react';
import { useRouter } from 'next/router';

export const PaymentMethods: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      <div>
        <button
          onClick={() => router.push('/add-card')}
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          Add Card Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;