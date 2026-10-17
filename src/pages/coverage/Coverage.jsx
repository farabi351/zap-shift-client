import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';




const Coverage = () => {
    //const position = [39.8283, -98.5795];
    const position = [23.6850, 90.3563];
    const serviceCenter= useLoaderData();
    const mapRef=useRef(null);
    console.log(serviceCenter);

    const handleSearch=(e)=>{

        e.preventDefault();
        const location=e.target.location.value;
        const district=serviceCenter.find(a=>a.district.toLowerCase().includes(location.toLowerCase()));

           if(district){
              const locationMatch=[district.latitude, district.longitude];
              console.log(district,locationMatch);
              mapRef.current.flyTo(locationMatch, 14);
           }

    }

    return (
        <div>
            <h1 className='text-5xl font-bold my-10 ml-10'>We are available in 50 States</h1>

            <div className='mb-5'>
                  <form onSubmit={handleSearch}>
                    <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" name='location' required placeholder="Search" />
            </label>
                  </form>

            </div>
            {/* <button>Submit</button> */}


           <div className='border w-full h-[900px]'>
                <MapContainer  center={position} zoom={7} scrollWheelZoom={false} className='h-[900px]' ref={mapRef}>
                             
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {
                                    serviceCenter.map(a=><Marker position={[a.latitude, a.longitude]}>
                                <Popup>
                                    <strong className='text-5xl'>{a.city}</strong> <br/><span className='text-green-500'>Service Area: {a.covered_area.join(' ')}</span>
                                </Popup>
                                </Marker>)
                                }
                </MapContainer>,
           </div>
        </div>
    );
};

export default Coverage;