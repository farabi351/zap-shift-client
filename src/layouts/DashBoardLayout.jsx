import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaCreditCard, FaPeopleCarry, FaRocket } from "react-icons/fa";
import { MdHistoryToggleOff, MdOutlineElectricBike } from 'react-icons/md';
import { RiEBike2Fill } from "react-icons/ri";
import { GiFinishLine } from "react-icons/gi";
import { FaBridge, FaChampagneGlasses, FaFileLines, FaHandPointRight, FaUser } from 'react-icons/fa6';
import useRole from '../hooks/useRole';
import { FcShipped } from 'react-icons/fc';
import Logo from '../components/Logo';
import imgLogo from '../assets/logo.png'
const DashBoardLayout = () => {

  const { role } = useRole();
  console.log('in the dashboard layout', role);
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto border-blue-500 border-">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle inline" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost drawer-button">
            {/* Sidebar toggle icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}

            <li className='hover:bg-green-200'><Link to='/'><img className='h-[30px] mb-5' src={imgLogo} alt="" /></Link></li>


            <li>
              <NavLink to='/dashboard' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* our dashboard links */}

            <li className='mt-5'>
              <NavLink to='/dashboard/my-parcels' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="MyParcels"><FaRocket /><span className='is-drawer-close:hidden'>My Parcels</span></NavLink>
            </li>

            <li className='mt-5'>
              <NavLink to='/dashboard/payment-history' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="Payment History"><FaCreditCard /><span className='is-drawer-close:hidden'>Payment History</span></NavLink>
            </li>

            <li className='mt-5'>
              <NavLink to='/dashboard/approve-riders' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="Approve Riders"><RiEBike2Fill size={20} color='green' /><span className='is-drawer-close:hidden'>Approve Riders (only admin should see and approve)</span></NavLink>
            </li>

            <li className='mt-5'>

              {
                role === 'admin' && <NavLink to='/dashboard/users-management' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="Users Management"><FaUser size={20} color='pink' /><span className='is-drawer-close:hidden'>Users Management (only admin should see and approve)</span></NavLink>
              }
            </li>


            {/* riders only role */}
            <li className='mt-5'>
              {/* dhaka2020AA@ */}

              {
                role === 'rider' && <NavLink to='/dashboard/assigned-deliveries' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="Assigned Deliveries"><FaPeopleCarry size={30} color='gray' /><span className='is-drawer-close:hidden'>Assigned Deliveries</span></NavLink>
              }
            </li>

            <li className='mt-5'>
              {/* dhaka2020AA@ */}

              {
                role === 'rider' && <NavLink to='/dashboard/completed-deliveries' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="Completed Deliveries"><FcShipped FaSh size={30} color='pink' /><span className='is-drawer-close:hidden'>Completed Deliveries</span></NavLink>
              }
            </li>


            <li className='mt-5'>
              <NavLink to='/dashboard/assign-riders' className='is-drawer-close:tooltip is-drawer-close:tooltip-right' data-tip="Assign Riders"><FaHandPointRight size={30} color='green' /><span className='is-drawer-close:hidden'>Assign Riders</span></NavLink>
            </li>

            {/* List item */}
            {/* <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings"> */}
            {/* Settings icon */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span> */}
            {/* </button>
        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;