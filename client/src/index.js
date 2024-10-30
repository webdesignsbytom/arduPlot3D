import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// Analytics
import ReactGA from 'react-ga4';
// Context
import UserContextProvider from './context/UserContext';
import ToggleContextProvider from './context/ToggleContext';
import SimulationContextProvider from './context/SimulationContext';
// Styles
import './styles/index.css';
import './styles/backgrounds.css';
import './styles/components.css';

// Initialize Google Analytics with your tracking ID
ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ToggleContextProvider>
        <SimulationContextProvider>
          <App />
        </SimulationContextProvider>
      </ToggleContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
