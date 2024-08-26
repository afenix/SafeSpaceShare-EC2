import React, { useRef, useEffect, useState, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'; // Import Geocoder CSS

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapComponent = forwardRef(({ formData, setFormData, onMapReady }, ref) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current) {
        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-98.5795, 39.8283], // Default to the geographic center of the US
          zoom: 2,
          scrollZoom: false, // Disable zoom on scroll
        });

        setMap(map);

        // Add geolocate control if geolocation is supported
        if ('geolocation' in navigator) {
          const geolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          });
          map.addControl(geolocateControl, 'top-left');
        } else {
          console.warn('Geolocation support is not available so the GeolocateControl will be disabled.');
        }

        // **Add the Mapbox Geocoder (Search Input)**
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl, // Ensure the geocoder is linked to the Mapbox instance
          marker: false, // Disable the default marker
          placeholder: 'Search for a location...', // Placeholder text
        });

        // Add the geocoder to the map
        map.addControl(geocoder, 'top-right');

        // Handle the result event to update form data when a location is selected
        geocoder.on('result', (event) => {
          const { result } = event;
          const { center } = result; // center contains [lng, lat]

          // Add a marker at the searched location
          new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(map);

          // Update form data with selected location
          setFormData((prevData) => ({
            ...prevData,
            location: {
              longitude: center[0],
              latitude: center[1],
            },
          }));
        });

        // Notify the parent component when the map is ready
        if (onMapReady) {
          onMapReady(map);
        }
      }
    };

    if (!map && mapRef.current) {
      initializeMap();
    }
  }, [setFormData, onMapReady, map]);

  return (
    <div className='form-section'>
      <div className='map-text-container'>
        <h1 className='section-header dark'>
          Let's Begin by Adding the Location of Your Experience
        </h1>
        <p className='map-instructions dark'>
          To get started, simply enter the name or address of your location in the search bar below.
        </p>
      </div>
      <div
        ref={mapRef}
        className='map-container'
        style={{
          borderRadius: '10px',
          height: '50vh',
          width: '100vw',
          margin: '20px',
        }}
      ></div>
    </div>
  );
});

export default MapComponent;
