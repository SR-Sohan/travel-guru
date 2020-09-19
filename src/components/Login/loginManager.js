
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

// Firbase initali export
export const initalizeFirebase = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
} 

// Google Handle Export
export const handleGoogleSignIn = () =>{
    let googleProvider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
          const {displayName,email} = res.user;
          const userInfo = {
            isSignIn: true,
            name: displayName,
            email: email,
            success: true
          }
          return userInfo
        })
        .catch(function(error) {
              console.log(error.message);
        });
  }

// Facebook Handle Export
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then( res =>  {
        console.log(res);
        const {displayName,email} = res.user;
          const userInfo = {
            isSignIn: true,
            name: displayName,
            email: email,
            success: true
          }
          return userInfo
      })
      .catch(error => {
        console.log(error.message);
      });
  }

// Create Account with email and password Export
export const createUserWithEmailAndPassword = (email, password,firstName,lastName) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            let newUserIfno = res.user;
            newUserIfno.error = '';
            newUserIfno.success = true;
            return newUserIfno;
            updateUserName(firstName,lastName);
        })
        .catch(error => {
          let errorMessage = error.message;
          const newUserIfno = {};
          newUserIfno.error = errorMessage;
          newUserIfno.success = false;
          return newUserIfno;
        });
}


// Sign in whit email and password Export
export  const signInWithEmailAndPassword = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then( res => {
      const newUserIfno = res.user;
      newUserIfno.error = '';
      newUserIfno.success = true;
      return newUserIfno;
    })
    .catch(error => {
      let errorMessage = error.message;
      const newUserIfno = {};
      newUserIfno.error = errorMessage;
      newUserIfno.success = false;
      return newUserIfno;
    });
}

// Sign Out 
export const handleSignOut = () =>{ 
    return firebase.auth().signOut()
    .then( res =>{
        const userInfo = {
          isSignIn: false,
          name: '',
          email: '',
          photo: ''
        }
        return userInfo;
    })
    .catch( err => {

    })
  }

// Update User Name
const updateUserName = (firstName ,lastName) => {
    let user = firebase.auth().currentUser;
        let fullName = firstName + ' ' + lastName;
      user.updateProfile({
        displayName: fullName
      }).then(function() {
        console.log('Update successful.')
      }).catch(function(error) {
        console.log(error.message);
      });
  }
 