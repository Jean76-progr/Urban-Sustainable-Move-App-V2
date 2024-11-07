import React, { useState, useRef, useEffect } from 'react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
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

    const menuVariants = {
        hidden: { opacity: 0, y: -5, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", bounce: 0.3 }
        },
        exit: { 
            opacity: 0,
            y: -5,
            scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    if (user) {
        return (
            <div className="absolute top-4 right-4 z-[2000]" ref={dropdownRef}>
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                    <span className="text-sm font-medium">{user.email}</span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        >
                            <div className="py-1">
                                <motion.button
                                    whileHover={{ backgroundColor: "#f3f4f6" }}
                                    onClick={() => {
                                        onLogout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600"
                                >
                                    Se déconnecter
                                </motion.button>
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
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>Compte</span>
                <ChevronDownIcon className="h-4 w-4" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                        <div className="py-1">
                            {['login', 'register'].map((mode) => (
                                <motion.button
                                    key={mode}
                                    whileHover={{ backgroundColor: "#f3f4f6" }}
                                    onClick={() => {
                                        onAuthClick(mode);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700"
                                >
                                    {mode === 'login' ? 'Se connecter' : 'Créer un compte'}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}