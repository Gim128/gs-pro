import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";

const AboutUs:React.FC = () => {
    return(
        <div className="bg-gray-50 text-gray-800">
            <section className="max-w-screen-xl mx-auto p-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <p className="text-blue-600 font-semibold mb-4">Work Process</p>
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        SEOC Your Path to SEO & Digital <br />
                        <span className="text-blue-600">Marketing Success</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        From increasing your website's visibility on search engines to engaging with your audience on social media.
                    </p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-700">
                        Learn More
                    </button>
                </div>

                <div>
                    <img src="..." alt="team discussion" className="rounded-lg shadow-md w-full"/>
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-6 text-center rounded-lg shadow-md hover:shadow-lg transition">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 text-white-600 rounded-full flex items-center justify-center">
                            <AiOutlineThunderbolt className="w-8 h-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Strategy Development</h3>
                        <p className="text-gray-600 mb-4">
                            Based on our findings, we develop a customized digital marketing strategy tailored to your objectives.
                        </p>
                        <button className="text-pink-600 font-semibold hover:underline">
                            Learn More →
                        </button>
                    </div>

                    <div className="bg-gray-50 p-6 text-center rounded-lg shadow-md hover:shadow-lg transition"> 
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 text-white-600 rounded-full flex items-center justify-center">
                            <AiOutlineThunderbolt className="w-8 h-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Monitoring & Optimization</h3>
                        <p className="text-gray-600 mb-4">
                            We believe in the power of data-driven decision-making. Throughout the campaign,
                        </p>
                        <button className="text-pink-600 font-semibold hover:underline">
                            Learn More →
                        </button>
                    </div>

                    <div className="bg-gray-50 p-6 text-center rounded-lg shadow-md hover:shadow-lg transition"> 
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 text-white-600 rounded-full flex items-center justify-center">
                            <AiOutlineThunderbolt className="w-8 h-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Continuous Improvement</h3>
                        <p className="text-gray-600 mb-4">
                            Digital marketing is an ever-evolving field, and we're committed to staying ahead of the SEOC curve.
                        </p>
                        <button className="text-pink-600 font-semibold hover:underline">
                            Learn More →
                        </button>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default AboutUs;