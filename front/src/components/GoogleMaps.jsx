import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
const containerStyle = {
  height: "25rem",
  width: "25rem",
  borderRadius: "1rem",
};

const center = {
  lat: -32.949,
  lng: -60.646,
};

const title = "Calathea Market";

function GoogleMaps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC7LOjNhZNLi81lGf5YgmwGDqLeTm7EjPU",
  });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
    >
      <Marker position={center} label={title} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMaps;
