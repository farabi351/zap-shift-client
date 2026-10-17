import React, { Children } from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../components/Forbidden';

const AdminRoute = ({children}) => {

    const {user, loading}= useAuth();

    const {role,roleLoading}=useRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;