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

let marker = {
  lat: -32.949,
  lng: -60.646,
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
      <Marker position={marker} label={title} />
      {andreani ? (
        <Marker position={center} label={"You"} draggable={true} />
      ) : null}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMaps;
