import axios from 'axios';
import { ExternalLink, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Define types for news data
interface NewsArticle {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    source: {
        name: string;
    };
    category?: string;
}

interface Category {
    name: string;
    value: string;
}

const News: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    const NEWS_API_KEY = '067a6e3464354022b23783b9afff4c9b';

    // Updated categories to match NewsAPI categories
    const categories: Category[] = [
        { name: 'General', value: 'general' },
        // { name: 'Business', value: 'business' },
        // { name: 'Technology', value: 'technology' },
        // { name: 'Sports', value: 'sports' },
        // { name: 'Entertainment', value: 'entertainment' },
        // { name: 'Health', value: 'health' },
        // { name: 'Science', value: 'science' }
    ];

    const fetchNews = async (category: string) => {
        try {
            setLoading(true);
            setError(null);

            let response;

            // Special handling for General and Technology categories
            if (category === 'general') {
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                const fromDate = lastMonth.toISOString().split('T')[0];

                response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'tesla OR (breaking AND news)',
                        from: fromDate,
                        sortBy: 'publishedAt',
                        language: 'en',
                        apiKey: NEWS_API_KEY,
                        pageSize: 30
                    }
                });
            } else if (category === 'technology') {
                const today = new Date().toISOString().split('T')[0];
                response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'technology OR tech OR software OR ai OR apple OR google OR microsoft',
                        from: today,
                        to: today,
                        sortBy: 'popularity',
                        language: 'en',
                        apiKey: NEWS_API_KEY,
                        pageSize: 30
                    }
                });
            } else {
                response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        country: 'in',
                        category: category,
                        apiKey: NEWS_API_KEY,
                        pageSize: 30
                    }
                });
            }

            console.log('API Response:', response.data); // Debug log

            if (response.data.status === 'ok' && Array.isArray(response.data.articles)) {
                const validArticles = response.data.articles.filter((article: NewsArticle) =>
                    article.title &&
                    article.description &&
                    !article.title.includes('[Removed]')
                );

                if (validArticles.length === 0) {
                    setError('No articles found for this category');
                } else {
                    setNews(validArticles);
                    setLastUpdated(new Date());
                }
            } else {
                setError('Invalid API response');
                console.error('Invalid API response:', response.data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    setError('API rate limit exceeded. Please try again later.');
                } else if (error.response?.status === 401) {
                    setError('API key is invalid or expired.');
                } else {
                    setError(`Failed to fetch news: ${error.message}`);
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(selectedCategory);

        const interval = setInterval(() => {
            fetchNews(selectedCategory);
        }, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, [selectedCategory]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    if (news.length === 0 && !loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Latest News
                            </h2>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.value}
                                    onClick={() => setSelectedCategory(category.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                                        ${selectedCategory === category.value
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center py-12">
                        <div className="mb-4">
                            <RefreshCw className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                {error || 'No news available'}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Please try another category or check back later.
                            </p>
                        </div>
                        <button
                            onClick={() => fetchNews(selectedCategory)}
                            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Latest News
                        </h2>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <RefreshCw className="h-4 w-4" />
                            <span>Updated {formatDate(lastUpdated.toISOString())}</span>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.value}
                                onClick={() => setSelectedCategory(category.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.value
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
                            >
                                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((article, index) => (
                            <a
                                key={index}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="aspect-w-16 aspect-h-9">
                                    {article.urlToImage ? (
                                        <img
                                            src={article.urlToImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-400">No image available</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-primary-500">
                                            {article.source.name}
                                        </span>
                                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                        {formatDate(article.publishedAt)}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;
