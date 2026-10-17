import React from 'react';
import { MdOutlineArrowOutward } from "react-icons/md";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import img1 from '../../../assets/banner/banner1.png'
import img2 from '../../../assets/banner/banner2.png'
import img3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <Carousel autoPlay={false} infiniteLoop={true}>
                <div className='flex flex-col md:p-20'>
                    <img src={img1} />

                    <div className='flex flex-row gap-4 md:pl-15'>

                        <button className='btn rounded-4xl btn-primary text-secondary md:-mt-20'>Track Your Parcel</button>
                        <button className='btn rounded-full md:-mt-20'><MdOutlineArrowOutward/></button>
                        <button className='btn md:-mt-20 rounded-2xl'>Be a Rider</button>

                    </div>
                    
                </div>
                <div>
                    <img src={img2} />
                    
                </div>
                <div>
                    <img src={img3} />
                    
                </div>
            </Carousel>
    );
};

export default Banner;