import React, { useState } from 'react'

function MapInstructions () {
  const [showInstructions, setShowInstructions] = useState(false)

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions)
  }

  return (
    <div className={`location-instructions ${showInstructions ? 'show' : ''}`}>
      <div className='help-icon' onClick={toggleInstructions}>
        Need Help?
      </div>
      {showInstructions && (
        <div className='instructions-overlay' onClick={toggleInstructions}>
          <div
            className='instructions-content'
            onClick={e => e.stopPropagation()}
          >
            <button className='close-button' onClick={toggleInstructions}>
              ✕
            </button>
            <h2>How to Add the Location of Your Experience to the Map</h2>
            <ol className='list-container'>
              <li className='map-instructions'>
                <strong>Find the Right Spot on the Map</strong>
                <ul>
                  <li className='map-instructions'>
                    <strong>Move Around (Pan):</strong> Click and hold anywhere
                    on the map with your mouse. Then, drag the map to see
                    different areas.
                  </li>
                  <li className='map-instructions'>
                    <strong>Zoom In/Out:</strong>
                    <ul>
                      <li className='map-instructions'>
                        <strong>Double-click:</strong> Quickly zoom in on the
                        spot you double-clicked.
                      </li>
                      <li className='map-instructions'>
                        <strong>Zoom Buttons:</strong> Use the "+" button to
                        zoom in and the "-" button to zoom out.
                      </li>
                    </ul>
                  </li>
                  <li className='map-instructions'>
                    <strong>Helpful Tools:</strong>
                    <ul>
                      <li className='map-instructions'>
                        <strong>Find Me:</strong> Click the "Find Me" button{' '}
                        <img
                          src={`${process.env.PUBLIC_URL}/img/locate-icon.png`}
                          alt='Locate Icon'
                          className='map-icon'
                        />{' '}
                        to see your current location on the map. (Your browser
                        might ask for permission to use your location.)
                      </li>
                      <li className='map-instructions'>
                        <strong>Search:</strong> Click on the search button{' '}
                        <img
                          src={`${process.env.PUBLIC_URL}/img/search-icon.png`}
                          alt='Search Icon'
                          className='map-icon'
                        />{' '}
                        and then type an address, business name, or place (like
                        "New York City," "Starbucks," or "Yellowstone National
                        Park") into the search box to zoom to that location.
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className='map-instructions'>
                <strong>Mark the Location:</strong>
                <ul>
                  <li className='map-instructions'>
                    <strong>Click to Mark:</strong> Once you've found the exact
                    location where you want to add your experience, click on
                    that spot on the map to place a marker{' '}
                    <img
                      src={`${process.env.PUBLIC_URL}/img/my_location_24dp_E16833.png`}
                      alt='Search Icon'
                      className='map-icon'
                    />{' '}
                    on the map.
                  </li>
                  <li className='map-instructions'>
                    <strong>Oops, Wrong Spot?</strong> No worries! Just click on
                    the correct location to move the marker.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapInstructions
