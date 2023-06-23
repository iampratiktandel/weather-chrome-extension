import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { Add as AddIcon } from '@mui/icons-material';
import { Box, Grid, IconButton, InputBase, Paper } from '@mui/material';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import { LocalStorageOptions, getStoredCities, getStoredOptions, setStoredCities, setStoredOptions } from '../utils/storage';
import './popup.css';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities: string[]) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, [])

  const handleCityBtnClick = () => {
    if (cityInput === '') {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities([...cities, cityInput]);
      setCityInput('');
    });
  }

  const handleCityDeleteBtnClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  }

  const handleTempScaleBtnClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
    };
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions);
    })
  }

  // const handleOverlayBtnClick = () => {
  //   chrome.tabs.query({
  //     active: true
  //   }, (tabs) => {
  //     if (tabs.length > 0) {
  //       chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
  //     }
  //   })
  // }

  if (!options) {
    return null;
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase placeholder='Add a city name'
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityBtnClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton onClick={handleTempScaleBtnClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        {/* <Grid item>
          <Paper>
            <Box py="4px">
              <IconButton onClick={handleOverlayBtnClick}>
                <PictureInPictureIcon onClick={handleOverlayBtnClick} />
              </IconButton>
            </Box>
          </Paper>
        </Grid> */}
      </Grid>
      {
        options.homeCity != '' &&
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      }
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={index}
          onDelete={() => handleCityDeleteBtnClick(index)}
        />
      ))}
    </Box>
  )
}

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render((<App />)); 
