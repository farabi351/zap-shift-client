import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../../socialLogin/SocialLogin';


const Login = () => {

    const {register,handleSubmit, formState:{errors}}=useForm();

    const {signInUser}=useAuth();

    const location=useLocation();
    console.log(location);
    const navigate=useNavigate();
    console.log('in the login page',location);
    

    const handleLogin=(data)=>{

        console.log('from data',data);
        signInUser(data.email, data.password)
        .then(result=>{
            console.log(result);
            navigate(location?.state || '/');
        })

        .catch(error=>{
            console.log(error);
        })

    }
    
    return (

        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10'>

            <form className='card-body' onSubmit={handleSubmit(handleLogin)}>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border mx-auto p-5">
                    <legend className="fieldset-legend mx-auto p-2"></legend>

                    <h1 className='text-3xl text-center mb-2'>Welcome Back</h1>

                    <h1 className='text-xl text-center font-light mb-5'>Please Login</h1>

                    <label className="label">Email</label>
                    <input type="email" {...register('email' , {required: true} )}  className="input" placeholder="Email" />
                    {
                        errors.email?.type ==='required' && <p className='text-4xl text-red-600'>Email is required</p>
                    }
                    

                    <label className="label">Password</label>
                    <input type="password" {...register('password' ,{required: true ,minLength: 6})} className="input" placeholder="Password" />

                    {
                        errors.password?.type==='minLength' && <p className='text-5xl text-red-600'>Password must be 6 Character or longer</p>
                    }
                    
                    
                    {
                        errors.password?.type==='required' && <p className='text-5xl text-red-600'>Password is required</p>
                    }

                   
                    
                    <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>

        <p className='text-center font-medium'>New To zapShift go to <Link state={location.state} to='/registration'><span className='text-blue-600'>Registration</span></Link></p>
 
       <SocialLogin></SocialLogin>

        </form>

        

        </div>
        
    );
};

export default Login;