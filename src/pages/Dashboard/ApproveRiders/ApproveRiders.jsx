import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FcCancel, FcFullTrash } from "react-icons/fc";
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { RiEjectFill } from 'react-icons/ri';


const ApproveRiders = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch,data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {

            const res = await axiosSecure.get('/riders');
            return res.data;


        }


    });

    const handleUpdateRiderStatus =(rider,status) => {

        const updateInfo={status: status, email: rider.email}
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
         .then(res=>{

            refetch()

            if(res.data.modifiedCount){

                Swal.fire(`Riders has been ${status}! Congrats...`);

            }

         })

    }

    const handleApproval=rider=>{
        handleUpdateRiderStatus(rider,'approved')
    }

    const handleRejection=rider=>{
        handleUpdateRiderStatus(rider,'rejected')
    }


    // const handleReject=id=>{
    //     const rejectInfo={status:'reject'}
    //     axiosSecure.patch(`/riders/:id`,rejectInfo)
    //       .then(res.data.modifiedCount){

    //       }
    // }


    return (
        <div>
            <h1>Riders Pending Approval: {riders.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Application Status</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            riders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <th>{index + 1}</th>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.ridersDistrict}</td>
                                    <td>
                                        
                                        {
                                            <p className={`${rider.status==='approved'? 'text-green-800':'text-red-500'}`}>{rider.status}</p>
                                        }
                                        
                                    </td>
                                    <td>{rider.workStatus}</td>
                                    <td><button onClick={()=>handleApproval(rider)} className='btn btn-secondary'><FaCircleCheck /></button></td>
                                    <td><button onClick={()=>handleRejection(rider)} className='btn btn-secondary'><FcCancel /></button></td>
                                    <td><button className='btn btn-secondary'><FaTrash color='' /></button></td>
                                  
                                    
                                    

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;