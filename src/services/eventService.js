// src/services/eventService.js
import { db } from '../firebase/firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';

export const eventService = {
    async createEvent(eventData, userId) {
        try {
            console.log('Creating event with data:', eventData, 'for user:', userId); // Debug log

            // Préparation des données de l'événement
            const eventToCreate = {
                ...eventData,
                createdBy: userId,
                createdAt: serverTimestamp(),
                participants: [userId],
                status: 'active'
            };

            // Création de l'événement dans Firestore
            const eventsRef = collection(db, 'events');
            const docRef = await addDoc(eventsRef, eventToCreate);

            console.log('Event created with ID:', docRef.id); // Debug log

            return {
                id: docRef.id,
                ...eventToCreate,
                createdAt: new Date().toISOString() // Pour l'affichage immédiat
            };
        } catch (error) {
            console.error('Error in createEvent:', error);
            throw new Error('Erreur lors de la création de l\'événement: ' + error.message);
        }
    },

    async getUserEvents(userId) {
        if (!userId) return [];

        try {
            console.log('Fetching events for user:', userId); // Debug log

            const eventsRef = collection(db, 'events');
            const q = query(
                eventsRef,
                where('createdBy', '==', userId),
                orderBy('createdAt', 'desc')
            );

            const snapshot = await getDocs(q);
            const events = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
                date: doc.data().date // Assurez-vous que la date est au bon format
            }));

            console.log('Fetched events:', events); // Debug log
            return events;
        } catch (error) {
            console.error('Error in getUserEvents:', error);
            throw new Error('Erreur lors de la récupération des événements: ' + error.message);
        }
    },

    async getAllEvents() {
        try {
            const eventsRef = collection(db, 'events');
            const q = query(eventsRef, orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null
            }));
        } catch (error) {
            console.error('Error in getAllEvents:', error);
            throw new Error('Erreur lors de la récupération des événements: ' + error.message);
        }
    }
};