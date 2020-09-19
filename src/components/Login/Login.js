import { Container } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import './Login.css'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initalizeFirebase , handleGoogleSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword, handleSignOut, handleFbSignIn } from './loginManager';
import Header from '../Header/Header';

    
const Login = () => {
  // firebase initali
  initalizeFirebase();

    // History State
    const history = useHistory();
    // Location State
    const location = useLocation();
    // Location redirect path
    let { from } = location.state || { from: { pathname: "/" } };

    // New User State
    const [newUser,setNewUser] = useState(true)

    // User info Set State
    const [user,setUser] = useState({
        isSignIn: false,
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmpassword: '',
        error: '',
        success: false
    });

    // Context user set State
    const[loggedInUser , setLoggedInUser] = useContext(UserContext)

  

    // Input Filed Validation
      const handleFiledValidation = (e) =>{
        let isFormValid = true;
          if(e.target.name === 'firstName'){
            isFormValid = e.target.value;
          }
          if(e.target.name === 'lastName'){
            isFormValid = e.target.value;
          }
          if(e.target.name === 'email'){
               isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            
          }
          if(e.target.name === 'password'){
            const isPasswordNumber = e.target.value.length > 7;
            const isPasswordNumberQuantit =  /\d{1}/.test(e.target.value);
            isFormValid = isPasswordNumber && isPasswordNumberQuantit;
          }
          if(e.target.name === 'confirmpassword'){
            const isConfirmPasswordNumber = e.target.value.length > 7;
            const isConfirmPasswordNumberQuantit =  /\d{1}/.test(e.target.value);
            isFormValid = isConfirmPasswordNumber && isConfirmPasswordNumberQuantit;
          }

          if(isFormValid){
            let newUserIfno = {...user};
            newUserIfno[e.target.name] = e.target.value;
            setUser(newUserIfno)
          }
      };

      //Google Sign In Function
      const googleSignIn = () => {
        handleGoogleSignIn()
        .then( res => {
          handleResponse(res,true)
        })
      };

      // FaceBook Sign In Function
      const fbSignIn = () => {
        handleFbSignIn()
        .then( res => {
          handleResponse(res,true)
        })
      };

      // SignOut
      const signOut = () =>{
        handleSignOut()
        .then( res => {
          setUser(res);
          handleResponse(res,false)
        })
      };

      // Comon Response function
      const handleResponse = (res,redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
          history.replace(from);
        }
      }
    //Form Submit Function
    const handleFormSubmit = (e) => {
      // Create New User Function
      if(newUser && user.email && user.password === user.confirmpassword){
        createUserWithEmailAndPassword(user.email,user.password,user.firstName,user.lastName)
        .then(res => {
          handleResponse(res,false)
          setNewUser(false)
        })
      };

      // Sign In or Log In Function
      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email,user.password)
          .then( res => {
            handleResponse(res,true)
          })
      }

      e.preventDefault();
    };

   

    return (
        <div className="login-area">
          <Header></Header>
           <Container> 
               <div className="form-section"> 
                   <div className="create-user"> 
                    <h3>Create an account</h3>
                        <form onSubmit={handleFormSubmit}> 
                                {newUser  && <input  onBlur={handleFiledValidation} type="text" name="firstName" placeholder="First Name" required/>}
                                <br/> 
                                { newUser  && <input onBlur={handleFiledValidation} type="text"  name="lastName" placeholder="Last Name" required/>}
                                <br/>
                                <input onBlur={handleFiledValidation} type="text" name="email" placeholder="User Name or Email" required />
                                <br/>
                                <input onBlur={handleFiledValidation} name="password" type="password" placeholder="Password" required/>
                                <br/>
                                {newUser  && <input onBlur={handleFiledValidation} name="confirmpassword" type="password"  placeholder=" Confirm Password" required/>}
                                <br/> 
                               <input type="submit" value={newUser ?"Create an account":'Login'}/>
                                <br/> 
                                <p>{ newUser ? 'Already have an account?' : "Don't have an account?"} <span onClick={()=> setNewUser(!newUser)}>{ newUser ? 'Login' : 'Create an account'}</span></p>
                        </form>
                   </div>
                   <div className="social-section">
                       <div onClick={googleSignIn} className="social google-section"> 
                            <img src={require('../../images/Icon/google.png')} alt="" />
                            <span>Login with Google</span>
                       </div>
                       <div onClick={fbSignIn} className=" social facebokk-section"> 
                            <img src={require('../../images/Icon/fb.png')} alt="" />
                            <span>Login with FaceBook</span>
                       </div>
                   </div>
               </div>
           </Container>
        </div>
    );
};

export default Login;