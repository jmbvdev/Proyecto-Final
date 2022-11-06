import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import { useEffect } from "react";
const containerStyle = {
  height: "25rem",
  width: "25rem",
  borderRadius: "1rem",
};

let initialCenter = {
  lat: -32.949,
  lng: -60.646,
};

let marker1 = {
  lat: -32.949,
  lng: -60.646,
};

let marker2 = {
  lat: -32.9091,
  lng: -60.6821,
};

let marker3 = {
  lat: -34.5746,
  lng: -58.4207,
};

let marker4 = {
  lat: -34.715,
  lng: -58.2715,
};

let marker5 = {
  lat: -34.436,
  lng: -58.557,
};

let marker6 = {
  lat: -32.8725,
  lng: -68.8368,
};

let marker7 = {
  lat: -27.3681,
  lng: -55.8901,
};

let marker8 = {
  lat: -31.4242,
  lng: -64.1491,
};

let marker9 = {
  lat: -31.4439,
  lng: -64.1841,
};

let marker10 = {
  lat: -26.8278,
  lng: -65.1975,
};

let marker11 = {
  lat: -24.7826,
  lng: -65.4059,
};

let marker12 = {
  lat: -34.912,
  lng: -57.9739,
};

let marker13 = {
  lat: -41.1381,
  lng: -71.295,
};

let marker14 = {
  lat: -24.1866,
  lng: -65.289,
};

let marker15 = {
  lat: -16.4937,
  lng: -68.123,
};

let marker16 = {
  lat: -17.9698,
  lng: -67.0987,
};

let initialzoom = 16;

const title = "Calathea Market";

function GoogleMaps({ retiro, andreani }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC7LOjNhZNLi81lGf5YgmwGDqLeTm7EjPU",
  });
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState(initialCenter);
  const [zoom, setZoom] = React.useState(initialzoom);

  /*  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []); */

  /* navigator.geolocation.getCurrentPosition((position)=> console.log(position.coords.latitude)) */
  useEffect(() => {
    if (andreani) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(18);
      });
    } else {
      setCenter(initialCenter);
      setZoom(initialzoom);
    }
  }, [andreani]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      <Marker position={marker1} label={title} />
      <Marker position={marker2} label={title} />
      <Marker position={marker3} label={title} />
      <Marker position={marker4} label={title} />
      <Marker position={marker5} label={title} />
      <Marker position={marker6} label={title} />
      <Marker position={marker7} label={title} />
      <Marker position={marker8} label={title} />
      <Marker position={marker9} label={title} />
      <Marker position={marker10} label={title} />
      <Marker position={marker11} label={title} />
      <Marker position={marker12} label={title} />
      <Marker position={marker13} label={title} />
      <Marker position={marker14} label={title} />
      <Marker position={marker15} label={title} />
      <Marker position={marker16} label={title} />
      {andreani ? (
        <Marker position={center} label={"You"} draggable={true} />
      ) : null}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMaps;
