import React from 'react';
import { useState} from 'react';
import {Map, Marker, GoogleApiWrapper } from "google-maps-react"
import {Polyline} from '@react-google-maps/api';
import polyline from '@mapbox/polyline';

function Home(props) {
    var locations =[]
    // const [apiKey,setApiKey] = getKey.current
    const [origin,setOrigin] = useState();
    const [dest,setDest] = useState();
    const [route,setRoute] = useState();

    // navigator.geolocation.getCurrentPosition(
    //     function(position) {
    //         var userLoc = {'lat':position.coords.latitude,'lng':position.coords.longitude}
    //     console.log(userLoc)
    //     center.current = userLoc
    //     console.log("latitude is: ",center.current.latitude)
    //     console.log("longitude is:",center.current.longitude)
    //     }
    // )

    function submit(e){
        e.preventDefault()
        let path = {
            'origin':origin,
            'destination':dest
        }
        console.log(path)
        fetch('/directions',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(path)
        })
        .then(response => response.json())
        .then((data) => {
            let polylineCoords = polyline.decode(data.points)
            let newCoords = polylineCoords.map((point) =>(
                {
                    lat:point[0],
                    lng:point[1]
                }
            ))
            console.log(newCoords)
            setRoute(newCoords)
            console.log(route)
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
                maxWidth:"45%",
                minWidth: "800px",
                height: "400px",
                display: "inherit",
                overflow: "hidden",
                marginTop:"10px",
                marginRight: "auto",
                marginLeft: "auto"
            }}
            center={props.userCoords}
            initialCenter={props.userCoords}
            zoom={locations.length === 1 ? 18 : 15}
            disableDefaultUI={true}
            
        >
            <Polyline path={route}  strokeColor={'red'}></Polyline>
            <Marker position={props.userCoords}></Marker>
            {locations.map(
                coords => <Marker position={coords} />
            )}
            
        </Map>
        <form method ="POST" className="route" onSubmit={(e) => submit(e)}>
            <input type="text" name="origin" placeholder='Starting location' value={origin}
            onChange={(e) => setOrigin(e.target.value)}></input>
            <input type="text" name="destination" placeholder='Destination' value={dest}
            onChange={(e) => setDest(e.target.value)}></input>
            <input type="submit" value="Navigate"></input>
        </form>
    </div>
    );
}
export default GoogleApiWrapper(
    props => ({
        apiKey: (props.apiKey)
    }
))(Home);
