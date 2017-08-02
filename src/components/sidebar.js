import React, { Component } from 'react';
// import { Route, Router, Redirect } from 'react-router-dom';
import '../styles/sidebar.css';
import AlertDetails from './alertdetails'



export default class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
      markers: [],
      status: false,
    }
  }

// componentWillMount() {
//   console.log(this.props)
//   this.setState({
//     markers2: this.props.markers
//   })
// }

componentWillReceiveProps(nextProps){
    //console.log(nextProps)
    this.setState({
      markers: nextProps.alertArray
    })
  




  }

	render(){

    const alertdetails = this.state.markers.map(alert => {
        //console.log('this is alert', alert)
        return (
        <AlertDetails
        key={alert.key}
        data={alert}
        />
        )

      })
    
    


    // if (this.state.status === 'loaded') {

		return(

			<div className="sideNav col-md-3 col-sm-4 col-xs-6">
        <div className="pending">
          <p className="pendingText">PENDING</p>
        </div>
        <div className="alertsRow">
         { alertdetails }
      </div>
			
			</div>

			)
    // } else { return ( <div>Loading</div> )}
	}


}

//<div className="complete row"><p className="completeText">COMPLETE</p></div>
