import React, { use } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

//import 'styles.css';

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './review/ReviewCard';


const Reviews = ({reviewPromise}) => {

    const review= use(reviewPromise);

    console.log(review)
    return (
        
         <div>
            <div className='text-center my-20'>

                <h1>Review</h1>
                <p className='mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, autem!</p>
               

            </div>

            <Swiper
        loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          scale:0.75,
          slideShadows: true,
        }}

         autoplay={{
            delay:500,
            disableOnInteraction:false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination,Autoplay]}
        className="mySwiper"
      >
        {
            review.map(a=> <SwiperSlide key={a.id}>
          <ReviewCard a={a}></ReviewCard>
        </SwiperSlide>)
        }
       
      </Swiper>
         </div>
    );
};

export default Reviews;