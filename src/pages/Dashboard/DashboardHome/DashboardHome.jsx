import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import RiderDashboardHome from './RiderDashboardHome';
import UserDashboardHome from './UserDashboardHome';

const DashboardHome = () => {

    const {role,roleLoading}=useRole();

    if(roleLoading){
        return <Loading></Loading>
    }

    if(role==='admin'){
        return <AdminDashboardHome></AdminDashboardHome>
    }

    if(role=='rider'){
        return <RiderDashboardHome></RiderDashboardHome>
    }

    else{
        return <UserDashboardHome></UserDashboardHome>
    }





    
};

export default DashboardHome;<h1>DB ...Home</h1>