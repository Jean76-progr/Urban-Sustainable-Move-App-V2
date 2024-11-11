import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthDropdown({ onAuthClick, user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (user) {
        return (
            <div className="absolute top-4 right-4 z-[2000]" ref={dropdownRef}>
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {user.displayName ? (
                                <span className="text-lg font-semibold">
                                    {user.displayName.charAt(0).toUpperCase()}
                                </span>
                            ) : (
                                <UserCircleIcon className="w-6 h-6" />
                            )}
                        </div>
                    </div>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100"
                        >
                            <div className="p-3 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                <p className="text-xs text-gray-500 mt-1">Connecté</p>
                            </div>
                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150"
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return (
        <div className="absolute top-4 right-4 z-[2000]" ref={dropdownRef}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <UserCircleIcon className="w-6 h-6 text-gray-600" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100"
                    >
                        <div className="p-2 space-y-1">
                            <button
                                onClick={() => {
                                    onAuthClick('login');
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-150"
                            >
                                Se connecter
                            </button>
                            <button
                                onClick={() => {
                                    onAuthClick('register');
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-150"
                            >
                                Créer un compte
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}