import { Mail, MessageSquare, Send, User } from 'lucide-react';
import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);

        formData.append("access_key", "9c4dbdf0-8c38-47a5-aab1-9e3b06b196db");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Thank you for reaching out! We'll get back to you soon.");
                (event.target as HTMLFormElement).reset();
            } else {
                console.log("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            setResult("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Have questions about our weather services? We'd love to hear from you.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Somesh Biswal"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="yourmailaddress@gmail.com/yahool.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Your Message
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <MessageSquare className="h-5 w-5 text-gray-400" />
                                </div>
                                <textarea
                                    name="message"
                                    id="message"
                                    required
                                    rows={4}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="How can we help you?"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 relative"
                                disabled={result === "Sending...."}
                            >
                                {result === "Sending...." ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {result && result !== "Sending...." && (
                        <div className={`mt-6 p-4 rounded-md ${result.includes("Thank you")
                                ? "bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                : "bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                            }`}>
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
