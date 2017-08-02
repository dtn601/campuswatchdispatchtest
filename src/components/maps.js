import {
  default as React,
  Component,
} from "react";
import { Redirect } from 'react-router-dom';

import Helmet from "react-helmet";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MainGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    // defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
    defaultCenter={{ lat: 30.263517, lng: -97.744701 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onClick={() => props.onMarkerClick(marker)}
      />
    ))}

  </GoogleMap>
));



export default class Maps extends Component {

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);

 constructor(props){ 
  super(props);
    
   this.state = {
    orderData: [],
    markers: [],
    status: '',
   }
  }

  componentWillMount(){
    setTimeout(()=> 
      this.setState({
        status: 'loaded',
      }),2000)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      markers: nextProps.alertArray
    })

  }



  handleMapLoad(map) {
    this._mapComponent = map
    if (map) {
    }
  }


  handleMapClick(event) {
    // const nextMarkers = [
    //   ...this.state.markers,
    //   {
    //     position: event.latLng,
    //     defaultAnimation: 0,
    //     key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
    //   },
    // ];
    // this.setState({
    //   markers: nextMarkers,
    // });


  }

  handleMarkerClick(targetMarker) {
    console.log('marker clicked')
    //code from npm instructions
    // const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    // this.setState({
    //   markers: nextMarkers,
    // });

    console.log('targetmarker :', targetMarker)

    this.setState({ 
      redirectTo: '/chat', 
      target: targetMarker
    })

  }

  render() {

    if (this.state.status === 'loaded') {

    return (
        <div className="googleMaps">
        { this.state.redirectTo ?
            <Redirect to={{ pathname: this.state.redirectTo, state: {...this.state.target} }} /> : 
            (
      <div className="googleMaps">
        <Helmet
          title="Campus Watch"
        />
        <MainGoogleMap
          containerElement={
            <div className="googleMaps" />
          }
          mapElement={
            <div className="googleMaps" />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
      )}
      </div>
    );
    } else {
      return ( <div>Loading</div>)
    }
  }
}