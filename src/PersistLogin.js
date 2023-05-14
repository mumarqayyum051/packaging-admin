import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from './components/Loader';
import useAuth from './hooks/useAuth';

const PersistLogin = () => {
  const { isAuthenticated, setIsAuthenticated, setUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = {};
        console.log({ response });
        setUser(response.data.data);
        setIsAuthenticated(true);
        // _setToken(response.data.token);
      } catch (error) {
        console.log(error);
        setUser({});
        setIsAuthenticated(false);
        // _destroyToken();
      } finally {
        setIsLoading(false);
      }
    };
    //   -disable-next-line no-unused-expressions
    !isAuthenticated ? verifyToken() : setIsLoading(false);
  }, []);
  useEffect(() => {
    console.log({ isAuthenticated });
    console.log({ user });
    console.log({ isLoading });
  }, [isLoading]);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
