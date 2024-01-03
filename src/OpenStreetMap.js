import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function OpenStreetMap({ city, country }) {
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    // Utilisez une fonction intermédiaire pour gérer la mise à jour de la position
    async function fetchData(city, country) {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?city=${city}&country=${country}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.latitude && data.longitude) {
          const latitude = data.latitude;
          const longitude = data.longitude;
          console.log(
            `Coordonnées de ${city}, ${country}: Latitude ${latitude}, Longitude ${longitude}`
          );
          updatePosition([latitude, longitude]);
        } else {
          console.error(
            'Erreur lors de la récupération des coordonnées:',
            data
          );
        }
      } catch (error) {
        console.error('Erreur lors de la requête HTTP:', error);
      }
    }

    // Appeler la fonction pour récupérer les coordonnées
    fetchData(city, country);

    // Fonction pour mettre à jour la position
    function updatePosition(newPosition) {
      setPosition(newPosition);
      console.log(position);
    }
  }, [city, country]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Un marqueur sur la carte.</Popup>
      </Marker>
    </MapContainer>
  );
}
