import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import BookingForm from './components/BookingForm/BookingForm';
import Header from './components/Header/Header';
import HotelRoom from './components/HotelRoom/HotelRoom';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedUser] = useState([])
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedUser]}>
      <Router> 
        
        <Switch> 
          <Route exact path='/'> 
            <Home/>
          </Route>
          <Route path='/home'> 
             <Home/>
          </Route>
          <PrivateRoute path='/hotelroom'> 
              <HotelRoom/>
          </PrivateRoute>
          <Route path="/login"> 
            <Login/>
          </Route>
          <Route path='/bookingform/:bookingId'> 
            <BookingForm/>
          </Route>
          <Route path='*'> 
            <NotFound/>
          </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
