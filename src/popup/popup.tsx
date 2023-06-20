import React from 'react';
import ReactDOM from 'react-dom/client';
import './popup.css';
import WeatherCard from './WeatherCard/WeatherCard';

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city="Valsad" />
      <WeatherCard city="Toronto" />
    </div>
  )
}

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render((<App />)); 
