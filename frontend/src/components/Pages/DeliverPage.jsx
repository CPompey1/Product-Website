import React, { useEffect, useRef } from 'react';

import validateUser from '../../util/accounts_manager'
import { Navigate } from 'react-router-dom'
import Header from '../page_components/Header'
import Footer from '../page_components/Footer'
import Navigation from '../page_components/Navigation'
import LogoSection from '../page_components/LogoSection'
import { LOGO_URL } from '../../globals'

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BuilderComponent } from '@builder.io/react';

export default function DeliverPage() {
  const mapContainerRef = useRef();
  const mapRef = useRef();


    var userValid = validateUser()
    if (userValid == false) {
        return <Navigate to="/login_account" />
    }

    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY3BvbXBleSIsImEiOiJjbTVlZDRvbjkyYmY3MmxwbjBlNmQ0NDV2In0.Dh7THMwdnp0bXp_eqjLP7A';
  
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    });
  return (
    <>
        <Header/>
        <LogoSection
            src={LOGO_URL}
            alt="Logo"
        />
        <Navigation />
        <div>DeliveriesPage</div>
        <BuilderComponent model='test-builder-page'></BuilderComponent>
        <div
          style={{ height: '500px' }}
          ref={mapContainerRef}
          className="map-container"
        />

        <Footer/>
    </>
  )
}
