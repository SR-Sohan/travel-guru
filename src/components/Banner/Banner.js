import { Container, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import fakeData from '../fakeData'
import ShowPlace from '../ShowPlace/ShowPlace';
import './banner.css'
import { Link, useHistory } from 'react-router-dom';
import Header from '../Header/Header';

const Banner = () => {

    const placeData = fakeData.filter( item => item.category === 'place');
    const [showPlace, setShowPlace] = useState(placeData);

    const [selectedPlace,setSelectedPlace] = useState({});

    const handlePlaceDetails = (id) => {
        const newPlace = fakeData.find( place => place.id === id);
        setSelectedPlace(newPlace);
    }

    const history = useHistory();
    const handleBooking = id =>{
        let manageId = id ? id : 1;
        history.push('/bookingform/' + manageId)
    }
    return (
        <div className='banner-area background-img'>
            <Header/>
           <Container> 
               <div className="banner-content "> 
                    <div className="banner-details"> 
                    <h1>{selectedPlace.title ? selectedPlace.title : "Cox's Bazar"}</h1>
                        <p>{selectedPlace.shortDiscription ? selectedPlace.shortDiscription : "Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ..."}</p>
                        {/* <Link to={"/bookingform/" + selectedPlace.id}> 
                        <button > <span>Booking</span> <ArrowForwardIcon></ArrowForwardIcon></button>
                        </Link> */}

                        <button onClick={()=> handleBooking(selectedPlace.id)} > <span>Booking</span> <ArrowForwardIcon></ArrowForwardIcon></button>
                    </div>
                    <div className="banner-list"> 
                        <div className="single-item"> 
                            <Grid container > 
                                    {showPlace.map( place => <ShowPlace
                                     handlePlaceDetails={handlePlaceDetails}
                                      key={place.id} 
                                      place={place}
                                      ></ShowPlace>)}
                            </Grid>
                        </div>
                    </div>
               </div>
           </Container>
        </div>
    );
};

export default Banner;