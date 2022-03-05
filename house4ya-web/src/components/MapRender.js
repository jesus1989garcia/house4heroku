import React, {useEffect, useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

function MapRender(props) {
  const [coordinates, setCoordinates ] = useState(props) 
 useEffect(() => {
   setCoordinates(props)
 },[props])
  return (
      <GoogleMap defaultZoom={18} defaultCenter={{ lat: Number(coordinates.latitude), lng: Number(coordinates.longitude) }}>
      <Marker  position={{lat:Number(coordinates.latitude),lng: Number(coordinates.longitude)}}></Marker>
  
    </GoogleMap>
    
    
  
  ) 
  
}

const WrapMap  = withScriptjs(withGoogleMap(MapRender))

function WrappedMap(props) {
 
 const [coordinates, setCoordinates ] = useState(props) 
 useEffect(() => {
   setCoordinates(props)
 },[props])

 const [loaded, setLoaded] = useState(null);
  useEffect(() => {
setLoaded(false);
if (props.lat) {
  setLoaded(true);

}
}, [props.lat, props.lng]);

 console.log(coordinates)
 {{ if (loaded) {
  return (
    <div style= {{ height:'70vh', width:'70vw'}}>
    <WrapMap 
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} 
    loadingElement={<div style= {{ height:"100%" }} />}
    containerElement={<div style= {{ height:"100%" }} />}
    mapElement={<div style= {{ height:"100%" }} />}
    latitude={coordinates.lat}
    longitude={coordinates.lng}
    />
    
    
  </div>
  )
  } else return <p>Location is not showed</p> }}
  
 
} 


export default  WrappedMap 