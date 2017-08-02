import React, { Component } from 'react';
import Maps from './maps';
import Sidebar from './sidebar';
import geocoding from 'reverse-geocoding';
import { logout } from './auth'
import { firebase } from '../utils/firebase';
import '../app.css';

function remove(array, key, value) {
    const index = array.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...this.slice(0, index),
        ...this.slice(index + 1)
    ] : this;
}

export default class MainComponent extends Component {
 
constructor(props){ 
  super(props);

  this.state = {
  	alertArray: [],
  	removeLocation: false,
  	removeList: null,
  }

  }

componentWillMount(){
	const alertListener = firebase.database().ref('/-01-alerts').orderByChild('category');

		alertListener.on('child_removed', (snapshot)=>{
			let snap = snapshot.val()

			this.setState({
				removeList: snapshot.key
			})

		})

	if (this.state.removeList === null){
		console.log('cool')
	} else{

		const alertArray = remove(this.state.alertArray, 'key', this.state.removeList)
		this.setState({
			alertArray: alertArray,
			removeList: null,
		})

		console.log(alertArray)

	}
}


componentWillReceiveProps(nextProps) {
		// let config = {
		//     'latitude': nextProps.alertArray.position.lat,
		//     'longitude': nextProps.alertArray.position.lng
		// 	},
		// 	i=0,
		// 	location = {},
		// 	alert = {}

		// geocoding.location(config, function (err, data){
		//     if(err){
		//         console.log(err);
		//     }else{
		//     	location.formattedAddress = data.results[0].formatted_address
		//     	location.placeid = data.results[0].place_id
		//         const dataAddress = data.results[0].address_components
		// 	        for (i=0; i<dataAddress.length;i++){
		// 	        	switch(dataAddress[i].types[0]){
		// 	        		case 'street_number':
		// 		        		let streetnumber = dataAddress[i].short_name
		// 		        		location.streetnumber = streetnumber
		// 	        		break;
		// 	        		case 'route':
		// 		        		let route = dataAddress[i].short_name
		// 		        		location.route = route
		// 	        		break;
		// 	        		case 'locality':
		// 		        		let locality = dataAddress[i].short_name
		// 		        		location.locality = locality
		// 	        		break;
		// 	        		case 'administrative_area_level_1':
		// 		        		let administrative_area_level_1 = dataAddress[i].short_name
		// 		        		location.administrative_area_level_1 = administrative_area_level_1
		// 	        		break;
		// 	        		case 'postal_code':
		// 		        		let postalcode = dataAddress[i].short_name
		// 		        		location.postalcode = postalcode
		// 	        		break;
		// 	        		default:						        								        								        		
		// 	        	}
		// 	         }
		// 		}
		// 	})	
		// alert = nextProps.alertArray
		// alert.location = location

				
		this.setState({
			alerts: alert

		})

		console.log(nextProps)

	//}

}

	render(){
		return(
			<div className="row">
				<div className="main">
					<Sidebar { ...this.state } />
					<Maps { ...this.state } />
				    				        <button
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand logout">Logout</button>
			  	</div>
		  	</div>
			)
	}




}
