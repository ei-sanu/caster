import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import chatbotData from '../data/chatbotData.json';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

const Caster: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userName, setUserName] = useState('');
    const [showWelcomePopup, setShowWelcomePopup] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const botEmoji = "🤖"; // Robot emoji for Caster
    const userEmoji = "👤"; // User emoji for default user avatar

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            const chatContainer = messagesEndRef.current.parentElement;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const chatContainer = messagesEndRef.current?.parentElement;
        if (chatContainer) {
            const preventScroll = (e: WheelEvent) => {
                const isScrolledToTop = chatContainer.scrollTop === 0;
                const isScrolledToBottom =
                    chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;

                if ((isScrolledToTop && e.deltaY < 0) ||
                    (isScrolledToBottom && e.deltaY > 0)) {
                    e.preventDefault();
                }
            };

            chatContainer.addEventListener('wheel', preventScroll, { passive: false });
            return () => chatContainer.removeEventListener('wheel', preventScroll);
        }
    }, []);

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const findResponse = (input: string) => {
        const lowercaseInput = input.toLowerCase();

        for (const category in chatbotData) {
            const patterns = chatbotData[category].patterns;
            if (patterns.some(pattern => lowercaseInput.includes(pattern))) {
                const responses = chatbotData[category].responses;
                let response = responses[Math.floor(Math.random() * responses.length)];
                // Replace placeholder with actual user name
                return response.replace('{{userName}}', userName);
            }
        }

        return `I'm sorry ${userName}, I'm not sure how to respond to that. Could you please rephrase your question about weather?`;
    };

    const startChat = () => {
        if (!userName.trim()) return;

        setShowWelcomePopup(false);
        // Add initial welcome message
        const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: `Hello ${userName}! How are you? I am here to help you with any weather-related questions you might have! 😊`,
            sender: 'bot',
            timestamp: getCurrentTime()
        };
        setMessages([welcomeMessage]);
    };

    useEffect(() => {
        if (showWelcomePopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showWelcomePopup]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Prevent page scroll
        e.stopPropagation();

        // Store current page scroll position
        const pageScrollPosition = window.scrollY;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: getCurrentTime()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Restore page scroll position
        window.scrollTo(0, pageScrollPosition);

        // Simulate bot thinking
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: findResponse(input),
                sender: 'bot',
                timestamp: getCurrentTime()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);

            // Restore page scroll position again after bot response
            window.scrollTo(0, pageScrollPosition);
        }, 1000);
    };

    return (
        <div className="h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900 py-2 px-4 sm:px-6 lg:px-8">
            {/* Welcome Popup */}
            <AnimatePresence>
                {showWelcomePopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Welcome to Caster! 👋
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Please enter your name to start chatting with me.
                            </p>
                            <div className="space-y-4">
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && userName.trim()) {
                                            startChat();
                                        }
                                    }}
                                />
                                <button
                                    onClick={startChat}
                                    disabled={!userName.trim()}
                                    className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    START CHAT WITH CASTER
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Existing chat interface */}
            <div className="h-full max-w-xl mx-auto flex flex-col">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col flex-grow">
                    {/* Chat Header - Now with emoji */}
                    <div className="bg-primary-600 p-3 flex items-center gap-2">
                        <div className="text-xl">{botEmoji}</div>
                        <div>
                            <h2 className="text-base font-semibold text-white">Caster</h2>
                            <p className="text-xs text-primary-100">Always here to help</p>
                        </div>
                    </div>

                    {/* Chat Messages - With emojis instead of icons */}
                    <div className="flex-grow overflow-y-auto p-3 space-y-3">
                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start gap-2 max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : ''
                                        }`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-lg ${message.sender === 'user'
                                            ? 'bg-primary-500'
                                            : 'bg-gray-200 dark:bg-gray-700'
                                            }`}>
                                            {message.sender === 'user' ? userEmoji : botEmoji}
                                        </div>
                                        <div className={`flex flex-col gap-0.5 ${message.sender === 'user' ? 'items-end' : 'items-start'
                                            }`}>
                                            <div className={`rounded-lg p-2 text-sm ${message.sender === 'user'
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                }`}>
                                                {message.text}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                                                <Clock className="h-2 w-2" />
                                                {message.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing indicator - With emoji */}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">
                                    {botEmoji}
                                </div>
                                <div className="flex gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <span className="animate-bounce text-xs">•</span>
                                    <span className="animate-bounce [animation-delay:0.2s] text-xs">•</span>
                                    <span className="animate-bounce [animation-delay:0.4s] text-xs">•</span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input - Made more compact */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 py-1.5 px-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="p-1.5 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!input.trim() || isTyping}
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Caster;
