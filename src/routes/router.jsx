import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Coverage from "../pages/coverage/Coverage";
import AboutUs from "../pages/abousUs/AboutUs";
import ErrorPage from "../pages/errorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Registration from "../pages/Auth/registration/Registration";
import CoverageUS from "../pages/coverage/CoverageUS";
import BeARider from "../pages/beARider/BeARider";
import PrivateRoute from "./PrivateRoute";
import SendAParcel from "../pages/SendAPercel/SendAParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/MyParcels/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/MyParcels/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/MyParcels/Payment/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries";
import RiderRoutes from "./RiderRoutes";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            index:true,
            Component:Home
        },

        {
           path:'coverage',
           Component:Coverage,
           loader:()=>fetch('/warehouses.json').then(res=>res.json())

        },

        {

          path: 'parcel-track/:trackingId',
          Component:ParcelTrack

        },

        {
           path:'coverageUS',
           Component:CoverageUS,
           loader:()=>fetch('/usWareHouses.json').then(res=>res.json())

        },

        {
          path:'aboutUs',
          Component:AboutUs
        },

        {
          path:'sendAParcel',
          element:<PrivateRoute><SendAParcel></SendAParcel></PrivateRoute>,
          loader:()=>fetch('/warehouses.json').then(res=>res.json())
        },


        {
          path:'beARider',
          element:<PrivateRoute><BeARider></BeARider></PrivateRoute>,
          loader:()=>fetch('/warehouses.json').then(res=>res.json())
        },

        

        
    ],

    
  },

  {

    path:'/',
    Component:AuthLayout,
    children:[
      {
        path:'login',
        Component:Login,
        
      },

      {
        path:'registration',
        Component:Registration
      }
    ]

  },

  {

    path:'dashboard',
    element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:[

      {

        index:true,
        Component:DashboardHome

      },

      {
        path:'my-parcels',
        Component:MyParcels
      },

      {
        path:'payment/:id',
        Component:Payment

      },

      {
        path:'payment-success',
        Component:PaymentSuccess

      },

      {
        path:'payment-cancelled',
        Component:PaymentCancel
      },

      {
        path:'payment-history',
        Component:PaymentHistory
      },

      {
        path:'approve-riders',
        Component:ApproveRiders
        //element:<AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
      },

      {
        path:'users-management',
        Component:UsersManagement
        //element:<AdminRoute><UsersManagement></UsersManagement></AdminRoute>
      },

      {
        path:'assign-riders',
        element:<AssignRiders></AssignRiders>
      },

      {
        path:'assigned-deliveries',
        element:<RiderRoutes><AssignedDeliveries></AssignedDeliveries></RiderRoutes>
      },

      {
        path:'completed-deliveries',
        element:<RiderRoutes><CompletedDeliveries></CompletedDeliveries></RiderRoutes>
      },

      

      

    ]

  },

  

  {
            path:"/*",
            element:<ErrorPage></ErrorPage>
        }
]);


