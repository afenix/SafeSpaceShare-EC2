import React, { useRef, useEffect, useState, forwardRef } from 'react'
import MapInstructions from './MapInstructions'
import { loadModules } from 'esri-loader'

// Use forwardRef to allow the map component to be used as a ref for the parent component (ContributeSection)
const MapComponent = forwardRef(
  ({ formData, setFormData, onMapReady }, ref) => {
    const mapRef = useRef()
    const [view, setView] = useState(null)
    const [selectedPoint, setSelectedPoint] = useState(null)
    const [pointAdded, setPointAdded] = useState(false)


    const formatDateForInput = dateString => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    useEffect(() => {
      const initializeMap = async () => {
        try {
          const [
            Map,
            MapView,
            Graphic,
            FeatureLayer,
            GraphicsLayer,
            PopupTemplate,
            Locate,
            Search,
            Expand
          ] = await loadModules(
            [
              'esri/Map',
              'esri/views/MapView',
              'esri/Graphic',
              'esri/layers/FeatureLayer',
              'esri/layers/GraphicsLayer',
              'esri/PopupTemplate',
              'esri/widgets/Locate',
              'esri/widgets/Search',
              'esri/widgets/Expand'
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
              zoom: 2,
              navigation: {
                mouseWheelZoomEnabled: false // Disable zoom on scroll
              }
            })

            setView(mapView)

            const userLayer = new GraphicsLayer()
            map.add(userLayer)

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

            // Notify the parent component when the map is ready
            if (onMapReady) {
              onMapReady(mapView) // Pass the MapView instance to the callback
            }

            // Click event handler
            mapView.on('click', event => {
              console.log('Map clicked', event.mapPoint)

              const currentDateTime = new Date().toISOString()
              const formattedDateTime = formatDateForInput(currentDateTime)

              const point = {
                type: 'point',
                longitude: event.mapPoint.longitude,
                latitude: event.mapPoint.latitude,
                spatialReference: mapView.spatialReference,
                experience_date: formattedDateTime
              }

              const symbol = {
                type: 'picture-marker',
                url: `${process.env.PUBLIC_URL}/img/my_location_24dp_E16833.png`,
                width: '45px',
                height: '45px'
              }

              const popupTemplate = new PopupTemplate({
                title: 'X Marks the Spot!',
                content: `Location: [${point.longitude.toFixed(
                  3
                )}, ${point.latitude.toFixed(3)}]`
              })

              const graphic = new Graphic({
                geometry: point,
                symbol: symbol,
                attributes: point,
                popupTemplate: popupTemplate
              })

              // Log the graphic and its popup template
              console.log('Graphic created', graphic)
              console.log('PopupTemplate', graphic.popupTemplate)

              // Remove only the previously selected graphic, not all graphics
              const existingGraphic = mapView.graphics.find(
                g =>
                  g.symbol.type === 'picture-marker' &&
                  g.symbol.url.includes('my_location_24dp_E16833.png')
              )

              if (existingGraphic) {
                mapView.graphics.remove(existingGraphic)
              }

              // Add the new graphic to the view
              mapView.graphics.add(graphic)

              //TODO: Determine why the popup is not opening on map click
              // Open the popup immediately
              mapView.popup.open({
                features: [graphic],
                location: event.mapPoint
              })

              setSelectedPoint(point) // Update the selectedPoint state
              setPointAdded(true)

              mapView.interactionOptions = {
                // Disable panning:
                shiftDoubleClickZoom: false,
                doubleClickZoom: false,
                // Disable dragging:
                dragPan: false
              }

              // Update form data with selected point
              setFormData(prevData => ({
                ...prevData,
                experience_date: point.experience_date,
                geometry: {
                  longitude: point.longitude,
                  latitude: point.latitude
                }
              }))
            })
          }
        } catch (err) {
          console.error(err)
        }
      }

      if (!view && mapRef.current) {
        initializeMap()
      }
    }, [setFormData, onMapReady, view]) // Only re-run if setFormData changes

    // Expose method to parent component via ref
    if (ref) {
      ref.current = {
        updateFormDataWithPoint: () => {
          if (selectedPoint) {
            setFormData(prevData => ({
              ...prevData,
              experience_date: selectedPoint.experience_date,
              geometry: {
                longitude: selectedPoint.longitude,
                latitude: selectedPoint.latitude
              }
            }))
          }
        }
      }
    }

    return (
      <div className='form-section'>
        <div className='map-text-container'>
          <h1 className='section-header'>
            Let's Begin by Adding the Location of Your Experience!
          </h1>
          <p className='map-instructions'>
            Find the location of your experience on the map below and click to
            mark it.
          </p>
        </div>
        <MapInstructions />
        <div
          ref={mapRef}
          className='map-container'
          style={{
            borderRadius: '10px',
            height: '50vh',
            width: '100vw',
            margin: '20px'
          }}
        ></div>
      </div>
    )
  }
)

export default MapComponent
