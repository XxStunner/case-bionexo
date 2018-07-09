import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const apiKey = 'AIzaSyAPmst-51Ddi0yH_21sASPQw4DZLygSA0A';

export class MapContainer extends Component{

    constructor(props){
        super(props);
        this.state = {
            active: {},
            selected: {},
            showing: false,
        }
    }

    shouldComponentUpdate(props, state){
        console.log(props, state);
        return props.updateMap || state.showing !== this.state.showing ? true : false;
    }

    onMarkerClick = (props, marker) => {
        this.setState({showing: false});
        this.setState({selected: props, active: marker, showing: true});
    };
 
    onMapClick = () => {if(this.state.showing) this.setState({showing: false, active: null})};

    render(){
        return (
            <Map 
                google={this.props.google}
                initialCenter={this.props.coords}
                center={this.props.coords}
                zoom={14}
                onClick={this.onMapClick}
            >
            {this.props.institutes.map((institute, index) => (
                <Marker
                    title={institute.name}
                    name={institute.name}
                    address={institute.address}
                    position={{lat: institute.geocode.lat, lng: institute.geocode.long}}
                    key={index}
                    onClick={this.onMarkerClick}
                />
            ))}
                <InfoWindow
                    marker={this.state.active}
                    visible={this.state.showing}
                    style={{backgroundColor: 'darkblue'}}
                    pane={ "floatPane"}
                >
                    <div className="testando">
                        <h3>{this.state.selected.name}</h3>
                        <p>{this.state.selected.address}</p>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({ 
    apiKey: (apiKey),
    language: 'pt-br'
})(MapContainer)
