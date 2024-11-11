// src/components/Events/EventList.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { eventService } from '../../services/eventService';
import {
    CalendarIcon,
    MapPinIcon,
    UserGroupIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const loadEvents = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const userEvents = await eventService.getUserEvents(user.uid);
                console.log('Fetched events:', userEvents);
                setEvents(userEvents);
            } catch (error) {
                console.error('Error loading events:', error);
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, [user]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date non définie';
        try {
            const date = new Date(dateString);
            return date.toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Date invalide';
        }
    };

    const getEventTypeIcon = (eventType) => {
        switch (eventType) {
            case 'carpooling':
                return <UserGroupIcon className="w-5 h-5 text-green-500" />;
            case 'cyclist-matching':
                return <UserGroupIcon className="w-5 h-5 text-blue-500" />;
            case 'car-free-day':
                return <CalendarIcon className="w-5 h-5 text-purple-500" />;
            default:
                return <CalendarIcon className="w-5 h-5 text-gray-500" />;
        }
    };

    const getEventTitle = (eventType) => {
        switch (eventType) {
            case 'carpooling':
                return 'Covoiturage';
            case 'cyclist-matching':
                return 'Sortie vélo';
            case 'car-free-day':
                return 'Journée sans voiture';
            default:
                return 'Événement';
        }
    };

    if (loading) {
        return (
            <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                Chargement des événements...
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                Aucun événement créé.
            </div>
        );
    }

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center px-4 mb-4">
                <h3 className="text-lg font-medium dark:text-white">
                    Mes événements
                </h3>
            </div>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg hover:shadow-md transition-shadow mx-4"
                    >
                        <div className="flex items-start space-x-3">
                            {getEventTypeIcon(event.eventType)}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate">
                                    {event.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {getEventTitle(event.eventType)}
                                </p>

                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <ClockIcon className="w-4 h-4 mr-2" />
                                        {formatDate(event.date)}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <MapPinIcon className="w-4 h-4 mr-2" />
                                        De: {event.meetingPoint || 'Non défini'}
                                    </div>

                                    {event.location && (
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <MapPinIcon className="w-4 h-4 mr-2" />
                                            À: {event.location}
                                        </div>
                                    )}

                                    {event.maxParticipants && (
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <UserGroupIcon className="w-4 h-4 mr-2" />
                                            {event.maxParticipants} participants max.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;