// src/components/Events/EventForm.js
import React, { useState } from 'react';
import { XMarkIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const EventForm = ({ type, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        meetingPoint: '',
        maxParticipants: '',
        eventType: type,
        // Champs spécifiques selon le type d'événement
        ...(type === 'carpooling' && {
            seatsAvailable: '4',
            carModel: ''
        }),
        ...(type === 'cyclist-matching' && {
            difficulty: 'medium',
            distance: '',
            pace: 'moderate'
        }),
        ...(type === 'car-free-day' && {
            alternativeTransport: 'walking'
        })
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({
                ...formData,
                date: new Date(formData.date).toISOString()
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fonction pour obtenir le titre du formulaire selon le type d'événement
    const getFormTitle = () => {
        switch (type) {
            case 'carpooling':
                return 'Créer un trajet partagé';
            case 'cyclist-matching':
                return 'Créer une sortie vélo';
            case 'car-free-day':
                return 'Organiser une journée sans voiture';
            default:
                return 'Créer un événement';
        }
    };

    // Champs spécifiques selon le type d'événement
    const renderSpecificFields = () => {
        switch (type) {
            case 'carpooling':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Places disponibles
                            </label>
                            <input
                                type="number"
                                name="seatsAvailable"
                                value={formData.seatsAvailable}
                                onChange={handleChange}
                                min="1"
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Modèle de voiture
                            </label>
                            <input
                                type="text"
                                name="carModel"
                                value={formData.carModel}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                    </>
                );

            case 'cyclist-matching':
                return (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Difficulté
                            </label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="easy">Facile</option>
                                <option value="medium">Moyen</option>
                                <option value="hard">Difficile</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Distance (km)
                            </label>
                            <input
                                type="number"
                                name="distance"
                                value={formData.distance}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Allure
                            </label>
                            <select
                                name="pace"
                                value={formData.pace}
                                onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="relaxed">Tranquille</option>
                                <option value="moderate">Modérée</option>
                                <option value="sporty">Sportive</option>
                            </select>
                        </div>
                    </>
                );

            case 'car-free-day':
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mode de transport alternatif
                        </label>
                        <select
                            name="alternativeTransport"
                            value={formData.alternativeTransport}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        >
                            <option value="walking">Marche</option>
                            <option value="cycling">Vélo</option>
                            <option value="public">Transport en commun</option>
                        </select>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-xl overflow-hidden"
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold dark:text-white">{getFormTitle()}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                        >
                            <XMarkIcon className="h-5 w-5 dark:text-white" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Titre
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date et heure
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Point de départ
                            </label>
                            <input
                                type="text"
                                name="meetingPoint"
                                value={formData.meetingPoint}
                                onChange={handleChange}
                                required
                                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>

                        {renderSpecificFields()}

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Création...' : 'Créer'}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EventForm;