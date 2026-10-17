import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] ,refetch} = useQuery({

        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`);
            console.log(res.data);
            return res.data;
        }


    })

    const handleDeliveryStatusUpdate=(parcel,status)=>{

        const statusInfo={
            deliveryStatus: status,
            riderId:parcel.riderId,
            trackingId: parcel.trackingId
        
        }

        let message= `Parcel Status is Updated with ${status.split('_').join('')}`;

        axiosSecure.patch(`/parcels/${parcel._id}/status`,statusInfo)
          .then(res=>{
            if(res.data.modifiedCount){

                refetch();

                Swal.fire(message);

            }
          })



    }


    // const handleDeliveryStatusUpdate=()=>{

    // }





    return (
        <div>
            <h1>Parcels Pending Pickup: {parcels.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        parcels.map((parcel,index)=> <tr key={parcel._id}>
                            <th>{index+1}</th>
                            <td>{parcel?.parcelName}</td>
                            <td>{
                                parcel.deliveryStatus==='driver_assigned' ?
                                <>
                                
                                 <button onClick={()=>handleDeliveryStatusUpdate(parcel, 'rider_arriving')} className='btn btn-primary text-black rounded-4xl'>Accept</button><button className='btn btn-warning text-black ml-5 rounded-4xl'>Reject</button>
                                
                                </>
                                : <span className='btn btn-secondary rounded-4xl'>Delivery Accepted</span>
                                
                                }</td>
                            <td>

                                 <button onClick={()=>handleDeliveryStatusUpdate(parcel,'parcel_picked_up')} className='btn btn-primary text-black rounded-4xl'>Marked as Picked Up</button>
                                 
                                 <button onClick={()=>handleDeliveryStatusUpdate(parcel,'parcel_delivered')} className='btn btn-warning text-black ml-5 rounded-4xl'>Marked as Delivered</button>
                                
                            
                            </td>
                        </tr>)
                       }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;