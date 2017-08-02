import React, { Component } from 'react';
import { firebase } from '../utils/firebase';

import '../styles/messages.css';


export default class MessageForm extends Component {
	constructor(props){
	    super(props);

	    this.state = {
	    	messages: [],
	    	text: '',

	    }
	    this.handleMessage = this.handleMessage.bind(this)

	}

	componentWillReceiveProps(nextProps) {
		this.state.messages.push(nextProps.chat)

	}

	// componentDidMount(){
	// 	console.log(this.props)
	// 	this.setState({
	// 		key: this.props.alertObject.key
	// 	})
	// 	// 
		
	// }  

	handleMessage(e){
		e.preventDefault()

		const pushMessage = firebase.database();
		pushMessage.ref('/chats/'+this.props.alertObject.key).push().set({
			alert: this.props.alertObject.key,
			isImage: false,
			text: this.state.text,
			timestamp: Math.floor(Date.now() / 1000),
			uid: 'Dispatch',
		})

		this.setState({text: ''})

	}

	render(){
		const messages = this.state.messages.map(message => {
			if(message.uid === "Dispatch"){
				return (
					<div className="col-xs-10 bubble dispatchMessage" key={message.key}><p> {message.text}</p></div>
					)
			}else{
				return(
					<div className="col-xs-10 bubble userMessage" key={message.key}><p> {message.text}</p></div>)
			}

		})

		return (
			<div key={ this.props.alertObject.key }>
			<div className="col-xs-9 messageContainer">
				<div className="col-xs-12 messageForm">
					{messages}
				</div>
				<div className="col-xs-12 inputContainer">
					<form onSubmit={this.handleMessage}>
					<input type="text"
						className="col-xs-9 messages"
						onChange={ (msg)=>this.setState({text: msg.target.value}) }
						value={ this.state.text }
						placeholder=" New Message" />
					<input type="submit" className="col-xs-2 messagesubmit" value="SEND"/>
					</form>
				</div>
			</div>
			</div>
		)

	}

}


