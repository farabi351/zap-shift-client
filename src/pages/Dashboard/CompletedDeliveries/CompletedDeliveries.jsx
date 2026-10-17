import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaSackDollar } from 'react-icons/fa6';

const CompletedDeliveries = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] ,refetch} = useQuery({

        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`);
            console.log(res.data);
            return res.data;
        }


    })

    const calculatePayout = parcel=>{
        if(parcel.sendersDistrict==parcel.receiversDistrict){
            return parcel.cost *0.8;
        }

        else{
            return parcel.cost *0.6;
        }
    }

    return (
        <div>

            <h1 className='text-7xl p-10 text-center'>Completed Deliveries: {parcels.length}</h1>

             <div className="overflow-x-auto p-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        parcels.map((parcel,index)=> <tr key={parcel._id}>
                            <th>{index+1}</th>
                            <td>{parcel?.parcelName}</td>
                            <td>{parcel.createdAt}</td>
                            <td>{parcel.sendersDistrict}</td>
                            <td>{parcel.cost}</td>
                            <td>{calculatePayout(parcel)}</td>

                            <td>

                                 <button  className='btn btn-primary text-black rounded-4xl'><FaSackDollar></FaSackDollar>CashOut</button>
                                 
                                
                            </td>
                            
                           
                        </tr>)
                       }
                        
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default CompletedDeliveries;