import React, { createContext, useContext, useEffect, useState } from 'react';
// Api
import client from '../api/client';
// Constants
import {
  CookiePolicyName,
  GET_LOGGED_IN_USER_API,
  HOME_PAGE_URL,
} from '../utils/Constants';
// Hooks
import useNavigateToPage from '../hooks/useNavigateToPage';
// Utils
import LoggedInUser from '../utils/LoggedInUser';

// Create the context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { navigateToPage } = useNavigateToPage();

  const [user, setUser] = useState({});
  const [hasAgreedToCookies, setHasAgreedToCookies] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ''
  );
console.log('user', user);
  useEffect(() => {
    const decodedUserData = LoggedInUser();

    if (decodedUserData !== null) {
      client
        .get(`${GET_LOGGED_IN_USER_API}/${decodedUserData.id}`, true)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error('Unable to retrieve user data', err);
        });
    }

    const cookie = localStorage.getItem(CookiePolicyName);

    if (cookie) {
      setHasAgreedToCookies(true);
    } else {
      setHasAgreedToCookies(false);
    }
  }, []);

  const signUserOut = () => {
    navigateToPage(HOME_PAGE_URL);
    setUser({});
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        hasAgreedToCookies,
        setHasAgreedToCookies,
        signUserOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
