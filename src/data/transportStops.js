export const transportStops = {
    bus: [
        { id: 'b1', name: 'Česká', coordinates: [49.1951, 16.6068], type: 'bus', lines: ['12', '13'] },
        { id: 'b2', name: 'Hlavní nádraží', coordinates: [49.1909, 16.6122], type: 'bus', lines: ['40', '48', '50'] },
        { id: 'b3', name: 'Mendlovo náměstí', coordinates: [49.1905, 16.5942], type: 'bus', lines: ['25', '26', '37'] },
        { id: 'b4', name: 'Úvoz', coordinates: [49.1967, 16.5977], type: 'bus', lines: ['25', '26', '37'] },
        { id: 'b5', name: 'Konečného náměstí', coordinates: [49.2047, 16.5977], type: 'bus', lines: ['12', '13'] }
    ],
    tram: [
        { id: 't1', name: 'Náměstí Svobody', coordinates: [49.1957, 16.6083], type: 'tram', lines: ['1', '4', '8'] },
        { id: 't2', name: 'Hlavní nádraží', coordinates: [49.1907, 16.6125], type: 'tram', lines: ['1', '2', '4', '9'] },
        { id: 't3', name: 'Malinovského náměstí', coordinates: [49.1967, 16.6158], type: 'tram', lines: ['1', '2', '4', '9'] },
        { id: 't4', name: 'Moravské náměstí', coordinates: [49.1986, 16.6086], type: 'tram', lines: ['1', '6'] },
        { id: 't5', name: 'Mendlovo náměstí', coordinates: [49.1903, 16.5945], type: 'tram', lines: ['1', '5', '6'] }
    ],
    bikes: [
        { id: 'bk1', name: 'Moravské náměstí', coordinates: [49.1984, 16.6089], type: 'bike', capacity: 10 },
        { id: 'bk2', name: 'Česká', coordinates: [49.1953, 16.6070], type: 'bike', capacity: 8 },
        { id: 'bk3', name: 'Zelný trh', coordinates: [49.1922, 16.6083], type: 'bike', capacity: 6 },
        { id: 'bk4', name: 'Hlavní nádraží', coordinates: [49.1905, 16.6127], type: 'bike', capacity: 12 },
        { id: 'bk5', name: 'Špilberk', coordinates: [49.1947, 16.5994], type: 'bike', capacity: 8 }
    ]
};

export const getStopIcon = (type) => {
    const iconSize = 20;
    const commonStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        borderRadius: '50%',
        border: '2px solid white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
    };

    switch (type) {
        case 'bus':
            return { ...commonStyles, backgroundColor: '#4CAF50' };
        case 'tram':
            return { ...commonStyles, backgroundColor: '#2196F3' };
        case 'bike':
            return { ...commonStyles, backgroundColor: '#FF9800' };
        default:
            return { ...commonStyles, backgroundColor: '#9E9E9E' };
    }
};