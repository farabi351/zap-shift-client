import React from 'react';
import Banner from './banner/Banner';
import howitworks from '../../assets/howItWorks.json'
import ourservices from '../../assets/ourServices.json'
import { PiTruckTrailerBold } from "react-icons/pi";
import img from '../../assets/brands/service.png'
import Brands from './brands/Brands';
import Reviews from './reviews/Reviews';

const reviewPromise=fetch('/reviews.json').then(res=>res.json());

console.log(reviewPromise);


const Home = () => {

   
    


    return (
        <div className='bg-gray-100'>
            <Banner></Banner>

           

            <div className='p-15'>
                <h1 className='text-4xl text-secondary mb-10'>How it Works</h1>

               <div className='flex gap-5 items-center'>
                     {
                howitworks.map(a=>
                
                <div className='flex items-center gap-5 bg-white rounded-3xl p-5'>
                   <div>
                        <PiTruckTrailerBold size={50}/>
                        <h1 className='text-secondary font-semibold mb-2 bg-white'>{a.title}</h1>
                        <p className='text-secondary'>{a.paragraph}</p>
                   </div>
                </div>)
            }
               </div>
                
            </div>

            <div className='bg-[#03373D] p-10 mx-10 rounded-2xl'>
                <h1 className='text-white mt-15 text-4xl font-semibold text-center mb-5'>Our services</h1>
                <p className='text-white text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum, dolorum.</p>

                 <div className='grid grid-cols-3 gap-5 items-center p-3'>
                     {
                ourservices.map(a=>
                
                <div className=''>
                   <div className='bg-white p-5 w-[300px] h-[250px] rounded-xl mt-2 hover:bg-primary'>
                        <div className='flex justify-center'>
                            <img className='' src={img} alt="" />
                        </div>
                        <h1 className='text-center text-[#03373D] font-bold my-2'>{a.title}</h1>
                        <p className='text-center'>{a.paragraph}</p>
                   </div>
                </div>)
            }
               </div>
            </div>

            <Brands></Brands>

            <Reviews reviewPromise={reviewPromise}></Reviews>
        </div>
    );
};

export default Home;