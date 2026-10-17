import React from 'react';
import img from '../../assets/banner/error.webp';

const ErrorPage = () => {
    return (
        <div>
            <img src={img} alt="" />
            <h1 className='text-7xl text-center'>Error 404</h1>
            <button className='flex justify-center'>Home Page</button>
        </div>
    );
};

export default ErrorPage;