import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

    const{user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const{data: payments=[]}= useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async()=>{

            const res=await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;

        }
    })

    return (
        <div className='p-5'>
            <h1>Payment HIstory: {payments.length}</h1>
            

            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Number</th>
        <th>Transaction ID</th>
        <th>Tracking ID</th>
        <th>Amount</th>
        <th>Paid Time</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        payments.map((payment,index)=> <tr key={payment._id}>
        <th>{index+1}</th>
        <td>{payment.transactionId}</td>
        <td>{payment.trackingId}</td>
        <td>{payment.amount}</td>
        <td>{payment.paidAt}</td>
      </tr>)
     }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;