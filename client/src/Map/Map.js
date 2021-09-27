import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from '../FuncMap/FuncMap';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapCont extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        return (
        <CurrentLocation
            centerAroundCurrentLocation
            google={this.props.google}
            // onMapComponent={this.props.onMapComponent}
            lt={this.props.x}
            lg={this.props.y}
        >
            <Marker
                onClick={this.onMarkerClick}
                name={'current location coordinates'}
            />
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
            >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                </div>
            </InfoWindow>
        </CurrentLocation>
        
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCzuHWi32YAxnKV-3LHCinRXishtoedpx8'
})(MapCont);