import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const SendAParcel = () => {

    const [price, setPrice] = useState([]);

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const axiosSecure = useAxiosSecure();

    const sendersRegion = useWatch({ control, name: 'sendersRegion' });

    const receiversRegion = useWatch({ control, name: 'receiversRegion' });


    const data = useLoaderData();

    const mapRegion = data.map(a => a.region);

    //console.log(mapRegion);

    const filterRepetitiveRegion = new Set(mapRegion);

    //console.log(filterRepetitiveRegion);

    const regionList = [...filterRepetitiveRegion];

    //console.log(regionList);



    const handleSendersDistrict = region => {
        const filterDistrict = data.filter(a => a.region === region);

        const mapTheDistrict = filterDistrict.map(b => b.district);

        return mapTheDistrict;
    }








    const handleSendParcel = (data) => {



        //console.log(data);

        const isDocument = data.parcelType === 'document';

        const isSameDistrict = data.sendersDistrict === data.receiversDistrict;

        const parcelWeight = parseFloat(data.parcelWeight);

        //console.log(sameDistrict);

        let cost = 0;

        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }

        else {

            if (parcelWeight < 3) {

                cost = isSameDistrict ? 100 : 150;

            }
            else {

                const NonDocumentInSameDistrict = isSameDistrict ? 100 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : (extraWeight * 40) + 40;

                cost = NonDocumentInSameDistrict + extraCharge;


            }

        }

        console.log('cost', cost, data);
        //setPrice(cost);

        data.cost = cost;

        console.log(cost);



        Swal.fire({
            title: "Are you sure?",
            text: "Please Confirm",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, I am Paying ${cost} Dollar!`
        }).then((result) => {
            if (result.isConfirmed){

                console.log(result);

                //save the parcel into database

                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving parcel', res.data);

                        Swal.fire({
                            title: "Paid Success!",
                            text: `Your have Paid ${cost} Dollar successfully.`,
                            icon: "success"
                        });
                    })

                    // .catch(err => {
                    //     console.error(err);
                    //     Swal.fire({
                    //         title: "Error",
                    //         text: "Something went wrong. Please try again.",
                    //         icon: "error"
                    //     });
                    // });

                }


        });






    }


    return (
        <div className='p-15'>
            <h1 className='text-5xl font-bold mb-5 text-secondary'>Send a Parcel</h1>
            <p className='font-bold text-xl my-5 text-secondary'>Enter your parcel details</p>

            <form onSubmit={handleSubmit(handleSendParcel)}>
                <div className='gap-5'>
                    <div className='flex flex-col md:flex-row'>
                        <div className='mr-5'>
                            <label className="label mr-2 text-black">Document</label>
                            <input type="radio" {...register('parcelType')} value='document' className="radio checked:bg-amber-50 checked:text-green-600" defaultChecked />


                        </div>

                        <div className='mr-5'>
                            <label className="label mr-2 text-black">Non Document</label>
                            <input type="radio" {...register('parcelType')} value='non-document' className="radio checked:bg-amber-50 checked:text-green-600" />


                        </div>


                    </div>




                    <div className='flex flex-col md:flex-row gap-10'>

                        <div>

                            <div>


                                <label className="label mt-5">Parcel Name</label>
                                <input type="text" {...register('parcelName')} className="input" placeholder="Parcel Name" />



                                <h1 className='my-10'>Senders Details</h1>

                                <div>
                                    <div className='gap-3 mb-5'>
                                        <label className="label">Senders Name</label>
                                        <input type="text" {...register('sendersName')} className="input" placeholder="Senders Name" />



                                    </div>

                                    <div className='gap-3 mb-5'>
                                        <label className="label">Senders Email</label>
                                        <input type="text" {...register('sendersEmail')} className="input" placeholder="Senders Email" />



                                    </div>

                                    <div className='gap-3 mb-5'>
                                        <label className="label">Senders Address</label>
                                        <input type="text" {...register('sendersAddress')} className="input" placeholder="Senders Address" />

                                    </div>

                                    <div className='gap-3 mb-5'>
                                        <label className="label">Senders Contact No.</label>
                                        <input type="text" {...register('sendersContactNo')} className="input" placeholder="Senders Phone No" />

                                    </div>

                                    <h1 className='mt-3'>Senders Region</h1>
                                    <select {...register('sendersRegion')} defaultValue="Pick a Division" className="select">
                                        <option disabled={true}>Pick a Division</option>
                                        {
                                            regionList.map(a => <option value={a} key={a}>{a}</option>)
                                        }

                                    </select>

                                    <h1 className='mt-3'>Senders District</h1>
                                    <select {...register('sendersDistrict')} defaultValue="Pick a District" className="select">
                                        <option disabled={true}>Pick a District</option>
                                        {
                                            handleSendersDistrict(sendersRegion).map(a => <option value={a} key={a}>{a}</option>)
                                        }

                                    </select>













                                    <div className='flex flex-col gap-3 mb-5'>
                                        <label className="label">Pickup Instruction</label>
                                        <input type="text" {...register('sendersPickUpInstruction')} placeholder="Pickup Instruction" className="input md:h-[100px] md:w-[400px]" />
                                    </div>

                                </div>
                            </div>



                        </div>


                        <div>

                            <div>

                                <label className="label mt-5">Parcel Weight (Kg)</label>
                                <input type="text" {...register('parcelWeight')} className="input" placeholder="Parcel Weight" />




                                <h1 className='my-10'>Receivers Details</h1>

                                <div>
                                    <div className='gap-3 mb-5'>
                                        <label className="label">Receiver Name</label>
                                        <input type="text" {...register('receiversName')} className="input" placeholder="Receiver Name" />

                                    </div>

                                    <div className='gap-3 mb-5'>
                                        <label className="label">Receiver Email</label>
                                        <input type="text" {...register('receiversEmail')} className="input" placeholder="Receiver Email" />

                                    </div>

                                    <div className='gap-3 mb-5'>
                                        <label className="label">Receiver Address</label>
                                        <input type="text" {...register('receiversAddress')} className="input" placeholder="Receivers Address" />

                                    </div>

                                    <div className='gap-3 mb-5'>
                                        <label className="label">Receiver Contact No.</label>
                                        <input type="text" {...register('receiversContact')} className="input" placeholder="Sender Contact No." />
                                    </div>

                                    {/* Receivers region */}
                                    <h1>Receivers Region</h1>
                                    <select {...register('receiversRegion')} defaultValue="Pick a Region" className="select">
                                        <option disabled={true}>Pick a color</option>
                                        {
                                            regionList.map(a => <option value={a} key={a}>{a}</option>)
                                        }

                                    </select>

                                    {/* senders districts */}
                                    <h1 className='mt-3'>Receivers District</h1>
                                    <select {...register('receiversDistrict')} defaultValue="Pick a District" className="select">
                                        <option disabled={true}>Pick a District</option>
                                        {
                                            handleSendersDistrict(receiversRegion).map(a => <option value={a} key={a}>{a}</option>)
                                        }

                                    </select>


                                    <div className='flex flex-col gap-3 mb-5'>
                                        <label className="label">Delivery Instruction</label>
                                        <input type="text" {...register('receiversDeliveryInstruction')} placeholder="Delivery Instruction" className="input md:h-[100px] md:w-[400px]" />
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <h1>Your Price: {price}</h1>

                    <h1>Pickup Time 4PM-7PM Approx. </h1>



                    <input className='btn btn-secondary' type="submit" value="Send Parcel" />








                </div>
            </form>



        </div>
    );
};

export default SendAParcel;