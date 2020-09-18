import { Container } from '@material-ui/core';
import React from 'react';
import './BookingForm.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import fakeData from '../fakeData';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const BookingForm = () => {
    const classes = useStyles();
    let {bookingId} = useParams();
    let bookingDetail = fakeData.find( item => item.id == bookingId )
    return (
        <div className="booking-area background-img" > 
            <Header/>
            <Container> 
                <div className="booking-content"> 
                    <div className="booking-details"> 
                        <h1>{bookingDetail.title}</h1>
                        <p>{bookingDetail.discription}</p>
                    </div>
                    <div className="booking-from"> 
                        <form action="">
                            <label htmlFor="origin">Origin</label>
                            <br/>
                            <input type="text" id="origin" required/>
                            <br/> 
                            <label htmlFor="destinaton">Destinaton</label>
                            <br/> 
                            <input type="text" id="destinaton" required/>
                            <div className="date-area"> 
                                <div className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Form"
                                        type="date"
                                        defaultValue="2020-09-16"
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                    />
                                </div>
                                <div className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="To"
                                        type="date"
                                        defaultValue="2020-09-20"
                                        className={classes.textField}
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        />
                                </div>
                            </div>
                            <Link to='/hotelroom'> 
                                <input  className="submit-btn" type="submit" value="Start Booking" />
                            </Link>
                             
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default BookingForm;