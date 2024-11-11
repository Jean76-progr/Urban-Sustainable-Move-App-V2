import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Notification = ({ message, type = 'success', onClose }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                    type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white flex items-center space-x-2`}
            >
                {type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5" />
                ) : (
                    <XCircleIcon className="h-5 w-5" />
                )}
                <span>{message}</span>
            </motion.div>
        </AnimatePresence>
    );
};

export default Notification;