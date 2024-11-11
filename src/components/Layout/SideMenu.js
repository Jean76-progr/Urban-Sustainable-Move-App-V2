import React, {useState} from 'react';
import {
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    MapIcon,
    MapPinIcon,
    MoonIcon,
    StarIcon,
    SunIcon,
    UserGroupIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {AnimatePresence, motion} from 'framer-motion';
import EventForm from '../Events/EventForm';
import {useAuth} from '../../hooks/useAuth';
import {eventService} from '../../services/eventService';
import EventList from '../Events/EventList';

export const SideMenu = ({ isOpen, onClose, isDarkMode, toggleDarkMode, onFilterChange }) => {
    const { user } = useAuth();
    const [showEventForm, setShowEventForm] = useState(false);
    const [selectedEventType, setSelectedEventType] = useState(null);
    const [showAuthReminder, setShowAuthReminder] = useState(false);

    // Définition des types d'événements disponibles
    const eventTypes = [
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

    const handleEventButtonClick = (eventId) => {
        if (!user) {
            setShowAuthReminder(true);
            return;
        }
        setSelectedEventType(eventId);
        setShowEventForm(true);
    };

    const handleCreateEvent = async (eventData) => {
        try {
            if (!user) {
                setShowAuthReminder(true);
                return;
            }

            // Ajouter le type d'événement aux données
            const eventToCreate = {
                ...eventData,
                eventType: selectedEventType,
                date: eventData.date || new Date().toISOString(),
            };

            // Créer l'événement
            await eventService.createEvent(eventToCreate, user.uid);

            // Fermer le formulaire
            setShowEventForm(false);

            // Forcer le rechargement de EventList en modifiant son état parent
            // Cela va déclencher un nouveau rendu et donc un nouvel appel à loadEvents
            setShowEventForm(false);

        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

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

                            {/* Section événements */}
                            <div>
                                <h3 className="font-medium mb-4 dark:text-white">Événements</h3>
                                <div className="space-y-4">
                                    {eventTypes.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
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
                                            <div className="space-y-2 mb-4">
                                                {event.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <feature.icon className="h-4 w-4" />
                                                        <span>{feature.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => handleEventButtonClick(event.id)}
                                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                                            >
                                                <CalendarIcon className="h-5 w-5" />
                                                <span>Créer un événement</span>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {user && <EventList />}

                            {/* Modals */}
                            <AnimatePresence>
                                {showEventForm && (
                                    <EventForm
                                        type={selectedEventType}
                                        onSubmit={handleCreateEvent}
                                        onClose={() => setShowEventForm(false)}
                                    />
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {showAuthReminder && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                                        onClick={() => setShowAuthReminder(false)}
                                    >
                                        <motion.div
                                            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <h3 className="text-lg font-medium mb-4 dark:text-white">
                                                Connexion requise
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                                Vous devez être connecté pour créer un événement.
                                                Veuillez vous connecter ou créer un compte.
                                            </p>
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => setShowAuthReminder(false)}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                                                >
                                                    Fermer
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SideMenu;