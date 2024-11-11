import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 z-[9999]"
        >
            <div className="relative w-full max-w-lg">
                {/* Logo Animation Container */}
                <motion.div
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    className="flex flex-col items-center"
                >
                    {/* Logo principale */}
                    <div className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
                        Urban Move
                    </div>

                    {/* Sous-titre animé */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl text-blue-200 text-center"
                    >
                        Sustainable Transportation
                    </motion.div>

                    {/* Barre de chargement */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.5 }}
                        className="w-full max-w-md h-1 bg-blue-500 mt-8 rounded-full"
                    >
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.8, duration: 1.5 }}
                            className="h-full bg-white rounded-full"
                        />
                    </motion.div>

                    {/* Texte de chargement */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-4 text-blue-200"
                    >
                        Chargement...
                    </motion.div>
                </motion.div>

                {/* Animation d'arrière-plan */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 animate-pulse" />
                    <div className="absolute inset-0">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
                                animate={{
                                    scale: [0, 1, 0],
                                    x: Math.random() * 200 - 100,
                                    y: Math.random() * 200 - 100,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: "easeInOut"
                                }}
                                className="absolute w-4 h-4 bg-blue-400 rounded-full opacity-20"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SplashScreen;