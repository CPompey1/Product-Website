import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ORDER_TRACKING_STATUS from './OrderTrackingUtility'
function UserToCourrierCommunication({status, orderId}) {
  return (
    <>
      <UserToCourrierTracking status={status}/> 
      <UserToCourrierChatService/>
    </>
  )
}


function UserToCourrierTracking({status}) {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    
    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY3BvbXBleSIsImEiOiJjbTVlZDRvbjkyYmY3MmxwbjBlNmQ0NDV2In0.Dh7THMwdnp0bXp_eqjLP7A';
  
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    });
  
    return (
      <div>
        <div
            style={{ height: '500px' }}
            ref={mapContainerRef}
            className="map-container"
          />
      </div>
    )
  }
  
  function UserToCourrierChatService() {
    return (
      <div>
        <h1>Chat</h1>
      </div>
    )
  }
  
  export default UserToCourrierCommunication;