import React from 'react';
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";

/**
 * Container to show Google Maps and custom markers with InfoBox
 * @param {Array} coords - Array of coordinates to start the map
 * @param {Array} institutes - Array of items to show in the map
 */
const MapContainer = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API}&v=3.32&language=pt-br&region=BR`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ position:'absolute', height: `100vh`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: null,
  }), {
    onToggleOpen: ({ isOpen }) => (index) => ({
      isOpen: isOpen === index ? null : index,
    })
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.coords.lat, lng: props.coords.lng }}
    center={{lat: props.coords.lat, lng: props.coords.lng}}
    clickableIcons={false}
    options={{
      streetViewControl: false,
    }}
  >
    {props.institutes.map((institute, index) => (
      <Marker 
        onClick={() => props.onToggleOpen(index)}
        position={{ lat: institute.geocode.lat, lng: institute.geocode.long }}
        icon={{
          url: props.isOpen === index ? "data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='10.583mm' height='13.758mm'%3E%3Cpath fill-rule='evenodd' opacity='0.341' fill='rgb%28160, 160, 160%29' d='M15.500,33.000 C21.851,33.000 27.000,34.343 27.000,36.000 C27.000,37.657 21.851,39.000 15.500,39.000 C9.149,39.000 4.000,37.657 4.000,36.000 C4.000,34.343 9.149,33.000 15.500,33.000 Z'/%3E%3Cimage x='8px' y='26px' width='15px' height='8px' xlink:href='data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAICAMAAAARDVXAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAdVBMVEX///80zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdc0zdf////VAtYdAAAAJXRSTlMAVbqdf2BDJQgC3ufKrY9wKmq3CpapBgO2mg/SigEe6no36ONpkQDGugAAAAFiS0dEAIgFHUgAAAAHdElNRQfiBwgWNjfJxg9uAAAATUlEQVQI12NgYGRiZmFlY+dggABOLlUI4Obh5eMXYGAQVEUAIWGgChE4V1QMpENcAsqVFIcYISUN5srIQo1kkJMHchUYEEBRSVkFwgIARMoIxDJZ16YAAAAASUVORK5CYII=' /%3E%3Cpath fill-rule='evenodd' fill='rgb%2852, 205, 215%29' d='M6.000,-0.000 L24.000,-0.000 C27.314,-0.000 30.000,2.686 30.000,6.000 L30.000,24.000 C30.000,27.314 27.314,30.000 24.000,30.000 L6.000,30.000 C2.686,30.000 -0.000,27.314 -0.000,24.000 L-0.000,6.000 C-0.000,2.686 2.686,-0.000 6.000,-0.000 Z'/%3E%3Ctext font-family='Times New Roman' fill='rgb%28255, 255, 255%29' font-size='16px' x='7.5' y='20'%3E"+ (index + 1) + "%3C/text%3E%3C/svg%3E" : "data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='10.583mm' height='13.758mm'%3E%3Cpath fill-rule='evenodd' opacity='0.341' fill='rgb%28160, 160, 160%29' d='M15.500,33.000 C21.851,33.000 27.000,34.343 27.000,36.000 C27.000,37.657 21.851,39.000 15.500,39.000 C9.149,39.000 4.000,37.657 4.000,36.000 C4.000,34.343 9.149,33.000 15.500,33.000 Z'/%3E%3Cimage x='8px' y='26px' width='15px' height='8px' xlink:href='data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAICAMAAAARDVXAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAdVBMVEUpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDkpLDn///8VamsRAAAAJXRSTlMAVbqdf2BDJQgC3ufKrY9wKmq3CpapBgO2mg/SigEe6no36ONpkQDGugAAAAFiS0dEJloImLUAAAAHdElNRQfiBwgXHDbQaJnnAAAATUlEQVQI12NgYGRiZmFlY+dggABOLlUI4Obh5eMXYGAQVEUAIWGgChE4V1QMpENcAsqVFIcYISUN5srIQo1kkJMHchUYEEBRSVkFwgIARMoIxDJZ16YAAAAASUVORK5CYII=' /%3E%3Cpath fill-rule='evenodd' fill='rgb%2841, 44, 57%29' d='M6.000,-0.000 L24.000,-0.000 C27.314,-0.000 30.000,2.686 30.000,6.000 L30.000,24.000 C30.000,27.314 27.314,30.000 24.000,30.000 L6.000,30.000 C2.686,30.000 -0.000,27.314 -0.000,24.000 L-0.000,6.000 C-0.000,2.686 2.686,-0.000 6.000,-0.000 Z'/%3E%3Ctext font-family='Times New Roman' fill='rgb%28255, 255, 255%29' font-size='16px' x='7.5' y='20'%3E" + (index + 1) +"%3C/text%3E%3C/svg%3E",
        }}
        key={index} 
      >
      {props.isOpen === index && 
        <InfoBox 
          options={{ closeBoxURL: ``, enableEventPropagation: false }} 
          onCloseClick={() => props.onToggleOpen(index)}
        >
          <div className="map-infobox">
            <h5>{index + 1}.{institute.name}</h5>
            <p>{institute.address}</p>
          </div>
        </InfoBox >}
      </Marker>
    ))}
  </GoogleMap>
));

export default MapContainer;