import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoMdRemoveCircle } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineViewInAr } from "react-icons/md";
import Swal from 'sweetalert2';
import { Link, NavLink } from 'react-router';




const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    })

    const handleParcelDelete = id => {

        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) 
                
                axiosSecure.delete(`/parcels/${id}`)
                 .then(res=>res.data);
                refetch();
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        });

    }

    const handlePayment=async(a)=>{

        const paymentInfo={
            cost: a.cost,
            parcelId:a._id,
            sendersEmail:a.sendersEmail,
            parcelName:a.parcelName,
            trackingId:a.trackingId

        }

        const res = await axiosSecure.post('/create-checkout-session',paymentInfo);
        window.location.assign(res.data.url);

        //console.log(res.data.url)

       
        
    }



    return (
        <div>
            <h1>All My Parcels:{parcels.length}</h1>

            {console.log({parcels})}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parcel Name</th>
                            <th>Parcel Cost</th>
                            <th>Payment Status</th>
                            <th>Tracking ID</th>
                            <th>Delivery Status</th>
                            <th>Parcel Weight</th>
                            <th>Senders Name</th>
                            <th>Receivers Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}



                        {
                            parcels.map((a, index) => <tr className='bg-base-200' key={a._id}>
                                <th>{index + 1}</th>
                                <th>{a.parcelName}</th>
                                <th>{a.cost} Dollar</th>
                                <td>
                                     {/* {console.log('Hayyyy',a)} */}
                                    {
                                        a.paymentStatus==='paid'?<span className='text-green-600 btn bg-green-200'>Paid</span>:<button onClick={()=>handlePayment(a)} className='text-green-600 btn btn-primary'>Pay</button>
                                    }
                                </td>
                                <td><Link className='btn btn-secondary hover:bg-red-300' to={`/parcel-track/${a.trackingId}`}>{a.trackingId}</Link></td>
                                <td>{a.deliveryStatus}</td>
                                <td>{a.parcelWeight} kg</td>
                                <td>{a.sendersName}</td>
                                <td>{a.receiversName}</td>
                                <button className='btn btn-secondary mr-2 hover:bg-red-200'><GrUpdate /></button>
                                <button className='btn btn-secondary mr-2'><MdOutlineViewInAr /></button>
                                <button onClick={() => handleParcelDelete(a._id)} className='btn btn-secondary'><IoMdRemoveCircle /></button>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;