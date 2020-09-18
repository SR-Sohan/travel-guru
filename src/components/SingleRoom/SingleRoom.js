import React from 'react';
import './SingleRoom.css'

const SingleRoom = (props) => {
    const {title,img,person,service,rating,price,totalPrice}  = props.room;
    return (
        <div className="single-room">
            <div className="room-img"> 
                <img src={img} alt=""/>
            </div>
            <div className="room-details"> 
                <h3>{title}</h3>
                <p>{person}</p>
                <p>{service}</p>
                <div className="price-area"> 
                    <div className="rating"> 
                        <div className="rating-icon"> 
                        <img src={require('../../images/Icon/star_1_.png')} alt="" />
                        </div>
                        <div className="rating-number"> 
                        <span>{rating}</span>
                        </div>
                    </div>
                    <div className="price"> 
                     <p>${price}/<span>night  ${totalPrice} total</span> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleRoom;