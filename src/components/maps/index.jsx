import React from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './main.css'


const MapPage = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAM3TBO_1oITW8z9Yw5VpD5dVYRdM8FrTw"
      });
    return <div className="map">
        {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width: '100%', height: '100 '}}
        center={{
            lat: -22.8824454,
            lng: -47.0597047
        }}
        zoom={15}
      ></GoogleMap>
  ) : (<></>

  )}
    </div>;
};


export default MapPage;