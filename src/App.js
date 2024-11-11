import React, { useState, useEffect } from 'react';
import { AuthModal } from './components/Auth/AuthModal';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { AuthDropdown } from './components/Auth/AuthDropdown';
import MainMap from './components/Map/MainMap';
import SplashScreen from './components/SplashScreen';
import { useAuth } from './hooks/useAuth';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
    const [notification, setNotification] = useState(null);
    const { user, login, register, logout } = useAuth();

    useEffect(() => {
        // Timer pour masquer le splash screen
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 6000); // 6 secondes de délai

        return () => clearTimeout(timer);
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAuthClick = (mode) => {
        setAuthModal({ isOpen: true, mode });
    };

    const handleAuthSubmit = async (formData) => {
        try {
            if (authModal.mode === 'login') {
                await login(formData.email, formData.password);
                showNotification('Connexion réussie !');
            } else {
                await register(formData.email, formData.password, formData.name);
                showNotification('Compte créé avec succès !');
            }
            setAuthModal({ ...authModal, isOpen: false });
        } catch (error) {
            console.error('Auth error:', error);
            let message = 'Une erreur est survenue';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'Cet email est déjà utilisé';
                    break;
                case 'auth/invalid-email':
                    message = 'Email invalide';
                    break;
                case 'auth/weak-password':
                    message = 'Le mot de passe doit contenir au moins 6 caractères';
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    message = 'Email ou mot de passe incorrect';
                    break;
                default:
                    message = 'Une erreur est survenue lors de l\'authentification';
            }
            showNotification(message, 'error');
        }
    };

    return (
        <>
            <AnimatePresence>
                {showSplash && <SplashScreen />}
            </AnimatePresence>

            <div className={`w-screen h-screen relative overflow-hidden transition-opacity duration-500 ${
                showSplash ? 'opacity-0' : 'opacity-100'
            }`}>
                {/* Notification */}
                {notification && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
                        <div className={`rounded-lg shadow-lg p-4 ${
                            notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {notification.message}
                        </div>
                    </div>
                )}

                {/* Auth Dropdown */}
                <AuthDropdown
                    user={user}
                    onAuthClick={handleAuthClick}
                    onLogout={logout}
                />

                {/* Main Map */}
                <div className="w-full h-full">
                    <MainMap />
                </div>

                {/* Auth Modal */}
                <AuthModal
                    isOpen={authModal.isOpen}
                    onClose={() => setAuthModal({ ...authModal, isOpen: false })}
                    title={authModal.mode === 'login' ? 'Connexion' : 'Créer un compte'}
                >
                    {authModal.mode === 'login' ? (
                        <LoginForm
                            onSubmit={handleAuthSubmit}
                            onSwitchToRegister={() => setAuthModal({ isOpen: true, mode: 'register' })}
                        />
                    ) : (
                        <RegisterForm
                            onSubmit={handleAuthSubmit}
                            onSwitchToLogin={() => setAuthModal({ isOpen: true, mode: 'login' })}
                        />
                    )}
                </AuthModal>
            </div>
        </>
    );
}

export default App;