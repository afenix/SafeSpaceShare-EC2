import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const ExploreMapSection = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedOption, setSelectedOption] = useState('sad_happy');

  const options = {
    emotions: [
      { value: 'sad_happy', label: 'Sad-Happy', colors: ['#8c6a4b', '#f4c542'] },
      { value: 'anxious_calm', label: 'Anxious-Calm', colors: ['#2b4a73', '#a6cce1'] },
      { value: 'tired_awake', label: 'Tired-Awake', colors: ['#6b4e30', '#f5a623'] },
      { value: 'unsafe_safe', label: 'Unsafe-Safe', colors: ['#d9534f', '#5cb85c'] },
      { value: 'isolated_belonging', label: 'Isolated-Belonging', colors: ['#4b4b4b', '#f4c842'] },
    ],
  };

   // Define emotion labels as options for map popup
   const calmAnxiousOptions = [
    { value: 1, label: 'Very Anxious' },
    { value: 2, label: 'Anxious' },
    { value: 3, label: 'Centered' },
    { value: 4, label: 'Calm' },
    { value: 5, label: 'Very Calm' },
  ];

  const happinessSadnessOptions = [
    { value: 1, label: 'Despondent' },
    { value: 2, label: 'Sad' },
    { value: 3, label: 'Balanced' },
    { value: 4, label: 'Happy' },
    { value: 5, label: 'Elated' },
  ];

  const awakeTiredOptions = [
    { value: 1, label: 'Exhausted' },
    { value: 2, label: 'Tired' },
    { value: 3, label: 'Awake' },
    { value: 4, label: 'Alert' },
    { value: 5, label: 'Energized' },
  ];

  const safetyOptions = [
    { value: 1, label: 'Dangerous' },
    { value: 2, label: 'Risky' },
    { value: 3, label: 'Uncertain' },
    { value: 4, label: 'Secure' },
    { value: 5, label: 'Very Safe' },
  ];

  const belongingOptions = [
    { value: 1, label: 'Alienated' },
    { value: 2, label: 'Lonely' },
    { value: 3, label: 'Ambivalent' },
    { value: 4, label: 'Connected' },
    { value: 5, label: 'Integrated' },
  ];

  const getEmotionLabel = (value, options) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : 'Unknown';
  };


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-98, 38.88],
      zoom: 3,
    });

    map.on('load', () => {
      setMapInstance(map);
      fetchGeoJSONData(map);
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    return () => map.remove();
  }, []);

  // Only run this effect when the selectedOption changes to update the map layer
  useEffect(() => {
    if (mapInstance) {
      console.log('Updating heatmap with selected option:', selectedOption);
      updateHeatmapLayer(mapInstance, selectedOption);
    }
  }, [selectedOption, mapInstance]);

  // Function to flatten nested 'emotions' into top-level properties
  const flattenEmotions = (geojsonData) => {
    return {
      ...geojsonData,
      features: geojsonData.features.map(feature => ({
        ...feature,
        properties: {
          ...feature.properties,
          ...feature.properties.emotions // Spread the emotions properties into the top-level properties
        }
      }))
    };
  }

  const fetchGeoJSONData = async (map) => {
    try {
      const response = await fetch('/api/geojson');
      const geojsonData = await response.json();

      const flatEmotionJSON = flattenEmotions(geojsonData, 'emotions');
      // TODO: add logic for flattenting identities
      // flattenIdentities = flattenData(geojsonData, 'emotions');
      map.addSource('point-data', {
        type: 'geojson',
        data: flatEmotionJSON,
      });

      // Reference: https://docs.mapbox.com/help/tutorials/make-a-heatmap-with-mapbox-gl-js/#what-is-the-purpose-of-a-heatmap
      map.addLayer({
        id: 'heatmap-id',
        type: 'heatmap',
        source: 'point-data',
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', selectedOption], // Initial emotion
            1, 1,
            5, 0
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, options.emotions.find(emotion => emotion.value === selectedOption).colors[0],
            1, options.emotions.find(emotion => emotion.value === selectedOption).colors[1]
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            9, 20
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, 1,   // Opacity is 1 at zoom level 7
            12, 0.3 // Opacity is 0.3 at zoom level 12
          ],
        },
      });

      // Add point layer
      map.addLayer({
        id: 'points-id',
        type: 'circle',
        source: 'point-data',
        paint: {
          'circle-radius': 2,
          'circle-color': '#bd831f',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // Add popups to points
      map.on('click', 'points-id', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        const popupContent = `
          <strong>${properties.locationName}</strong><br>
          Feeling: ${getEmotionLabel(properties.sad_happy, happinessSadnessOptions)}<br>
          Stress: ${getEmotionLabel(properties.anxious_calm, calmAnxiousOptions)}<br>
          Alertness: ${getEmotionLabel(properties.tired_awake, awakeTiredOptions)}<br>
          Safety: ${getEmotionLabel(properties.unsafe_safe, safetyOptions)}<br>
          Belonging: ${getEmotionLabel(properties.isolated_belonging, belongingOptions)}
        `;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map);
      });

      // Change the cursor to a pointer when over a point
      map.on('mouseenter', 'points-id', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back when it leaves
      map.on('mouseleave', 'points-id', () => {
        map.getCanvas().style.cursor = '';
      });

      // Update the heatmap layer after it has been added
      updateHeatmapLayer(map, selectedOption);

      // Zoom the map to the extent of the data
      const bounds = new mapboxgl.LngLatBounds();
      geojsonData.features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates);
      });
      map.fitBounds(bounds, {
        padding: 20,
        maxZoom: 12,
      });

    } catch (error) {
      console.error('Error fetching or adding data:', error);
    }
  };

  const updateHeatmapLayer = (map, emotion) => {
    const selectedEmotion = options.emotions.find(opt => opt.value === emotion);
    const layer = map.getLayer('heatmap-id');
    console.log('selectedEmotion in updateHeatmapLayer:', selectedEmotion);

    if (layer) {
      map.setPaintProperty('heatmap-id', 'heatmap-weight', [
        'interpolate',
        ['linear'],
        ['get', emotion],
        0, 0,
        5, 1
      ]);

      map.setPaintProperty('heatmap-id', 'heatmap-color', [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(33,102,172,0)',
        0.2, selectedEmotion.colors[0],
        1, selectedEmotion.colors[1]
      ]);
    } else {
      console.error('Heatmap layer not found when attempting to update.');
    }
  };

  return (
    <div id='explore-header' className='explore-section'>
      <h1 className='section-header'>Explore the Map</h1>
      <p className='info-text'>
        Explore user experiences by selecting different emotions from the
        dropdown menu below. Click on a point to view more details.
      </p>
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <div id="map" style={{ height: '100%', width: '100%' }} />
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <span className='legend-title'>Legend</span>
          <div className='legend-title'>
            <span style={{
              backgroundColor: '#bd831f',  // Circle color
              width: '6px',                // Circle diameter matching the map point size
              height: '6px',               // Circle diameter matching the map point size
              display: 'inline-block',
              borderRadius: '50%',         // Make it a circle
              border: '1px solid #fff',    // Circle stroke color and width
              marginRight: '5px'           // Space between the circle and text }}></span>

            }}></span>
          <span>Experience Locations</span>
          </div>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            style={{ marginTop: '10px', padding: '5px' }}
          >
            {options.emotions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExploreMapSection;
