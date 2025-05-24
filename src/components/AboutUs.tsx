import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Logo/Image Section */}
                        <div className="lg:w-1/3 flex items-center justify-center p-8 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-800 dark:to-primary-900">
                            <div className="text-center">
                                <div className="w-64 h-64 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mx-auto overflow-hidden">
                                    <img
                                        src="images/weather.jpg"
                                        alt="WeatherCast Logo"
                                        className="w-full h-full object-cover rounded-full"
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-2/3 p-8 lg:p-12">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                About WeatherCast
                            </h1>

                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                    Welcome to WeatherCast — a modern, intuitive weather platform built with precision,
                                    performance, and user experience in mind.
                                </p>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                    Developed by Somesh, a full-stack web developer and tech innovator, WeatherCast
                                    delivers real-time weather updates, interactive forecasts, and curated climate news,
                                    all in one seamless experience.
                                </p>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                    Designed for both functionality and aesthetics, WeatherCast features interactive
                                    weather maps, severe weather alerts, and a customizable dashboard to match your
                                    daily routine.
                                </p>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                    Powered by advanced and responsive web technologies, our mission is to keep
                                    you informed, prepared, and connected with the climate around you — wherever you are.
                                </p>

                                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                    At WeatherCast, it's not just about the forecast; it's about clarity,
                                    convenience, and control.
                                </p>
                            </div>

                            {/* Optional: Add a contact/social section */}
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Connect with the Developer
                                </h3>
                                <a
                                    href="https://somesh.social"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                >
                                    Visit somesh.social →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
