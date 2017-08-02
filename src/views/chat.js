import React, { Component } from 'react';
import { firebase } from '../utils/firebase';
import { Redirect } from 'react-router-dom';
import ChatDetails from '../components/chatdetails';
import MessageForm from '../components/messageform';
import '../app.css';
//import axios from 'axios';



export default class Chat extends Component {
	constructor(props){
	    super(props);

	    this.state = {
	    	redirectTo: null,
	    	alertObject: {},
	    	chat: {},
	    	
	    }

	    this.handleClick = this.handleClick.bind(this)
	}

	componentWillMount(){
		this.setState({
			alertObject: this.props.location.state
		})

		const chatListener = firebase.database();

		chatListener.ref('/-01-chats/'+this.props.location.state.key)
			.on('child_added', (snapshot) => {
			
			let alert = snapshot.val()
			this.setState({
				chat: {
					key: snapshot.key,
					alert: alert.alert,
					isImage: alert.isImage,
					text: alert.text,
					timestamp: alert.timestamp,
					uid: alert.uid,
				}
			})
			// console.log(alert)
			
		})//firebase

	}

  handleClick(e){
    e.preventDefault()

    const chatAlertListener = firebase.database().ref('/-01-alerts/'+this.props.location.state.key)
    const chatCompleteListener = firebase.database().ref('/-01-complete/'+this.props.location.state.key)
    const chatChatsListener = firebase.database().ref('/-01-chats/'+this.props.location.state.key)

    chatAlertListener.once('value')
    .then((snapshot)=> {
       let snap = snapshot.val();
      console.log(snapshot.val())
      if (snap.emergency === false){
        chatCompleteListener.set(snapshot.val())
      }else{
        chatCompleteListener.set({
          dispatched: snapshot.val().dispatched,
          emergency: false,
          lat: snapshot.val().lat,
          lon: snapshot.val().lon,
          timestamp: snapshot.val().timestamp,
          uid: snapshot.val().uid,
        });
      }
      chatAlertListener.remove()

    })

    this.setState({ redirectTo: '/main'})
    window.location.reload()
    chatChatsListener.off()
  }


	render(){

		return (
			 <div>
			 	{ this.state.redirectTo ?
			 		<Redirect to={{ pathname: this.state.redirectTo }} /> :
			 		(
				<div className="row">
					<div className="col-xs-3">
					<ChatDetails {...this.state.alertObject} onClick={this.handleClick}/>
					</div>
					<div className="col-xs-9">
					<MessageForm {...this.state}/>
					</div>

				</div>
					)}
			</div>

		)

	}

}


