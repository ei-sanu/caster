import { Bell, Database, Eye, Globe, Lock, Shield } from 'lucide-react';
import React from 'react';

const PolicySection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
    title,
    icon,
    children
}) => (
    <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
            <div className="text-primary-500 dark:text-primary-400">
                {icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
            </h2>
        </div>
        <div className="text-gray-600 dark:text-gray-300 space-y-4">
            {children}
        </div>
    </div>
);

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Privacy Policy
                    </h1>

                    <div className="text-gray-600 dark:text-gray-300 mb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    <PolicySection title="Information Collection" icon={<Database className="h-6 w-6" />}>
                        <p>
                            WeatherCast collects the following types of information:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Location data (when permitted) to provide accurate weather information</li>
                            <li>Device information for service optimization</li>
                            <li>Usage patterns to improve user experience</li>
                            <li>Search history for location suggestions</li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="Data Usage" icon={<Eye className="h-6 w-6" />}>
                        <p>
                            We use your data to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide accurate weather forecasts and alerts</li>
                            <li>Improve our services and user experience</li>
                            <li>Personalize your weather dashboard</li>
                            <li>Send relevant weather notifications (with your permission)</li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="Data Protection" icon={<Lock className="h-6 w-6" />}>
                        <p>
                            We implement robust security measures to protect your data:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>End-to-end encryption for data transmission</li>
                            <li>Regular security audits and updates</li>
                            <li>Secure data storage with industry-standard protocols</li>
                            <li>Limited employee access to personal information</li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="Third-Party Services" icon={<Globe className="h-6 w-6" />}>
                        <p>
                            We partner with trusted third-party services for:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Weather data providers</li>
                            <li>Analytics services</li>
                            <li>Cloud infrastructure</li>
                        </ul>
                        <p className="mt-4">
                            All partners are contractually obligated to protect your privacy and comply with relevant regulations.
                        </p>
                    </PolicySection>

                    <PolicySection title="Your Rights" icon={<Shield className="h-6 w-6" />}>
                        <p>
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request data deletion</li>
                            <li>Opt-out of data collection</li>
                            <li>Update your preferences</li>
                        </ul>
                    </PolicySection>

                    <PolicySection title="Updates to Policy" icon={<Bell className="h-6 w-6" />}>
                        <p>
                            We may update this privacy policy periodically. Users will be notified of significant changes via:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Email notifications</li>
                            <li>In-app announcements</li>
                            <li>Website notifications</li>
                        </ul>
                    </PolicySection>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            For questions about our privacy policy, please contact us at{' '}
                            <a
                                href="mailto:privacy@weathercast.com"
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                somesh.social
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
