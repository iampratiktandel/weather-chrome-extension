import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import WeatherCard from './WeatherCard/WeatherCard';
import './contentScript.css';
import { Card } from '@mui/material';
import { LocalStorageOptions, getStoredOptions } from '../utils/storage';
import { Messages } from '../utils/messages';

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [isActive, setActive] = useState<boolean>(true);

    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options);
            setActive(options.hasAutoOverlay);
        });
    }, []);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((msg) => {
            if (msg === Messages.TOGGLE_OVERLAY) {
                setActive(!isActive);
            }
        });
    }, [isActive])

    if (!options) {
        return null;
    }

    return (
        <>
            {isActive && (
                <Card className="overlayCard">
                    <WeatherCard
                        city={options.homeCity}
                        tempScale={options.tempScale}
                        onDelete={() => setActive(false)}
                    />
                </Card>
            )}
        </>
    );
}

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);