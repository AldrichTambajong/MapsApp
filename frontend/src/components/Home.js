import React from 'react';
import { useState} from 'react';
import {Map, Marker, GoogleApiWrapper } from "google-maps-react"
import {Circle, Polyline} from '@react-google-maps/api';
import polyline from '@mapbox/polyline';
import { style } from '../style/map_style'; //Map Component can't use className

function Home(props) {
    var locations =[]
    const [origin,setOrigin] = useState();
    const [dest,setDest] = useState();
    const [route,setRoute] = useState();
    const [radius,setRadius] = useState(0);

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
            style={style}
            center={props.userCoords}
            initialCenter={props.userCoords}
            zoom={locations.length === 1 ? 18 : 15}
            disableDefaultUI={true}
            
        >
            <Polyline path={route} ></Polyline>
            <Marker position={props.userCoords} Circle>
            </Marker>
            {locations.map(
                coords => <Marker position={coords} />
            )}
            <Circle center={props.userCoords} radius={radius} options={{strokeColor:"#ff0000"}}></Circle>
        </Map>
        <form method ="POST" className="route" onSubmit={(e) => submit(e)}>
            <input type="text" name="origin" placeholder='Starting location' value={origin}
            onChange={(e) => setOrigin(e.target.value)}></input>
            <input type="text" name="destination" placeholder='Destination' value={dest}
            onChange={(e) => setDest(e.target.value)}></input>
            <input type="submit" value="Navigate"></input>
        </form>
        <input type="number" name = "radius" placeholder='radius in meters' onChange={(e) => setRadius(parseFloat(e.target.value))} className='radius'></input>
        <h1 className='test'>{typeof(radius)}</h1>
    </div>
    );
}
export default GoogleApiWrapper(
    props => ({
        apiKey: (props.apiKey)
    }
))(Home);
