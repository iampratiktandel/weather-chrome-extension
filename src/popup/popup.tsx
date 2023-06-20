import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './popup.css';
import WeatherCard from './WeatherCard/WeatherCard';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Valsad" />
      <WeatherCard city="Error" />
    </div>
  )
}

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render((<App />)); 
