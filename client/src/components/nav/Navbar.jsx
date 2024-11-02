import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { UserContext } from '../../context/UserContext';
import LogoImage from '../../assets/images/logos/wdbt-black.svg';
// Context
import { useModalContext } from '../../context/ModalContext';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { toggleNavigation, toggleNavbarOpenClosed } = useModalContext();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    toggleNavbarOpenClosed();
    setUser({});
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
    navigate('/', { replace: true });
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/design', label: 'Design' },
    { path: '/library', label: 'Library' },
    { path: '/device-configuration', label: 'Config' },
    ...(user?.email
      ? [{ path: '/admin', label: 'Admin' }]
      : [
          { path: '/login', label: 'Login' },
          { path: '/sign-up', label: 'Sign Up' },
        ]),
  ];

  return (
    <nav className='h-full relative z-30 grid grid-cols-reg bg-main-colour py-2 border-b-2 border-solid border-black'>
      {/* Logo Section */}
      <section className='grid items-center justify-center pl-4'>
        <Link className='no__highlights' to='/'>
          <img
            className='w-10 no__highlights h-10'
            src={LogoImage}
            alt='Logo'
          />
        </Link>
      </section>

      {/* Mobile Nav Toggle */}
      <section
        onClick={toggleNavbarOpenClosed}
        className='grid items-center justify-end lg:hidden no__highlights pr-4 cursor-pointer'
      >
        <IoMdMenu className='w-10 h-10 text-black hover:text-hover-grey' />
      </section>

      {/* Main Navigation */}
      <section className='hidden lg:grid justify-end'>
        <ul className='grid grid-flow-col items-center w-fit justify-end gap-4 font-semibold pr-4'>
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `hover:text-colour5 active:scale-95 ${
                    isActive ? 'text-colour1' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
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

      {/* Mobile Navigation */}
      {toggleNavigation && (
        <nav className='absolute lg:hidden w-full left-0 top-24 py-2 px-4'>
          <div className='bg-black nav__bg p-2 rounded'>
            <ul className='text-center grid bg-black h-fit w-full text-xl'>
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black ${
                        isActive
                          ? 'bg-yellow-700 text-gray-800 font-semibold'
                          : 'bg-yellow-500'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
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
      )}
    </nav>
  );
}

export default Navbar;
