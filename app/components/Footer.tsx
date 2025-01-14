import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8">
            <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-semibold text-white mb-4">Payment Methods</h4>
                    <ul className="space-y-2 text-sm">
                        <li>VISA</li>
                        <li>PayPal</li>
                        <li>AliPay</li>
                        <li>Apple Pay</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Hilife & Information</h4>
                    <ul className="space-y-2 text-sm">
                        <li>FAQ</li>
                        <li>Lieferung und Versand</li>
                        <li>Rückgabe und Umtausch</li>
                        <li>Widerruf</li>
                        <li>AGB</li>
                        <li>Impressum</li>
                        <li>Sitemap</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Bereiche</h4>
                    <ul  className="space-y-2 text-sm">
                        <li>Home</li>
                        <li>Product</li>
                        <li>story</li>
                        <li>Journal</li>
                        <li>Contact</li>
                    </ul>
                    <h4 className="font-semibold text-white mt-6">Account</h4>
                    <ul className="space-y-2 text-sm">
                        <li>Main Account</li>
                        <li>Bestellungen</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Social Media</h4>
                    <div className="flex space-x-4 mb-6">
                        <a href="#" className="hover:text-white">Facebook</a>
                        <a href="#" className="hover:text-white">Instagram</a>
                        <a href="#" className="hover:text-white">Pinterest</a>
                    </div>

                    <h4 className="font-semibold text-white">Sign Up</h4>
                    <p className="text-sm mb-4">
                        Trag dich in unseren Newsletter ein, um über neue Produkte informiert zu werden und Einblicke in unseren Design Prozess zu bekommen.
                    </p>
                    <form className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                        <input
                        type="email"
                        placeholder="E-Mail Adresse"
                        className="flex-1 px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-md focus:outline-none"
                        />
                        <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                        Senden
                        </button>
                    </form>
                    </div>
                </div>
                    <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                        Sprache wechseln: <span className="text-white">Deutsch</span> | Copyright © 2025 by CWMA.
                        Alle Rechte vorbehalten. Versand aus Hamburg, Germany.
                </div>
        </footer>
    );
};

export default Footer;