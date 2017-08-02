import React, { Component } from 'react';
import { firebaseAuth } from '../utils/firebase';
// import MainComponent from '../components/maincomponent'
//import { logout } from '../components/auth'
import '../app.css';

export default class Home extends Component {

  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.email, this.state.password)

         firebaseAuth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((userData) =>
                  {

                 console.log('loggedin?')
                  }
                ).catch((error) =>
                    {
                    alert('Login Failed. Please try again')
                    console.log(error);
                });
  }


  render() {

    return (
    <div className="row">
    <div className="col-xs-offset-3 col-xs-6 login-container">
      <div className="row">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
          <p className="loginText">Email</p>
          <input type="text" 
               className="primaryButton"
               onChange={ (text)=>this.setState({email: text.target.value}) }
               value={ this.state.email }
               placeholder={" Email Address"} />
          </div>
          <div className="row">
          <p className="loginText">Password</p>
            <input type="password" 
                 className="primaryButton"
               onChange={ (text)=>this.setState({password: text.target.value}) }
               value={ this.state.password }
               placeholder={" Password"} />
          </div>
          <div className="row">
          <input type="submit"
               className="primaryButtonText"
               value="Login" />
          
          </div>
        </form>

      </div>
      
    </div>
    </div>
    );
  }
}

