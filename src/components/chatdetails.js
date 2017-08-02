import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { firebase } from '../utils/firebase';
import { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import '../styles/messages.css';



export default class ChatDetails extends Component {
 constructor(props) {
    super(props)


    this.state = {
      redirectTo: null,
    }

  }

componentWillReceiveProps(nextProps) {
  if (nextProps.redirectTo !== null){
    this.setState({redirectTo: nextProps.redirectTo})
  }
}


componentWillMount(){
this.setState({
  loaded: true
})

    geocodeByAddress('police ' + this.props.location.formattedAddress)
      .then(results => {

        this.setState({
          police: results[0].formatted_address
          })
      })
      .then(latLng => {
        console.log('Success', latLng)})
      .catch(error => console.error('Error', error))


  }



  render() {

    if (this.state.loaded === true){

    function Cat(props){
      const category = props.category
        switch(category) {
        case 0:
            return <h4>Emergency</h4>
              break;
        case 1:
            return <h4>Mass Public Threat</h4>
              break;
        case 2:
            return <h4>Fire</h4>
              break; 
        case 3:
            return <h4>Holdup</h4>
              break;
        case 4:
            return <h4>Panic</h4>
              break;
        case 5:
            return <h4>Theft</h4>
              break;  
        case 6:
            return <h4>Harassment</h4>
              break; 
        case 7:
            return <h4>Suspicious Activiy</h4>
              break;
        case 8:
            return <h4>Safety Hazard</h4>
              break;
        case 9:
            return <h4>Maintenance</h4>
              break; 
        default:
            return <h4>{category}</h4>   
        }
    }

    return(   
        // <div key={this.props.details.keys} >
        <div>
        { this.state.redirectTo ?
          <Redirect to={{ pathname: this.state.redirectTo }} /> :
          (
          <div>
            <div className="col-xs-3 chatDetailsContainer">

                      <div className="row">
                        <Cat category={this.props.details.category}/>
                      </div>
                      <div className="row chatDetailBox">
                      <div className="col-xs-12">
                        <p>Assigned to: You</p>
                      </div>

                      <div className="col-xs-6">
                        <p>{this.props.details.date}</p>
                      </div>
                      <div className="col-xs-6">
                      <p>{this.props.details.time}</p>
                      </div>
                      </div>

                      <div className="row chatDetailBox">
                      <div className="col-xs-12">
                        <p><span className="chatTitles">Name:</span> {this.props.user.name}</p>
                        <p><span className="chatTitles">Email:</span> {this.props.user.email}</p>
                        <p><span className="chatTitles">Phone:</span> {this.props.user.phone}</p>
                        <p><span className="chatTitles">Zipcode:</span> {this.props.location.postalcode}</p>
                      </div>
                      </div>
                      <div className="row chatDetailBox">
                      <div className="col-xs-12">
                        <p><span className="chatTitles">Closest Police Station:</span></p>
                        <p>{this.state.police}</p>

                      </div>
                      </div>


                      <div className="row">
                      <div className="col-xs-12">
                        <p><span className="chatTitles">Location:</span></p>
                        <p>{this.props.location.streetnumber} {this.props.location.route}</p>
                        <p>{this.props.location.locality}, {this.props.location.administrative_area_level_1} {this.props.location.postalcode}</p>
                      </div>
                      </div>
                      <div className="col-xs-offset-3 resolvedButton">
                      <button className="move" onClick={this.props.onClick}>RESOLVE</button>
                      </div>
                </div>
          </div>
        
        )}
        </div>
      )
    } else {
      return (<div><p></p></div>)
    }
  }
}


