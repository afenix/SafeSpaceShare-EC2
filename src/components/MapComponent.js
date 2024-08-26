import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = forwardRef(({ formData, setFormData }, ref) => {

  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const markerPopup = `
          <div>
            <h4 class='map-popup-text'>Is this the location of your experience?</h4>
            <div class='map-button-group'>
              <button class=map-option-button id="confirm-location" style="margin-right: 5px;">Yes</button>
              <button class=map-option-button id="deny-location">No</button>
            </div>
          </div>
        `;

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

  // Effect to initialize the map and add the marker/info window when the user's location is available
  useEffect(() => {
    if (map && userLocation.latitude !== null && userLocation.longitude !== null) {
      const location = { lat: userLocation.latitude, lng: userLocation.longitude };

      if (marker) {
        marker.setMap(null); // Cleanup previous marker
      }

      const newMarker = new window.google.maps.Marker({
        position: location,
        map: map,
      });

      setMarker(newMarker);

      if (infoWindow) {
        infoWindow.close();
        setInfoWindow(null);
      }

      const newInfoWindow = new window.google.maps.InfoWindow({
        content: markerPopup,
      });

      newInfoWindow.open(map, newMarker);
      setInfoWindow(newInfoWindow);

      window.google.maps.event.addListenerOnce(newInfoWindow, 'domready', () => {
        document.getElementById('confirm-location').addEventListener('click', handleConfirmLocation);
        document.getElementById('deny-location').addEventListener('click', handleDenyLocation);
      });
    }
  }, [map, userLocation]);

  // Handle the map load event to store the map instance
  const onLoad = (mapInstance) => {
    setMap(mapInstance);

    mapInstance.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_LEFT
      }
    });
  };

  // Handle the "Yes" button click event
  const handleConfirmLocation = () => {
    // Update formData with the user's confirmed location
    setFormData((prevData) => ({
      ...prevData,
      location: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    }));

    // Remove the marker from the map
    if (marker) {
      marker.setMap(null);
    }

    if (infoWindow) {
      console.log('infoWindow state is set so it should be closed now... ')
      infoWindow.close();
      setInfoWindow(null);  // Reset state to ensure proper management
    }

    // Scroll to the next section of the form
    document.getElementById('location-time-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Handle the "No" button click event
  const handleDenyLocation = () => {
    if (infoWindow) {
      infoWindow.close();
      setInfoWindow(null);  // Reset state to ensure proper management
    }
    setShowSearchBox(true); // Show the search box for the user to enter a new location
  };

  // Handle the event when the user selects a place from the search box
  const handlePlaceSelected = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      console.error("Place has no geometry");
      return;
    }

    const location = place.geometry.location;
    map.panTo(location); // Pan map to selected location
    setUserLocation({ latitude: location.lat(), longitude: location.lng() });

    // Remove the previous marker
    if (marker) {
      marker.setMap(null);
    }

    // Place a new marker at the selected location
    const newMarker = new window.google.maps.Marker({
      position: location,
      map: map,
    });

    setMarker(newMarker);

    // CApture and update formData with the selected location's latitude and longitude
    setFormData((prevData) => ({
      ...prevData,
      location: {
        latitude: location.lat(),
        longitude: location.lng(),
      },
      // if a user identifies a place, capture the location name and add it to the form
      locationName: place.name || ''
    }));

    // Close any existing InfoWindow before creating a new one
    if (infoWindow) {
      console.log('infoWindow should be closing in the handlePlaceSelected')
      infoWindow.close();
    }

    // Show a new confirmation info window
    const newInfoWindow = new window.google.maps.InfoWindow({
      content: markerPopup,
    });

    newInfoWindow.open(map, newMarker);
    setInfoWindow(newInfoWindow);

    // Attaches event listeners to the new info window buttons
    window.google.maps.event.addListenerOnce(newInfoWindow, 'domready', () => {
      document.getElementById('confirm-location').addEventListener('click', handleConfirmLocation);
      document.getElementById('deny-location').addEventListener('click', handleDenyLocation);
    });
  };

  // Effect to initialize the Google Places Autocomplete when the search box is shown
  useEffect(() => {
    if (showSearchBox && map) {
      const input = document.getElementById('autocomplete');
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      // Handle the place selection
      autocomplete.addListener('place_changed', () => handlePlaceSelected(autocomplete));
    }
  }, [showSearchBox, map]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div className='form-section'>
        <div className='map-text-container'>
          <h1 className='section-header dark'>
            Let's Begin by Adding the Location of Your Experience
          </h1>
          <p className='map-instructions dark'>
            Please confirm your location or search for the correct one.
          </p>
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
          center={{ lat: userLocation.latitude || 0, lng: userLocation.longitude || 0 }} // Center on user location
          zoom={12} // Zoom level for the map
          onLoad={onLoad} // Triggered when the map loads
        >
          {/* The Marker and InfoWindow are managed separately in useEffect */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
});

export default MapComponent;
