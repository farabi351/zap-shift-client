import React, { useState } from 'react';

const AboutUs = () => {

const [selected,setSelected]=useState([]);

const tabs = [
  {
    title: "Story",
    paragraph:
      "We started with a simple goal: to make parcel delivery easier, faster, and more reliable for everyone. From small personal packages to growing business shipments, we are committed to providing a smooth delivery experience from pickup to destination."
  },
  {
    title: "Mission",
    paragraph:
      "Our mission is to connect people and businesses through dependable delivery solutions. We focus on fast service, safe parcel handling, transparent communication, and customer satisfaction while continuously improving our technology and logistics network."
  },
  {
    title: "Success",
    paragraph:
      "Our success is built on the trust of our customers and partners. By delivering parcels on time, providing responsive support, and maintaining high service standards, we continue to grow and help businesses reach their customers across the country."
  },
  {
    title: "Terms & Others",
    paragraph:
      "Our services are designed to provide a safe and convenient delivery experience. Customers are responsible for providing accurate delivery information and following our shipping guidelines. Certain items may be restricted, and delivery times can vary depending on location, weather, and other circumstances."
  }
];





    return (
        <div className='p-10'>
            <h1 className='text-5xl font-semibold'>About Us</h1>
            <p className='my-5 font-medium'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, enim!</p>

            <div>
                <div className='flex gap-5 font-semibold'>
                    {
                        tabs.map(a=><button key={a.title} className='btn' onClick={()=>setSelected(a)}>{a.title}</button>)
                    }
                    
                   
        

                </div>

                <div className='my-5'>
                     <p>{selected.paragraph}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default AboutUs;<h1>Me about us</h1>