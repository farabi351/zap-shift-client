import React from 'react';
import imgDriver from '../../assets/agent-pending.png'
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';


const BeARider = () => {

    const navigate=useNavigate();

    const { register, handleSubmit, control } = useForm();

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const ridersRegion = useWatch({ control, name: 'ridersRegion' });



    const serviceCenters = useLoaderData();

    const mapRegion = serviceCenters.map(a => a.region);

    //console.log(mapRegion);

    const filterRepetitiveRegion = new Set(mapRegion);

    //console.log(filterRepetitiveRegion);

    const regionList = [...filterRepetitiveRegion];

    const handleRidersDistrict = (region) => {

        const filterDistrict = serviceCenters.filter(a => a.region === region);

        const mapTheDistrict = filterDistrict.map(b => b.district);

        return mapTheDistrict;



    }

    const handleBeARider = (data) => {

        console.log(data);

        axiosSecure.post('/riders', data)
            .then(res => {

                if (res.data.insertedId) {

                    Swal.fire({
                        title: "Your application is submitted, A confirmation email will be sent within 7 Business Days",
                        icon: "success",
                        draggable: true
                        
                        
                    });

                    navigate('/')

                }
            })

    }


    return (
        <div>
            <div className='p-15'>
                <h1 className='text-5xl font-bold mb-5 text-secondary'>Be A Rider</h1>
                <p className='font-bold text-xl my-5 text-secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quam sunt, corporis esse nam magnam in pariatur obcaecati assumenda tenetur!
                </p>

                <div className='flex flex-col md:flex-row justify-between justify-items-end'>

                    <form onSubmit={handleSubmit(handleBeARider)}>
                        <div className='gap-1 flex flex-col mt-2'>
                            <label className="label">Your Name</label>
                            <input type="text" {...register('name')} className="input" placeholder="Your Name" />
                        </div>

                        <div className='gap-1 flex flex-col mt-2'>
                            <label className="label">Driving License Number</label>
                            <input type="text" {...register('license')} className="input" placeholder="Driving License Number" />
                        </div>

                        <div className='gap-1 flex flex-col mt-2'>
                            <label className="label">Your Email</label>
                            <input type="text" {...register('email')} className="input" placeholder="Your Email" />
                        </div>

                        <h1 className='mt-3'>Riders Region</h1>
                        <select {...register('ridersRegion')} defaultValue="Pick a Division" className="select">
                            <option disabled={true}>Pick a Division</option>
                            {
                                regionList.map(a => <option value={a} key={a}>{a}</option>)
                            }

                        </select>

                        <h1 className='mt-3'>Riders District</h1>
                        <select {...register('ridersDistrict')} defaultValue="Pick a District" className="select">
                            <option disabled={true}>Pick a District</option>
                            {
                                handleRidersDistrict(ridersRegion).map(a => <option value={a} key={a}>{a}</option>)
                            }

                        </select>

                        <div className='gap-1 flex flex-col mt-2'>
                            <label className="label">NID No</label>
                            <input type="text" {...register('nid')} className="input" placeholder="NID no" />
                        </div>

                        <div className='gap-1 flex flex-col mt-2'>
                            <label className="label">Phone No</label>
                            <input type="text" {...register('phoneNo')} className="input" placeholder="Phone No" />
                        </div>

                        <div className='gap-1 flex flex-col mt-3'>
                            <label className="label">Bike Brand Model And Year</label>
                            <input type="text" {...register('modelAndYear')} className="input" placeholder="Bike brand model and Year" />
                        </div>

                        <div className='gap-1 flex flex-col mt-3'>
                            <label className="label">Bike Registration Number</label>
                            <input type="text" {...register('registrationNo')} className="input" placeholder="Bike Registration Number" />
                        </div>

                        <div className='gap-1 flex flex-col mt-3'>
                            <label className="label">Tell Us About Yourself</label>
                            <input type="text" {...register('aboutYourSelf')} className="input" placeholder="Tell Us About Yourself" />
                        </div>

                        {/* <input type='submit' className='btn btn-primary text-secondary mt-5 w-auto md:w-[320px]'>Apply as a Rider</input> */}
                        <input type='submit' className='btn btn-primary text-secondary mt-5 w-[255px] md:w-[320px]' value='Apply as A rider' ></input>
                    </form>

                    <div>
                        <img className='' src={imgDriver} alt="" />
                    </div>
                </div>



            </div>
        </div>
    );
};

export default BeARider;