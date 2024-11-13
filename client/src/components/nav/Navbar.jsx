import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// Icons
import { IoMdMenu } from 'react-icons/io';
// Images
import LogoImage from '../../assets/images/logos/logo (3).png';
// Context
import { useModalContext } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import { HOME_PAGE_URL } from '../../utils/Constants';
import useNavigateToPage from '../hooks/useNavigateToPage';

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
    { path: '/', label: 'Home' },
    { path: '/design', label: 'Design' },
    { path: '/library', label: 'Library' },
    { path: '/device-configuration', label: 'Config' },
    ...(user?.email
      ? [
          ...(user.role === 'ADMIN' || user.role === 'DEVELOPER'
            ? [{ path: '/admin', label: 'Admin' }]
            : []),
        ]
      : [
          { path: '/login', label: 'Login' },
          { path: '/sign-up', label: 'Sign Up' },
        ]),
  ];

  return (
    <nav className='relative h-full grid grid-cols-reg px-3 bg-main-colour py-3 border-b-2 border-solid border-black'>
      {/* Logo Section */}
      <section className='grid items-center justify-center'>
        <NavLink to={HOME_PAGE_URL}>
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
        </NavLink>
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

        {/* Main Navigation */}
        <section className='hidden lg:grid justify-end'>
          <ul className='grid grid-flow-col items-center w-fit justify-end gap-4 font-semibold pr-4'>
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

        {/* Phone navbar */}
        <div
          className={`phone-nav absolute top-full left-0 w-full bg-colour2 transition-transform duration-300 ${
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
      </section>
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
