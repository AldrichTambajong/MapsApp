import React from 'react';
import { useState, useEffect} from 'react';
import {Map, Marker, GoogleApiWrapper } from "google-maps-react"
import { DirectionsRenderer, Polyline} from '@react-google-maps/api';

function Home(props) {
    var locations =[]
    var center = {}
    // const [apiKey,setApiKey] = getKey.current
    const [latitude,setlatitude] = useState();
    const [longitude,setLongitude] = useState();
    const [origin,setOrigin] = useState();
    const [dest,setDest] = useState();
    const triangleCoords = [
        {lat: 34.1185227, lng: -83.9374116},
        {lat:  33.759678, lng: -84.114711}
      ];

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

    function submit(e){
        e.preventDefault()
        let path = {
            'origin':origin,
            'destination':dest
        }
        fetch('/directions',{
            method:'POST',
            haders:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(path)
        })
        .then(response => response.json)
        .then(data => {
            console.log(data)
            
        })
    }
  return (
    <div>
        <Map
            google={props.google}
            bootStrapURLKeys={props.apiKey}
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
            zoom={locations.length === 1 ? 18 : 15}
            disableDefaultUI={true}
            
        >
            <Polyline directions={triangleCoords} path={triangleCoords}></Polyline>
            {/* <DirectionsRenderer directions={directions}></DirectionsRenderer> */}
            <Marker position={center}></Marker>
            {locations.map(
                coords => <Marker position={coords} />
            )}
            
        </Map>
        <form method ="POST" className="route" onSubmit={(e) => submit(e)}>
            <input type="text" name="origin" placeholder='Starting location' value={origin}
            onChange={(e) => setOrigin(e.target.value)}></input>
            <input type="text" name="destination" placeholder='Destination' value={dest}
            onChange={(e) => setDest(e.target.value)}></input>
            <input type="submit" value="submit"></input>
        </form>
    </div>
    );
}
export default GoogleApiWrapper(
    props => ({
        apiKey: (props.apiKey)
    }
))(Home);
