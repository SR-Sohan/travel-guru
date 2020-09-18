import { Container } from '@material-ui/core';
import React from 'react';
import fakeData from '../fakeData';
import Header from '../Header/Header';
import SingleRoom from '../SingleRoom/SingleRoom';
import './HotelRoom.css'

const HotelRoom = () => {
    const room = fakeData.filter( room => room.category === 'room');
    
    return (
        <div className="hotelroom-area">
            <Header/>
            <Container> 
                <div className="hotelroom-content"> 
                    <div className="room-content"> 
                        {room.map( room => <SingleRoom key={room.id} room={room}></SingleRoom>)}
                    </div>
                    <div className="google-map"> 
                        <h1>google map</h1>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HotelRoom;