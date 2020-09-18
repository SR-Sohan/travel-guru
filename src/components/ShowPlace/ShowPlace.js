import { Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './ShowPlace.css'
const ShowPlace = (props) => {
    const {title,img,id} = props.place
   
    return (
        <Grid style={{}}> 
            {/* <Link to={'/bookingform/' + id}>  */}
                <div onClick={()=> props.handlePlaceDetails(id)} className="show-place"> 
                    <img src={img} alt=""/>
                    <div className="place-name"> 
                        <h2>{title}</h2>
                    </div>
                </div>
            {/* </Link> */}
        </Grid>
    );
};

export default ShowPlace;