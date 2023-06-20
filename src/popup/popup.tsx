import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
import { fetchOpenWeatherData } from '../utils/api'

const App: React.FC<{}> = () => {

  useEffect(() => {
    fetchOpenWeatherData('Valsad')
    .then((data) => console.log(data))
    .catch((err) => console.error(err))
  }, [])
  
  return (
    <div>
      <img src="icon.png" />
    </div>
  )
}

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render((<App />)); 
