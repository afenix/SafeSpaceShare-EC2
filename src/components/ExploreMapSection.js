import React, { useEffect, useRef, useState, useCallback } from 'react'
import { loadModules } from 'esri-loader'
import '../App.css'

const ExploreMapComponent = () => {
  const mapRef = useRef()
  const [view, setView] = useState(null)
  const featureLayerRef = useRef()
  const [selectedAttribute, setSelectedAttribute] = useState('happinessSadness')
  const [isHeatmap, setIsHeatmap] = useState(false)

  // create array of feature layer attribute keys
  const attributes = [
    'happinessSadness',
    'calmAnxious',
    'awakeTired',
    'safety',
    'belonging'
  ]

  // create object of keys that correspond to the emotional attributes and values as their respective labels
  const attributeLabels = {
    happinessSadness: 'Feeling',
    calmAnxious: 'Anxious',
    awakeTired: 'Alertness',
    safety: 'Safety',
    belonging: 'Belonging'
  }

  // Mapping of emotional states to corresponding emojis and labels.
  const legendMapping = {
    happinessSadness: {
      emojis: ['😁', '😊', '😐', '😞', '😢'],
      labels: ['Elated', 'Happy', 'Balanced', 'Sad', 'Despondent']
    },
    calmAnxious: {
      emojis: ['😌', '🙂', '😐', '😕', '😟'],
      labels: ['Very Calm', 'Calm', 'Centered', 'Anxious', 'Very Anxious']
    },
    awakeTired: {
      emojis: ['😃', '🙂', '😐', '😪', '😴'],
      labels: ['Energized', 'Alert', 'Awake', 'Tired', 'Exhausted']
    },
    safety: {
      emojis: ['💚', '🤝', '🤷', '⚠️', '🚨'],
      labels: ['Very Safe', 'Secure', 'Uncertain', 'Risky', 'Dangerous']
    },
    belonging: {
      emojis: ['🥰', '🤗', '🤷', '😔', '😶‍🌫️'],
      labels: ['Integrated', 'Connected', 'Ambivalent', 'Lonely', 'Alienated']
    }
  }

  const featureServiceUrl =
    'https://services1.arcgis.com/IVzPgL57Mwzk8mu1/arcgis/rest/services/S3_Simple/FeatureServer'

  // Function to create a custom legend that will display human-readable labels and match to corresponding map symbols
  const createLegend = attribute => {
    const { emojis, labels } = legendMapping[attribute]
    return labels.map((label, index) => ({
      value: String(index),
      label: `${label}`,
      symbol: {
        type: 'simple-marker',
        color: ['green', 'lightgreen', 'yellow', 'orange', 'red'][index],
        size: '15px',
        outline: {
          color: 'white',
          width: 1
        }
      }
    }))
  }

  // Heatmap renderer for feature layer
  const createHeatmapRenderer = attribute => ({
    type: 'heatmap',
    field: attribute,
    colorStops: [
      { color: 'rgba(63, 40, 102, 0)', ratio: 0 },
      { color: '#472b77', ratio: 0.083 },
      { color: '#4e3c8a', ratio: 0.166 },
      { color: '#6351aa', ratio: 0.249 },
      { color: '#7a66cc', ratio: 0.332 },
      { color: '#9580e5', ratio: 0.415 },
      { color: '#b29ffb', ratio: 0.498 },
      { color: '#d3bdfc', ratio: 0.581 },
      { color: '#f2dfff', ratio: 0.664 },
      { color: '#fdf0ff', ratio: 0.747 },
      { color: '#fffdfa', ratio: 1 }
    ],
    radius: 18,
    maxDensity: 0.020833333333333336,
    minDensity: 0
  })

  const createRenderer = attribute => ({
    type: 'unique-value',
    field: attribute,
    uniqueValueInfos: createLegend(attribute)
  })

  const updateRenderer = (featureLayer, attribute, isHeatmap) => {
    console.log('updating renderer')
    console.log('attribute in updataRenderer:', attribute)
    console.log('isHeatmap in updateRenderer:', isHeatmap)
    featureLayer.renderer = isHeatmap
      ? createHeatmapRenderer(attribute)
      : createRenderer(attribute)
  }

  const handleAttributeChange = event => {
    const attribute = event.target.value
    setSelectedAttribute(attribute)
    if (featureLayerRef.current) {
      updateRenderer(featureLayerRef.current, attribute, isHeatmap)
    }
  }

  const handleHeatmapToggle = () => {
    const newHeatmapState = !isHeatmap;
    setIsHeatmap(newHeatmapState);
    updateRenderer(featureLayerRef.current, selectedAttribute, newHeatmapState);
  };

  useEffect(() => {
    let featureLayer

    const initializeMap = async () => {
      try {
        const [
          Map,
          MapView,
          FeatureLayer,
          HeatmapRenderer,
          Legend,
          Locate,
          Search,
          Expand,
          PopupTemplate
        ] = await loadModules(
          [
            'esri/Map',
            'esri/views/MapView',
            'esri/layers/FeatureLayer',
            'esri/renderers/HeatmapRenderer',
            'esri/widgets/Legend',
            'esri/widgets/Locate',
            'esri/widgets/Search',
            'esri/widgets/Expand',
            'esri/PopupTemplate'
          ],
          { css: true }
        )

        if (mapRef.current) {
          const map = new Map({
            basemap: 'streets-navigation-vector'
          })

          const mapView = new MapView({
            container: mapRef.current,
            map: map,
            center: [-98.5795, 39.8283],
            zoom: 4,
            navigation: {
              mouseWheelZoomEnabled: false // Disable zoom on scroll for better UI experience on mobile devices
            }
          })

          setView(mapView)

          // PopupTemplate
          const popupTemplate = new PopupTemplate({
            title: 'Experience Details',
            content: [
              {
                type: 'fields',
                fieldInfos: [
                  {
                    fieldName: 'locationName',
                    label: 'Location Name',
                    format: { dateFormat: 'short-date-short-time' }
                  },
                  {
                    fieldName: 'experience_date',
                    label: 'Date & Time',
                    format: { dateFormat: 'short-date-short-time' }
                  },
                  {
                    fieldName: 'happinessSadness',
                    label: 'Happiness / Sadness'
                  },
                  {
                    fieldName: 'calmAnxious',
                    label: 'Calm / Anxious'
                  },
                  {
                    fieldName: 'awakeTired',
                    label: 'Awake / Tired'
                  },
                  {
                    fieldName: 'safety',
                    label: 'Sense of Safety'
                  },
                  {
                    fieldName: 'belonging',
                    label: 'Sense of Belonging'
                  },
                  {
                    fieldName: 'identityInterpretation',
                    label: 'Identity Interpretation'
                  }
                ]
              }
            ]
          })

          // Add FeatureLayer
          featureLayer = new FeatureLayer({
            url: featureServiceUrl,
            renderer: createRenderer(selectedAttribute),
            popupTemplate: popupTemplate
          })

          map.add(featureLayer)

          // Add Legend
          const legend = new Legend({
            view: mapView,
            layerInfos: [
              {
                layer: featureLayer,
                title: 'S3 User Experiences'
              }
            ]
          })
          mapView.ui.add(legend, 'bottom-left')

          // Add a locate button to the view
          const locateBtn = new Locate({
            view: mapView
          })

          // Add the locate widget to the top left corner of the view (under the zoom buttons)
          mapView.ui.add(locateBtn, {
            position: 'top-left'
          })

          // Create the search widget
          const searchWidget = new Search({
            view: mapView
          })

          // Initialize and add the Expand widget to toggle the visibility of the Search widget
          const searchExpand = new Expand({
            expandIcon: 'search', // Use a search icon for the expand/collapse button. See https://developers.arcgis.com/calcite-design-system/icons/
            expandTooltip: 'Expand Search', // Custom tooltip text for the expand button
            view: mapView,
            content: searchWidget
          })

          mapView.ui.add(searchExpand, {
            position: 'top-left',
            index: 2
          })
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (!view && mapRef.current) {
      initializeMap().then(() => {
        // Add event listener for attribute change
        document
          .getElementById('attribute-select')
          .addEventListener('change', e => {
            setSelectedAttribute(e.target.value)
            updateRenderer(featureLayer, e.target.value, isHeatmap)
          })

        //Add event listener for heatmap toggle button
        document
          .getElementById('heatmap-toggle')
          .addEventListener('click', handleHeatmapToggle)
      })
    }

    return () => {
      //Remove the eventListener for heatmap toggle button on component unmount to prevent memory leaks
      document
        .getElementById('heatmap-toggle')
        .removeEventListener('click', handleHeatmapToggle)
    }
  }, [view, selectedAttribute, isHeatmap, handleHeatmapToggle])

  return (
    <div id='explore-section' className='explore-section'>
      <h1 className='form-headers'>Explore the Map</h1>
      <p className='info-text'>
        Explore user experiences by selecting different emotions from the
        dropdown menu below. Click on a point to view more details.
      </p>
      <div className='explore-container'>
        <div className='select-container'>
          <label htmlFor='attribute-select'>Select Emotion:</label>
          <select
            id='attribute-select'
            value={selectedAttribute}
            onChange={handleAttributeChange}
          >
            {attributes.map(attribute => (
              <option key={attribute} value={attribute}>
                {attributeLabels[attribute]}
              </option>
            ))}
          </select>
          {/* TODO: FIX HEATMAP IMPLEMENTATION */}
          <button
            id='heatmap-toggle'
            className='toggle-button'
            onClick={handleHeatmapToggle}
          >
            {isHeatmap ? 'Show Unique Values' : 'Show Heatmap'}
          </button>
        </div>
        <div ref={mapRef} className='explore-map-container'></div>
      </div>
    </div>
  )
}

export default ExploreMapComponent
