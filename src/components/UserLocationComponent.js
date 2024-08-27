import React, { useState, useEffect, useCallback, forwardRef  } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const UserLocationComponent = forwardRef(({ formData, setFormData }, ref) => {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);

  // Effect to fetch the user's location when the component is mounted
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, {
          method: 'POST',
        });
        const data = await response.json();
        const { lat, lng } = data.location;

        // Update state with user's latitude and longitude
        setUserLocation({ latitude: lat, longitude: lng });
      } catch (error) {
        console.error('Error fetching geolocation:', error);
         // Handle failure by setting to a default location
         setUserLocation({ latitude: 37.7749, longitude: -122.4194 }); // Default to San Francisco
      }
    };

    fetchUserLocation();
  }, []);

  // Style infoWindow
  const markerPopup = `
    <div>
      <h4 class='map-popup-text'>Is this the location of your experience?</h4>
      <div class='map-button-group'>
        <button class=map-option-button id="confirm-location" style="margin-right: 5px;">Yes</button>
        <button class=map-option-button id="deny-location">No</button>
      </div>
    </div>
  `;

  const formatDateToLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handlePlaceSelected = useCallback((autocomplete) => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      console.error("Place has no geometry");
      return;
    }

    const location = place.geometry.location;
    const timestamp = formatDateToLocal(new Date());

    map.panTo(location);
    setUserLocation({ latitude: location.lat(), longitude: location.lng() });

    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new window.google.maps.Marker({
      position: location,
      map: map,
    });

    setMarker(newMarker);

    setFormData((prevData) => ({
      ...prevData,
      location: {
        latitude: location.lat(),
        longitude: location.lng(),
      },
      locationName: place.name || '',
      datetime: timestamp,
    }));

    const newInfoWindow = new window.google.maps.InfoWindow({
      content: markerPopup,
    });
    newInfoWindow.open(map, newMarker);

    window.google.maps.event.addListenerOnce(newInfoWindow, 'domready', () => {
      document.getElementById('confirm-location').addEventListener('click', () => handleConfirmLocation(newInfoWindow));
      document.getElementById('deny-location').addEventListener('click', () => handleDenyLocation(newInfoWindow));
    });
  }, [map, marker, setUserLocation, setMarker, setFormData]);

  useEffect(() => {
    if (showSearchBox && map) {
      const input = document.getElementById('autocomplete');
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', () => handlePlaceSelected(autocomplete));
    }
  }, [showSearchBox, map, handlePlaceSelected]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
    setShowSearchBox(true);

    mapInstance.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_LEFT,
      },
    });
  };

  const handleConfirmLocation = (infoWindow) => {
    if (marker) {
      marker.setMap(null);
    }

    infoWindow.close();

    document.getElementById('location-time-section').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDenyLocation = (infoWindow) => {
    infoWindow.close();
    setShowSearchBox(true);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div className='form-section'>
        <div className='map-text-container'>
          <h1 className='section-header dark'>
            Let's Begin by Adding the Location of Your Experience
          </h1>
          <p className='map-instructions dark'>
            Search for the address or name of the location where your experience happened.
          </p>
          <p className='map-instructions dark'>Confirm it on the map to continue.</p>
        </div>
        {showSearchBox && (
          <input
            id="autocomplete"
            type="text"
            placeholder="Enter your location"
            style={{
              width: '300px',
              padding: '10px',
              margin: '20px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        )}
        <GoogleMap
          mapContainerStyle={{
            borderRadius: '10px',
            height: '50vh',
            width: '100vw',
            margin: '20px',
          }}
          center={{ lat: userLocation.latitude || 0, lng: userLocation.longitude || 0 }}
          zoom={10}
          onLoad={onLoad}
        >
          {/* The Marker and InfoWindow are managed separately in useEffect */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
});

export default UserLocationComponent;
