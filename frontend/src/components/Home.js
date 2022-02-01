import React from 'react';
import { useState} from 'react';
import {Map, Marker, GoogleApiWrapper } from "google-maps-react"

function Home(props) {
    var locations =[]
    var center = {}
    // const [apiKey,setApiKey] = getKey.current
    const [latitude,setlatitude] = useState();
    const [longitude,setLongitude] = useState();

    navigator.geolocation.getCurrentPosition(
        function(position) {
            setlatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        }
    )
    center = {'lat':latitude,'lng':longitude}
    // locations.push({'lat':latitude,'lng':longitude})
    console.log("latitude is: ",latitude)
    console.log("longitude is:",longitude)
  return (
    <div>
        <Map
            google={props.google}
            containerStyle={{
                position: "static",
                width: "100%",
                height: "100%"
            }}
            style={{
                maxWidth:"65%",
                width: "800px",
                height: "400px",
                display: "inherit",
                overflow: "hidden",
                marginRight: "auto",
                marginLeft: "auto"
            }}
            center={center}
            initialCenter={center}
            zoom={locations.length === 1 ? 18 : 16}
            disableDefaultUI={true}
        >
            <Marker position={center}></Marker>
            {locations.map(
                coords => <Marker position={coords} />
            )}
            
        </Map>
    </div>
    );
}
export default GoogleApiWrapper(
    props => ({
        apiKey: (props.apiKey)
    }
))(Home);
