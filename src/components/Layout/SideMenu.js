import React from 'react';
import { XMarkIcon, SunIcon, MoonIcon, MapIcon, UserGroupIcon, CalendarIcon, StarIcon, ChartBarIcon, MapPinIcon, BellIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export const SideMenu = ({ isOpen, onClose, isDarkMode, toggleDarkMode, onFilterChange }) => {
    const transportTypes = [
        { id: 'bus', label: 'Bus' },
        { id: 'tram', label: 'Tramway' },
        { id: 'metro', label: 'Métro' },
        { id: 'train', label: 'Train' }
    ];

    const events = [
        {
            id: 'carpooling',
            title: 'Carpooling',
            description: 'Trouvez ou proposez des trajets partagés',
            icon: UserGroupIcon,
            features: [
                { icon: MapIcon, text: 'Recherche rapide de trajets' },
                { icon: StarIcon, text: 'Système de notation' },
                { icon: ChartBarIcon, text: 'Statistiques environnementales' }
            ]
        },
        {
            id: 'cyclist-matching',
            title: 'Cyclist Matching',
            description: 'Connectez-vous avec d\'autres cyclistes',
            icon: MapPinIcon,
            features: [
                { icon: UserGroupIcon, text: 'Algorithme de matching' },
                { icon: MapIcon, text: 'Carte interactive' },
                { icon: MapPinIcon, text: 'Suivi en temps réel' }
            ]
        },
        {
            id: 'car-free-day',
            title: 'Car-free Day',
            description: 'Participez à la journée sans voiture',
            icon: CalendarIcon,
            features: [
                { icon: UserGroupIcon, text: 'Inscription simple' },
                { icon: BellIcon, text: 'Rappels automatiques' },
                { icon: MapIcon, text: 'Options de transport alternatives' }
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    />
                    
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-50 overflow-y-auto"
                    >
                        <div className="p-4">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold dark:text-white">Menu</h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        {isDarkMode ? (
                                            <SunIcon className="h-5 w-5 dark:text-white" />
                                        ) : (
                                            <MoonIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        <XMarkIcon className="h-5 w-5 dark:text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Filtres */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2 dark:text-white">Filtres de transport</h3>
                                <div className="space-y-2">
                                    {transportTypes.map(type => (
                                        <motion.label
                                            key={type.id}
                                            className="flex items-center space-x-2 cursor-pointer"
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                onChange={() => onFilterChange(type.id)}
                                                className="rounded text-blue-500"
                                            />
                                            <span className="dark:text-gray-200">{type.label}</span>
                                        </motion.label>
                                    ))}
                                </div>
                            </div>

                            {/* Événements */}
                            <div>
                                <h3 className="font-medium mb-4 dark:text-white">Événements</h3>
                                <div className="space-y-4">
                                    {events.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center space-x-3 mb-2">
                                                <event.icon className="h-6 w-6 text-blue-500" />
                                                <h4 className="font-medium dark:text-white">{event.title}</h4>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                                {event.description}
                                            </p>
                                            <div className="space-y-2">
                                                {event.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <feature.icon className="h-4 w-4" />
                                                        <span>{feature.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};