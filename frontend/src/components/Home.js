import React from 'react';
import {Map, Marker, GoogleApiWrapper } from "google-maps-react"

function Home({google,locations=[]}) {
  return (
    <div>
        <Map
            google={google}
            containerStyle={{
                position: "static",
                width: "100%",
                height: "100%"
            }}
            style={{
                width: "80%",
                height: "400px"
            }}
            center={locations[0]}
            initialCenter={locations[0]}
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
