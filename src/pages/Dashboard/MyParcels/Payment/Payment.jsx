import { useQueries, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Payment = () => {

    const {id}= useParams();
    const axiosSecure=useAxiosSecure();

    const {data: myParcel }=useQuery({
        queryKey:['parcels',id],
        queryFn:async()=>{

            const res=await axiosSecure.get(`/parcels/${id}`);
            return res.data;

        }
        
    })

    const handlePayment=async()=>{

        const paymentInfo={
            cost:myParcel.cost,
            parcelId:myParcel._id,
            sendersEmail:myParcel.sendersEmail,
            parcelName:myParcel.parcelName

        }

        const res =await axiosSecure.post('/create-checkout-session',paymentInfo);
        console.log(res.data);

        window.location.href=res.data.url;

    }

    return (
        <div>
            <h2>Please Pay: ${myParcel?.cost} for:{myParcel?.parcelName}</h2>
            <button onClick={handlePayment} className='btn btn-primary text-green-700 mt-5'>Pay</button>
            
        </div>
    );
};

export default Payment;