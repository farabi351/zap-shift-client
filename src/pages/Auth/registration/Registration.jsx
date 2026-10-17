import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../socialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Registration = () => {

    const navigate=useNavigate();
    const location=useLocation();

    const {register,handleSubmit, formState:{errors}}=useForm();

    const {registerUser, updateUserProfile}=useAuth();

    const axiosSecure=useAxiosSecure();

    const handleRegistration=(data)=>{

        console.log('after register',data.photo[0]);

        const profileImg=data.photo[0];


        registerUser(data.email ,data.password)
        .then(()=>{
            //console.log(result.user);

            //store the image in form data
            const formData=new FormData();

            formData.append('image',profileImg);
            
            //send the photo to store and get the url
            const image_API_URL=`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host}`

            axios.post(image_API_URL,formData)
           
            .then(res=>{
               // console.log('after image upload',res.data.data.url);

               const photoURL = res.data.data.url;

               //crete user in database
               const userInfo={

                     email:data.email,
                     displayName:data.name,
                     photoURL:photoURL


               }
               axiosSecure.post('/users',userInfo)
                .then(res=>{
                    if(res.data.insertedId){

                        console.log('user created in the database');

                    }
                })

                //update user Profile to firebase

                const userProfile={
                    displayName:data.name,
                    photoURL: photoURL
                }

                updateUserProfile(userProfile)
                .then(res=>{

                    console.log(res,"user profile updated")
                    navigate(location?.state || '/');
                })
                .catch(error=>{
                    console.log(error)
                })
            })


            

        })
        .catch(error=>console.log(error))


    }
    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10'>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border mx-auto p-5">
                    <legend className="fieldset-legend mx-auto p-2"></legend>
                    
                    <h1 className='text-3xl'>Welcome to Zapshift</h1>

                    <h1 className='text-xl text-center font-light mb-5 mt-3'>Please Registration with Us!</h1>

                    {/* Name field */}
                    <label className="label">Name</label>
                    <input type="name" {...register('name' ,{required: true})} className="input" placeholder="Name" />

                    {
                        errors.name?.type==='required' && <p className='text-red-500'>Name is required</p>
                    }




                    {/* photo field */}
                    <label className="label">Upload Your Photo</label>
                    {/* <input type="file" className="file-input" /> */}
                    <input type="file" {...register('photo' ,{required: true})} className="file-input" placeholder="Your Photo" />

                    {
                        errors.file?.type==='required' && <p className='text-red-500'>Photo is required</p>
                    }


                   

                    <label className="label">Email</label>
                    <input type="email" {...register('email' ,{required: true})} className="input" placeholder="Email" />

                    {
                        errors.email?.type==='required' && <p className='text-red-500'>Email is required</p>
                    }

                    <label className="label">Password</label>
                    <input type="password"{...register('password' , {required: true, minLength: 6 , pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/i})} className="input" placeholder="Password" />
                    {
                        errors.password?.type==='required' && <p className='text-red-500'>Password required</p>
                    }

                    {
                        errors.password?.type==='minLength' && <p className='text-red-500 text-4xl'>Password must be 6 character long</p>
                    }

                    {
                        errors.password?.type==='pattern' && <p className='text-red-500 text-4xl'>Password must contain at least one upper case character, one lower case character, one number and one special character</p>
                    }
                    <button className="btn btn-neutral mt-4">Registration</button>
        </fieldset>

        <p className='text-center font-medium'>All ready have adn account <Link state={location.state} to='/login'><span className='text-blue-600'>login</span></Link></p>
        
        <SocialLogin></SocialLogin>

        </form>

        
        </div>
    );
};

export default Registration;