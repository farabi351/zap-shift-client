import React from 'react';
import Logo from '../../../components/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

  const { user, logOut } = useAuth();



  const handleLogout = () => {
    logOut()
      .then(res => {
        console.log(res);
        alert("You have been logged Out")
      })
      .catch(error => {
        console.log(error)
      })
  }

  const links = <>

    <li><NavLink to="">Services</NavLink></li>
    <li><NavLink to="/aboutUs">About Us</NavLink></li>
    <li><NavLink to="/sendAParcel">Send Parcel</NavLink></li>
    <li><NavLink to="/coverage">Coverage</NavLink></li>
    <li><NavLink to="/coverageUS">CoverageUS</NavLink></li>

    {
      user && <><li><NavLink to='/dashboard/my-parcels'>My Parcels</NavLink></li>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      </>
    }

    




  </>

  return (
    <div>

      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl"><Logo></Logo></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {
            user ? <div className='flex'><div className='flex'><button className='btn btn-circle mr-2'><img className='h-[20px] w-[20px] rounded-4xl' src={user?.photoURL} alt="" /></button><button className='btn'>{user?.displayName}</button></div><button className='btn btn-secondary' onClick={handleLogout}>Logout</button></div> : <Link className='btn btn-secondary' to='/login'>Sign in</Link>
          }

          <div className='flex ml-5'>

            <Link to="/beARider" className='btn btn-primary text-black'>Be a Rider</Link>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;