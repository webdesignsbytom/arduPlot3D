import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// Icons
import { IoMdMenu } from 'react-icons/io';
// Images
import LogoImage from '../../assets/images/logos/logo (3).png';
// Context
import { useUser } from '../../context/UserContext';
// Constants
import {
  ADMIN_PAGE_URL,
  CONFIGURATION_PAGE_URL,
  HOME_PAGE_URL,
  LIBRARY_PAGE_URL,
  LOGIN_PAGE_URL,
  SIGN_UP_PAGE_URL,
  SIMULATION_PAGE_URL,
} from '../../utils/Constants';
// Hooks
import useNavigateToPage from '../../hooks/useNavigateToPage';

function Navbar() {
  const { user, setUser } = useUser();
  const { navigateToPage } = useNavigateToPage();
  
  const [isPhoneNavOpen, setIsPhoneNavOpen] = useState(false);

  const togglePhoneNav = () => {
    setIsPhoneNavOpen((prev) => !prev);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser({});
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
    navigateToPage(HOME_PAGE_URL, { replace: true });
  };

  const navItems = [
    { path: HOME_PAGE_URL, label: 'Home' },
    { path: SIMULATION_PAGE_URL, label: 'Design' },
    { path: LIBRARY_PAGE_URL, label: 'Library' },
    { path: CONFIGURATION_PAGE_URL, label: 'Config' },
    ...(user?.email
      ? [
          ...(user.role === 'ADMIN' || user.role === 'DEVELOPER'
            ? [{ path: ADMIN_PAGE_URL, label: 'Admin' }]
            : []),
        ]
      : [
          { path: LOGIN_PAGE_URL, label: 'Login' },
          { path: SIGN_UP_PAGE_URL, label: 'Sign Up' },
        ]),
  ];

  return (
    <nav
      role='navigation'
      aria-label='Main Navigation'
      className='relative bg-nav-background shadow-md'
    >
      <div className='grid grid-cols-reg px-4 py-4'>
        {/* Logo Section */}
        <section className='grid items-center justify-center pl-4'>
          <Link className='no__highlights' to={HOME_PAGE_URL}>
            <div className='flex'>
              <div>
                <img
                  className='w-10 no__highlights h-10'
                  src={LogoImage}
                  alt='Logo'
                />
              </div>
              <div className='grid items-center -ml-8 text-colour1 font-bold z-0'>
                <span className='text__stroke3 text-xl'>
                  <span className='text-3xl'>A</span>rduPlot3D
                </span>
              </div>
            </div>
          </Link>
        </section>

        <section className='grid justify-end'>
          {/* Mobile screen */}
          <button
            aria-label='Toggle navigation menu'
            onClick={togglePhoneNav}
            className='grid md:hidden w-fit h-fit items-center justify-center text-4xl text-white cursor-pointer'
          >
            <IoMdMenu className='active:scale-90 duration-300' />
          </button>

          {/* Large screen */}
          <ul className='hidden md:grid grid-flow-col gap-6 items-center text-orange-600'>
            {navItems.map(({ path, label }) => (
              <NavItem key={label} url={path} title={label} />
            ))}
            {user?.email && (
              <li>
                <button
                  className='hover:text-colour5 active:scale-95'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </section>
      </div>

      {/* Phone navbar */}
      <div
        className={`phone-nav absolute top-full left-0 w-full bg-nav-background transition-transform duration-300 ${
          isPhoneNavOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <ul className='grid gap-8 items-center justify-center text-center text-orange-600 py-10'>
          {navItems.map(({ path, label }) => (
            <NavItem key={label} url={path} title={label} />
          ))}
          {user?.email && (
            <li>
              <button
                className='w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

const NavItem = ({ url, title }) => {
  return (
    <li className='active:scale-90'>
      <NavLink
        to={url}
        aria-label={`${title} page navigation tab`}
        className='text-xl md:text-lg font-semibold font-poppins hover:brightness-90 duration-200 active:scale-75'
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
        style={({ isActive }) => {
          return isActive ? { color: '#f8fafc' } : {};
        }}
      >
        {title}
      </NavLink>
    </li>
  );
};

export default Navbar;
