import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {

    const [selectedParcel, setSelectedParcel] = useState(null);

    const axiosSecure = useAxiosSecure();

    const riderModalRef = useRef();

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {

            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;

        }
    })


    /////////....in the modal....///////////////

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.sendersDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.sendersDistrict}&workStatus=available`);
            console.log("Riders received:", res.data);
            return res.data;

        }
    })

    const openAssignRiderModal = parcel => {

        setSelectedParcel(parcel)

        //console.log(parcel.sendersDistrict);

        riderModalRef.current.showModal();

    }

    const handleAssignRider=rider=>{
        const riderAssignInfo={

            riderId:rider._id,
            riderEmail:rider.email,
            riderName:rider.name,
            parcelId:selectedParcel._id,
            trackingId:selectedParcel.trackingId

        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`,riderAssignInfo)
           .then(res=>{
              if(res.data.modifiedCount){
                riderModalRef.current.close();
                parcelsRefetch();
                Swal.fire("You have Assigned a rider!");
              }
           })
    }


    return (
        <div>
            <h1>Assign Riders {parcels.length}</h1>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>cost</th>
                            <th>Created At</th>
                            <th>Pickup Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.sendersDistrict}</td>

                                <td>
                                    <button onClick={() => openAssignRiderModal(parcel)} className='btn btn-primary text-black'>Assign Rider</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <dialog ref={riderModalRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Riders... {riders.length}</h3>
                    <p className="py-4"></p>

                    <div className="overflow-x-auto">
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {riders.map((rider, index) => (
                                    <tr
                                        key={rider._id}
                                        className="hover:bg-gray-100"
                                    >
                                        <th>{index + 1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>
                                            <button onClick={()=>handleAssignRider(rider)} className="btn btn-primary btn-sm text-black">
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>


                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;