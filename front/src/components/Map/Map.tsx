import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapGoogle = () => {
  const mapStyles = {
    width: '100%',
    height: '50%',
  };
  return (
    // @ts-ignore
    <Map
      google={window.google}
      zoom={17}
      style={mapStyles}
      initialCenter={{
        lat: 42.84516906738281,
        lng: 74.6184310913086,
      }}
    >
      <Marker
        position={{
          lat: 42.84516906738281,
          lng: 74.6184310913086,
        }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  // @ts-ignore
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(MapGoogle);
