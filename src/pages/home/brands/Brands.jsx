import React from 'react';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png';
import cas from '../../../assets/brands/casio.png';
import im2 from '../../../assets/brands/moonstar.png';
import im3 from '../../../assets/brands/randstad.png';
import im5 from '../../../assets/brands/star.png';
import im6 from '../../../assets/brands/start_people.png';


const Brands = () => {
    return (
        <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}

        modules={[Autoplay]}
        autoplay={{
            delay:500,
            disableOnInteraction:false,
        }}

        
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        // className="mySwiper"
      >
        <SwiperSlide><img src={amazon} alt="" /></SwiperSlide>
        <SwiperSlide><img src={cas} alt="" /></SwiperSlide>
        <SwiperSlide><img src={im3} alt="" /></SwiperSlide>
        
        <SwiperSlide><img src={im5} alt="" /></SwiperSlide>
        <SwiperSlide><img src={im6} alt="" /></SwiperSlide>
        <SwiperSlide><img src={im2} alt="" /></SwiperSlide>
        
       
      </Swiper>
    );
};

export default Brands;