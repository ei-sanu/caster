import {
    AlertTriangle,
    BookOpen,
    FileText,
    Scale,
    Shield,
    UserX,
    Zap
} from 'lucide-react';
import React from 'react';

const TermsSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode
}> = ({
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

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Terms of Service
                    </h1>

                    <div className="text-gray-600 dark:text-gray-300 mb-8">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    <TermsSection title="Acceptance of Terms" icon={<FileText className="h-6 w-6" />}>
                        <p>
                            By accessing or using WeatherCast, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                        </p>
                    </TermsSection>

                    <TermsSection title="Service Usage" icon={<Zap className="h-6 w-6" />}>
                        <p>
                            Our service provides:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Real-time weather information and forecasts</li>
                            <li>Location-based weather alerts</li>
                            <li>Customizable weather dashboards</li>
                            <li>Weather-related news and updates</li>
                        </ul>
                        <p className="mt-4">
                            While we strive for accuracy, weather forecasts are subject to change and should not be solely relied upon for critical decisions.
                        </p>
                    </TermsSection>

                    <TermsSection title="User Responsibilities" icon={<Shield className="h-6 w-6" />}>
                        <p>
                            Users must:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide accurate information when using our services</li>
                            <li>Maintain the security of their account credentials</li>
                            <li>Use the service in compliance with applicable laws</li>
                            <li>Not attempt to breach or test our security measures</li>
                        </ul>
                    </TermsSection>

                    <TermsSection title="Intellectual Property" icon={<BookOpen className="h-6 w-6" />}>
                        <p>
                            All content on WeatherCast, including but not limited to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Graphics, logos, and design elements</li>
                            <li>Weather data visualization</li>
                            <li>User interface and features</li>
                            <li>Source code and documentation</li>
                        </ul>
                        <p className="mt-4">
                            Are protected by copyright and other intellectual property rights owned by WeatherCast or its licensors.
                        </p>
                    </TermsSection>

                    <TermsSection title="Limitations" icon={<AlertTriangle className="h-6 w-6" />}>
                        <p>
                            WeatherCast shall not be liable for:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Inaccuracies in weather data or forecasts</li>
                            <li>Service interruptions or technical issues</li>
                            <li>Decisions made based on provided information</li>
                            <li>Any consequential damages or losses</li>
                        </ul>
                    </TermsSection>

                    <TermsSection title="Account Termination" icon={<UserX className="h-6 w-6" />}>
                        <p>
                            We reserve the right to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Suspend or terminate accounts violating these terms</li>
                            <li>Modify or discontinue services without notice</li>
                            <li>Remove content that violates our policies</li>
                            <li>Block access from specific IP addresses or regions</li>
                        </ul>
                    </TermsSection>

                    <TermsSection title="Governing Law" icon={<Scale className="h-6 w-6" />}>
                        <p>
                            These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                        </p>
                        <p className="mt-4">
                            Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in India.
                        </p>
                    </TermsSection>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            For questions about our terms of service, please contact us at{' '}
                            <a
                                href="https://somesh.social"
                                target="_blank"
                                rel="noopener noreferrer"
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

export default TermsOfService;
