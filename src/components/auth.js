// import React from 'react'
import { ref, firebaseAuth } from '../utils/firebase'; 
// import { Redirect} from 'react-router-dom'

export function newAuth (email, pw) {
  return this.props.firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => alert('Login Failed. Please try again'))
}

export function logout () {
  return firebaseAuth().signOut()
}

// export function login (email, pw) {
//        firebaseAuth().signInWithEmailAndPassword(email, pw)
//                 .then((userData) =>
//                   {
//                  <Redirect push to="/main" />
//                  console.log('loggedin?')
//                   }
//                 ).catch((error) =>
//                     {
//                     alert('Login Failed. Please try again')
//                     console.log(error);
//                 });
// }

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}


export function checkAuth (user){
      firebaseAuth().currentUser(user => {
      if (user) {
        console.log('Logged in:', user);
        this.setState({ showForm: true });
      } else {
        console.log('not logged in')
      }
    });
  }

export function checkauth (self){
      if (firebaseAuth().currentUser) {
      
      self.setState({
        showForm: true,
        user: ''
      });
          
    }
}