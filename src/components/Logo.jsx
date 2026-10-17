import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end font-bold -ms-2.5'>
            <img src={logo} alt="" />
            <h3 className='text-3xl'>zapShift</h3>
        </div>
    );
};

export default Logo;