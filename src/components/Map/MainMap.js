import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { SideMenu } from '../Layout/SideMenu';
import { transportStops, getStopIcon } from '../../data/transportStops';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MainMap = () => {
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filters, setFilters] = useState({
        bus: true,
        tram: true,
        bike: true
    });

    const position = [49.1951, 16.6068]; // Centre de Brno

    const handleFilterChange = (type) => {
        setFilters(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const createCustomIcon = (type) => {
        const iconStyle = getStopIcon(type);
        return L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="
                background-color: ${iconStyle.backgroundColor};
                width: ${iconStyle.width};
                height: ${iconStyle.height};
                border-radius: ${iconStyle.borderRadius};
                border: ${iconStyle.border};
                box-shadow: ${iconStyle.boxShadow};
            "></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
    };

    const allStops = [
        ...Object.values(transportStops).flat()
    ];

    return (
        <div className="w-full h-screen relative">
            <button
                onClick={() => setIsSideMenuOpen(true)}
                className="absolute top-4 left-4 z-[2000] bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50"
            >
                <Bars3Icon className="h-6 w-6 text-gray-600" />
            </button>

            <SideMenu
                isOpen={isSideMenuOpen}
                onClose={() => setIsSideMenuOpen(false)}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                onFilterChange={handleFilterChange}
            />

            <MapContainer 
                center={position} 
                zoom={14} 
                style={{ height: "100%", width: "100%" }}
                className={isDarkMode ? 'map-dark' : ''}
            >
                <TileLayer
                    url={isDarkMode 
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {allStops.filter(stop => filters[stop.type]).map((stop) => (
                    <Marker
                        key={stop.id}
                        position={stop.coordinates}
                        icon={createCustomIcon(stop.type)}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{stop.name}</h3>
                                <p className="text-gray-600 capitalize">{stop.type}</p>
                                {stop.lines && (
                                    <div className="mt-2">
                                        <p className="font-medium">Lignes :</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {stop.lines.map(line => (
                                                <span 
                                                    key={line}
                                                    className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                                                >
                                                    {line}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {stop.capacity && (
                                    <p className="mt-2">
                                        Capacité : {stop.capacity} vélos
                                    </p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MainMap;