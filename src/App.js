import React from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import OpenStreetMap from './OpenStreetMap';

export default function App() {
  // Exemple de valeurs pour city et country
  const city = 'Paris';
  const country = 'France';

  return (
    <div>
      {/* Autres composants ou éléments JSX */}
      <OpenStreetMap city={city} country={country} />
      {/* Autres composants ou éléments JSX */}
    </div>
  );
}