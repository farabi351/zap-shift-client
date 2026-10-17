import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCat, FaUserShield } from 'react-icons/fa6';
import { FiShieldOff } from "react-icons/fi";
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure();

    const [searchText,setSearchText] = useState('');

    const {refetch, data: users = [] } = useQuery({
        queryKey: ['users',searchText],
        queryFn: async () => {

            const res = await axiosSecure.get(`/users?searchText=${searchText}`);
            return res.data;

        }
    });


    const handleMakeUserAdmin=(user)=>{

        const roleInfo={role: 'admin'}

        axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
         .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                Swal.fire(`${user.displayName} is now Admin`);
            }
         })

    };


    const handleRemoveAdmin=(user)=>{

        const roleInfo={role: 'user'}

        axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
         .then(res=>{
            if(res.data.modifiedCount){
                refetch();
                Swal.fire(`${user.displayName} is removed from admin`);

            }
         })



    }



    return (
        <div>
            <h1 className='text-5xl p-4 text-center'>Users Management</h1>
            <h1 className='text-2xl my-5 px-6'>Number of Users:{users.length}</h1>
            <p>{searchText}</p>
            <input onChange={(e)=> setSearchText(e.target.value)} type="text" placeholder="Search by Name or Email" className="input ml-5 my-5" />


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Other Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        users.map((user,index)=> <tr>
                            <th>
                                
                            </th>
                            <td>{index+1}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user?.photoURL || <FaCat></FaCat>}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.displayName}</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                </div>
                            </td>
                            {/* <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td> */}
                            <td>{user.email}</td>
                            <td className='text-red-400'>{user.role}</td>
                            <th>

                                {
                                    user.role==='admin'?<button onClick={()=>handleRemoveAdmin(user)} className="btn btn-ghost btn-xs"><FiShieldOff color='red' size={30} /></button> : <button onClick={()=>handleMakeUserAdmin(user)} className="btn btn-ghost btn-xs"><FaUserShield  color='green' size='20'></FaUserShield></button>
                                }


                                
                               
                                
                            </th>

                            <td> <button className="btn btn-ghost btn-xs">details</button></td>
                        </tr>)
                       }
                       
                    </tbody>
                    {/* foot */}
                    
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;