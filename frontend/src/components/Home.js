import React from 'react';
import { useState } from 'react';
import {Map, Marker, GoogleApiWrapper } from "google-maps-react"

function Home(props) {
    var locations =[]
    const [latitude,setlatitude] = useState();
    const [longitude,setLongitude] = useState();

    navigator.geolocation.getCurrentPosition(
        function(position) {
            setlatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        }
    )

    locations.push({'lat':latitude,'lng':longitude})
    console.log(latitude)
    console.log(longitude)
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
            center={{'lat':latitude, 'lng':longitude}}
            initialCenter={{'lat':latitude, 'lng':longitude}}
            zoom={locations.length === 1 ? 18 : 13}
            disableDefaultUI={true}
        >
            {locations.map(
                coords => <Marker position={coords} />
            )}
            
        </Map>
    </div>
    );
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDNlHEFM13UfwMbeFel8ofV41RIki4nabs'
})(Home);
