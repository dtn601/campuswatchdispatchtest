import React, { Component } from 'react';
import MainComponent from '../components/maincomponent';
import Maps from '../components/maps';
import Sidebar from '../components/sidebar';
import Moment from 'moment';
import { logout } from '../components/auth';
import { firebase } from '../utils/firebase';
import {geocode} from '../utils/geocoding';

import '../app.css';

export default class Main extends Component {
 
constructor(props){ 
  super(props);
    
   this.state = {
   	alertArray: [],
   	removeList: null,
    alerts: [],
   }

   //this.resolveChat = this.resolveChat.bind(this)

  }



 componentWillMount(){
 	console.log('v4')

 
  	const alertListener = firebase.database().ref('/-01-alerts').orderByChild('category');
  	const chatCompleteListener = firebase.database().ref('/-01-complete/')
  	const uidSearch = firebase.database()

		alertListener.on('child_added', (snapshot) => {
			
			let alert = snapshot.val()
			let uiddetails = {}

			let config = {
		    'latitude': alert.lat,
		    'longitude': alert.lon
			},
			i=0,
			location = {}

			geocode(config, function (err, data){
				if(err){
					console.log(err);
				} else {
			    	location.formattedAddress = data.results[0].formatted_address
			    	location.placeid = data.results[0].place_id
			        const dataAddress = data.results[0].address_components
				        for (i=0; i<dataAddress.length;i++){
				        	switch(dataAddress[i].types[0]){
				        		case 'street_number':
					        		let streetnumber = dataAddress[i].short_name
					        		location.streetnumber = streetnumber
				        		break;
				        		case 'route':
					        		let route = dataAddress[i].short_name
					        		location.route = route
				        		break;
				        		case 'locality':
					        		let locality = dataAddress[i].short_name
					        		location.locality = locality
				        		break;
				        		case 'administrative_area_level_1':
					        		let administrative_area_level_1 = dataAddress[i].short_name
					        		location.administrative_area_level_1 = administrative_area_level_1
				        		break;
				        		case 'postal_code':
					        		let postalcode = dataAddress[i].short_name
					        		location.postalcode = postalcode
				        		break;
				        		default:						        								        								        		
				        	}
				         }
					}
				})	

			uidSearch.ref('/users/'+alert.uid).once('value')
			.then((snapshot2) => {
				uiddetails = snapshot2.val()


				const updateState = 
						 //...this.state.alertArray,
						{
			            position: {
			                  lat: alert.lat,
			                  lng: alert.lon,
			                },
			                key: snapshot.key,
			                defaultAnimation: 2,
			            details: {
			                category: alert.category,
			                timestamp: alert.timestamp,
			                date: Moment(alert.timestamp).format('L'),
			                time: Moment(alert.timestamp).format('LT'),
			                uid: alert.uid,
			                emergency: alert.emergency,
			            },
			            user: uiddetails,
						location: location,
						}

					this.state.alertArray.push(updateState)
					this.setState({
						updateAlerts: updateState
					})
			})

			
		})//firebase

		// chatCompleteListener.on('child_added', (snapshot)=> {
		// 	let snap = snapshot.val()
		// 	console.log(snapshot.key)
		// 	// this.setState({
		// 	// 	removeList: snapshot.key
		// 	// })

		// })


}//component

	render(){
		return(
			<div className="row">
				<div className="main">
				    <Sidebar { ...this.state } />
					<Maps { ...this.state } />
						<div className="col-xs-offset-10 logoutButton">
						<button
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand logout">Logout</button>
                        </div>
			  	</div>
		  	</div>
			)
	}




}



