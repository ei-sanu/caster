import {
    CloudRain,
    Flame,
    Mountain,
    Snowflake,
    Thermometer,
    Wind
} from 'lucide-react';
import React, { useState } from 'react';

interface DisasterInfo {
    id: string;
    title: string;
    icon: React.ReactNode;
    videoId: string;
    description: string;
    precautions: {
        category: string;
        items: string[];
    }[];
    essentials: string[];
    edibles: string[];
}

const disasters: DisasterInfo[] = [
    {
        id: 'heatwave',
        title: 'Heat Waves',
        icon: <Thermometer className="h-6 w-6" />,
        videoId: 'vKi6Vsv82rk',
        description: 'Extended periods of extreme heat that can lead to dehydration, heat exhaustion, and heat stroke.',
        precautions: [
            {
                category: 'Personal Safety',
                items: [
                    'Stay hydrated - drink water regularly',
                    'Avoid going out during peak hours (11 AM - 4 PM)',
                    'Wear light-colored, loose-fitting clothing',
                    'Use sunscreen and wear a wide-brimmed hat',
                    'Take frequent breaks in shaded areas'
                ]
            },
            {
                category: 'Indoor Measures',
                items: [
                    'Use air conditioning or fans',
                    'Close curtains during peak sunlight hours',
                    'Check on elderly neighbors and relatives',
                    'Keep pets indoors and well-hydrated'
                ]
            }
        ],
        essentials: [
            'Water bottles',
            'Electrolyte solutions',
            'First-aid kit',
            'Portable fan',
            'Sun protection (hat, sunscreen, sunglasses)'
        ],
        edibles: [
            'Fresh fruits (watermelon, oranges)',
            'Coconut water',
            'Light snacks (nuts, dried fruits)',
            'Energy bars',
            'Electrolyte powder sachets'
        ]
    },
    {
        id: 'floods',
        title: 'Floods',
        icon: <CloudRain className="h-6 w-6" />,
        videoId: 'pi_nUPcQz_A',
        description: 'Flooding can occur rapidly and cause severe damage to property and life. Being prepared is crucial.',
        precautions: [
            {
                category: 'Before Flood',
                items: [
                    'Keep emergency supplies ready',
                    'Know your evacuation route',
                    'Move valuables to higher ground',
                    'Install check valves in plumbing',
                    'Monitor weather updates regularly'
                ]
            },
            {
                category: 'During Flood',
                items: [
                    'Move to higher ground immediately',
                    'Avoid walking through flowing water',
                    'Do not drive through flooded areas',
                    'Stay away from power lines and electrical wires',
                    'Listen to emergency instructions'
                ]
            }
        ],
        essentials: [
            'Emergency radio',
            'Waterproof containers',
            'Rubber boots and gloves',
            'Life jackets',
            'Battery-powered flashlights'
        ],
        edibles: [
            'Bottled water (3-day supply)',
            'Non-perishable food items',
            'Canned goods',
            'High-energy snacks',
            'Ready-to-eat meals'
        ]
    },
    {
        id: 'earthquake',
        title: 'Earthquakes',
        icon: <Mountain className="h-6 w-6" />,
        videoId: 'BLEPakj1YTY',
        description: 'Earthquakes strike suddenly and without warning. Knowledge of safety procedures is vital.',
        precautions: [
            {
                category: 'Indoor Safety',
                items: [
                    'Drop, Cover, and Hold On',
                    'Stay away from windows',
                    'Take shelter under sturdy furniture',
                    'Stay inside until shaking stops',
                    'Be prepared for aftershocks'
                ]
            },
            {
                category: 'Outdoor Safety',
                items: [
                    'Move to open areas',
                    'Stay away from buildings',
                    'Avoid power lines',
                    'If driving, stop safely away from buildings'
                ]
            }
        ],
        essentials: [
            'Emergency tool kit',
            'First aid supplies',
            'Portable radio',
            'Emergency blankets',
            'Whistle for signaling'
        ],
        edibles: [
            'Protein bars',
            'Dried fruits and nuts',
            'Canned food',
            'Water packets',
            'Long-shelf-life food items'
        ]
    },
    {
        id: 'hurricane',
        title: 'Hurricanes',
        icon: <Wind className="h-6 w-6" />,
        videoId: 'H6icWfyMBNk',
        description: 'Hurricanes bring powerful winds, heavy rainfall, storm surges, and flooding.',
        precautions: [
            {
                category: 'Preparation',
                items: [
                    'Board up windows',
                    'Secure outdoor objects',
                    'Fill vehicles with fuel',
                    'Prepare evacuation plan',
                    'Stock up on supplies'
                ]
            },
            {
                category: 'During Hurricane',
                items: [
                    'Stay indoors',
                    'Keep away from windows',
                    'Monitor weather updates',
                    'Follow evacuation orders'
                ]
            }
        ],
        essentials: [
            'Generator',
            'Weather radio',
            'Batteries',
            'Plastic sheeting',
            'Basic tools'
        ],
        edibles: [
            'Water (7-day supply)',
            'Non-perishable foods',
            'Manual can opener',
            'Baby food if needed',
            'Pet food if applicable'
        ]
    },
    {
        id: 'tornado',
        title: 'Tornadoes',
        icon: <Wind className="h-6 w-6 rotate-45" />,
        videoId: 'h3z50ZX_RMM',
        description: 'Tornadoes are violent, rotating columns of air that can cause devastating damage.',
        precautions: [
            {
                category: 'Warning Signs',
                items: [
                    'Dark, greenish sky',
                    'Large hail',
                    'Low-lying rotating cloud',
                    'Loud roar similar to freight train',
                    'Watch weather alerts'
                ]
            },
            {
                category: 'Safety Actions',
                items: [
                    'Get to lowest building level',
                    'Stay away from windows',
                    'If in mobile home, get out',
                    'Cover head with hands'
                ]
            }
        ],
        essentials: [
            'Weather radio',
            'Flashlights',
            'Helmets',
            'Heavy blankets',
            'First aid kit'
        ],
        edibles: [
            'Ready-to-eat foods',
            'Bottled water',
            'Protein bars',
            'Dried fruits',
            'Crackers'
        ]
    },
    {
        id: 'winterstorm',
        title: 'Winter Storms',
        icon: <Snowflake className="h-6 w-6" />,
        videoId: 'myXYUJ7N164',
        description: 'Winter storms can bring dangerous cold, heavy snow, and icy conditions.',
        precautions: [
            {
                category: 'Home Preparation',
                items: [
                    'Insulate pipes',
                    'Service heating systems',
                    'Install weather stripping',
                    'Stock up on heating fuel',
                    'Prepare emergency heating source'
                ]
            },
            {
                category: 'Personal Safety',
                items: [
                    'Limit outdoor exposure',
                    'Layer clothing properly',
                    'Watch for signs of frostbite',
                    'Keep dry',
                    'Avoid overexertion'
                ]
            }
        ],
        essentials: [
            'Snow shovel',
            'Rock salt',
            'Warm clothing',
            'Space heater',
            'Thermal blankets'
        ],
        edibles: [
            'Hot chocolate packets',
            'Soup cans',
            'Trail mix',
            'Energy bars',
            'Dried fruits'
        ]
    },
    {
        id: 'wildfire',
        title: 'Wildfires',
        icon: <Flame className="h-6 w-6" />,
        videoId: 'Xgc90CoJbDI',
        description: 'Wildfires can spread rapidly and threaten homes and lives in susceptible areas.',
        precautions: [
            {
                category: 'Home Defense',
                items: [
                    'Create defensible space',
                    'Clear vegetation near house',
                    'Use fire-resistant materials',
                    'Keep gutters clean',
                    'Have evacuation plan ready'
                ]
            },
            {
                category: 'During Wildfire',
                items: [
                    'Follow evacuation orders immediately',
                    'Close all windows and doors',
                    'Remove flammable curtains',
                    'Turn on lights for visibility in smoke'
                ]
            }
        ],
        essentials: [
            'N95 masks',
            'Eye protection',
            'Emergency blankets',
            'Battery-powered radio',
            'Important documents'
        ],
        edibles: [
            'Water (3-day supply)',
            'Non-perishable foods',
            'High-energy snacks',
            'Canned goods',
            'Pet food if needed'
        ]
    }
];

const DisasterButton: React.FC<{
    disaster: DisasterInfo;
    isActive: boolean;
    onClick: () => void;
}> = ({ disaster, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${isActive
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
    >
        <span className="mr-2">{disaster.icon}</span>
        {disaster.title}
    </button>
);

const SafetyMeasures: React.FC = () => {
    const [selectedDisaster, setSelectedDisaster] = useState<DisasterInfo>(disasters[0]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Safety Measures & Precautions
                </h1>

                {/* Disaster selection buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {disasters.map(disaster => (
                        <DisasterButton
                            key={disaster.id}
                            disaster={disaster}
                            isActive={selectedDisaster.id === disaster.id}
                            onClick={() => setSelectedDisaster(disaster)}
                        />
                    ))}
                </div>

                {/* Main content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    {/* Video section */}
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedDisaster.videoId}`}
                            title={`${selectedDisaster.title} Safety Guide`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>

                    {/* Content section */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            {selectedDisaster.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            {selectedDisaster.description}
                        </p>

                        {/* Precautions */}
                        <div className="space-y-8">
                            {selectedDisaster.precautions.map((section, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        {section.category}
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                        {section.items.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Emergency Kit */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Emergency Kit Essentials
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                    {selectedDisaster.essentials.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Food & Edibles */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Recommended Food & Edibles
                                </h3>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                    {selectedDisaster.edibles.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafetyMeasures;
