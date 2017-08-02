import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  //withRouter
} from 'react-router-dom'

import { firebaseAuth } from './utils/firebase';
import './app.css';

import Home from './views/home';
import Main from './views/main';
import Chat from './views/chat';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/main' />}
    />
  )
}

export default class App extends Component {
  
  constructor(props){
    super(props);
  

    this.state = {
      authed: false,
      redirectToReferrer: false,
      loading: true,
      alerts: ''
    }
}

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      // console.log(user)
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  };

  componentWillUnmount () {
    this.removeListener()
  };

          //   <div className="row">
          //   <nav className="navbar navbar-default navbar-static-top">
          //     <div className="navbar-header">
          //       <Link to="/" className="navbar-brand">Campus Watch</Link>
          //     </div>
          //     <ul className="nav navbar-nav pull-right">
          //       <li>
          //         {this.state.authed
          //           ? <button
          //               style={{border: 'none', background: 'transparent'}}
          //               onClick={() => {
          //                 logout()
          //               }}
          //               className="navbar-brand">Logout</button>
          //           : <span>
          //             </span>}
          //       </li>
          //     </ul>
          //   </nav>
          // </div>

  render() {


    return this.state.loading === true ? <h1>Loading</h1> : (
      <Router>
        <div className="container-fluid">
            <div className="row">
                <PublicRoute authed={this.state.authed} path='/' exact component={Home} />
                <PrivateRoute authed={this.state.authed} path='/main' component={Main} />
                <PrivateRoute authed={this.state.authed} path='/chat' component={Chat} />
            </div>
        </div>
      </Router>
    );
  }
}



