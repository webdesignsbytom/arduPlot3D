import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// API
import client from '../../api/client';
import LoadingSpinner from '../../components/utils/LoadingSpinner';
// Utils
import CountrySelect from '../../utils/CountrySelect';

function RegisterForm() {
  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    country: '',
    termsChecked: true,
  });
  const [registerError, setRegisterError] = useState(false);
  const [registrationFormData, setRegistrationFormData] = useState({
    active: false,
    success: false,
  });

  let navigate = useNavigate();

  const loginPage = () => {
    navigate('/login', { replace: true });
  };

  const handleSubmitRegisterForm = (event) => {
    event.preventDefault();

    setRegistrationFormData({
      ...registrationFormData,
      active: true,
    });

    client
      .post('/users/register', registerFormData, false)
      .then((res) => {
        setRegistrationFormData({
          ...registrationFormData,
          active: false,
          success: true,
        });
        setTimeout(() => {
          loginPage();
        }, 2000);
      })

      .catch((err) => {
        setRegisterError(true);
        console.error('Unable to register new user', err);
      });
  };

  const handleChange = (event) => {
    setRegisterError(false);
    const { name, value } = event.target;

    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleChecked = (event) => {
    setRegisterFormData({
      ...registerFormData,
      termsChecked: !registerFormData.termsChecked,
    });
  };
  return (
    <form className='text-center' onSubmit={handleSubmitRegisterForm}>
      <div className='mb-6'>
        <input
          type='text'
          className='form-control block w-full px-3 py-1.5 text-base font-normal text-colour5 bg-secondary-colour bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-colour5 focus:bg-secondary-colour focus:border-colour2 focus:outline-none'
          placeholder='Username'
          id='username'
          name='username'
          onChange={handleChange}
        />
      </div>
      <input
        type='email'
        id='email'
        name='email'
        className='form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-colour5 bg-secondary-colour bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-colour5 focus:bg-secondary-colour focus:border-colour2 focus:outline-none'
        placeholder='Email address'
        onChange={handleChange}
      />
      <input
        type='password'
        id='password'
        name='password'
        className='form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-colour5 bg-secondary-colour bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-colour5 focus:bg-secondary-colour focus:border-colour2 focus:outline-none'
        placeholder='Password'
        onChange={handleChange}
      />
      <input
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        className='form-control block w-full px-3 py-1.5 mb-6 text-base font-normal text-colour5 bg-secondary-colour bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-colour5 focus:bg-secondary-colour focus:border-colour2 focus:outline-none'
        placeholder='Password'
        onChange={handleChange}
      />
      <div className='mb-6'>
        <CountrySelect />
      </div>

      <div className='form-check flex justify-center mb-6'>
        <input
          className='form-check-input h-4 w-4 border border-gray-300 rounded-sm transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer checked:bg-colour2'
          type='checkbox'
          value=''
          id='termsChecked'
          name='termsChecked'
          checked
          aria-label='Agree to terms and conditions'
          style={{ accentColor: 'var(--colour2)' }} // Using `accent-color` here
          onChange={handleChecked}
        />
        <label
          className='form-check-label inline-block text-gray-800'
          htmlFor='termsChecked'
        >
          I agree to all terms and conditions.
        </label>
      </div>
      {/* Submit button */}
      <div>
        <button
          type='submit'
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
          className='inline-block px-6 py-2.5 mb-6 w-full bg-colour2 text-secondary-colour font-medium text-xs leading-tight uppercase rounded shadow-md hover:brightness-110 hover:shadow-lg focus:brightness-110 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'
        >
          {!registrationFormData.active && !registrationFormData.success && (
            <span>Sign Up</span>
          )}
          {registrationFormData.active && (
            <span className='flex items-center justify-center'>
              <LoadingSpinner width={'w-5'} height={'h-5'} />
            </span>
          )}
          {registrationFormData.success && <span>Success!</span>}
        </button>
      </div>

      {registerError && (
        <div className='text-center'>
          <span className='text-red-700 font-semibold'>REGISTER FAILED</span>
        </div>
      )}

      <p className='font-light text-gray-500 dark:text-gray-400'>
        Already a member?{' '}
        <Link
          to='/sign-up'
          className='font-medium text-colour2 hover:underline'
        >
          Login Now
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
