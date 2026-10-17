import React from 'react';
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({a}) => {

    //console.log(review);
    return (
       <div className="card bg-base-100 w-96 shadow-sm p-5">
        
  <figure>
    <FaQuoteLeft />
    <h1>{a.review}</h1>
  </figure>
  <div className="flex p-2">
    <img className='rounded-full' src={a.user_photoURL} alt="" />
    <div className='p-2'>
        <h2 className="card-title">{a.userName}</h2>
        <p>{a.role}</p>
    
    </div>
  </div>
</div>
    );
};

export default ReviewCard;