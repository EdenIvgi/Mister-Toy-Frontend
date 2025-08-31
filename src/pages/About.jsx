import { AdvancedMarker, APIProvider, InfoWindow, Map } from '@vis.gl/react-google-maps'
import { useState } from 'react'

const API_KEY = 'AIzaSyDRF9Tc41vwFXxx-zcnPb4Wsb6dM10cBBc'

const branches = [
  { name: 'Tel Aviv Branch', lat: 32.0853, lng: 34.7818 },
  { name: 'Haifa Branch', lat: 32.7940, lng: 34.9896 },
  { name: 'Jerusalem Branch', lat: 31.7683, lng: 35.2137 },
]

export function About() {
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  function goToBranch(branch) {
    setSelectedBranch(branch)
    setIsInfoOpen(true)
  }

  return (
    <section className="google-map">
      <h1>Our Branches</h1>

      <div className="branches-btns">
        {branches.map(branch => (
          <button key={branch.name} onClick={() => goToBranch(branch)}>
            {branch.name}
          </button>
        ))}
      </div>

      <APIProvider apiKey={API_KEY}>
        <Map
          mapId="DEMO_MAP_ID"

          style={{ width: '100%', height: '500px' }}
          defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
          defaultZoom={10}
          center={selectedBranch ? { lat: selectedBranch.lat, lng: selectedBranch.lng } : undefined}
        >
          {branches.map(branch => (
            <AdvancedMarker
              key={branch.name}
              position={{ lat: branch.lat, lng: branch.lng }}
              onClick={() => goToBranch(branch)}
            />
          ))}

          {isInfoOpen && selectedBranch && (
            <InfoWindow position={{ lat: selectedBranch.lat, lng: selectedBranch.lng }} maxWidth={200}>
              <div>
                <h4>{selectedBranch.name}</h4>
                <p>Lat: {selectedBranch.lat}</p>
                <p>Lng: {selectedBranch.lng}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </section>
  )
}
