import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { useRef } from 'react';


const CoverageUS = () => {
    const position = [39.8283, -98.5795];

    const data=useLoaderData();

     const mapRef=useRef(null);
    console.log(data);

    const handleSearch=(e)=>{

        e.preventDefault();
        const city=e.target.city.value;
       console.log(city);

        const findCity=data.find(a=>a.city.toLowerCase().includes(city.toLowerCase()));
        console.log(findCity);

        if(findCity){
            const cityArray=[findCity.latitude,findCity.longitude];

            console.log(city,cityArray);
            mapRef.current.flyTo(cityArray, 14);

        }

       
        

    }


  

    return (
        <div>
            <h1 className='text-center text-7xl font-semibold my-15'>We are Available in 50 States</h1>

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
                            <input type="search" name='city' required placeholder="Search Your City" />
                </label>
                </form>
            </div>




            <div className='border w-full h-[800px]'>
                <MapContainer center={position} zoom={4} scrollWheelZoom={false} ref={mapRef} className='h-[800px]'>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    
                   
                    {
                        data.map(a=><Marker position={[a.latitude, a.longitude]}>

                            <Popup className=''><span className='text-5xl mb-10'>{a.city}</span> <br></br><span className=''>Service Area:</span> <br /> <span className='text-xl mt-2 text-green-700'>{a.covered_area.join(', ')}</span></Popup>
                        </Marker>)
                    }
                    
            </MapContainer>
            </div>
        </div>
    );
};

export default CoverageUS;