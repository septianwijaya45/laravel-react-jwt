import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

const DefaultLayout = () => {
  const { user, setUser, token, setToken, notification } = useStateContext();

  if(!token){
    return <Navigate to="/login" />
  }

  const onLogout = (ev) => {
      ev.preventDefault();

      axiosClient.post("/logout").then(() => {
          setUser({});
          setToken(null);
      });
  };

  useEffect(() => {
      axiosClient.get("/user").then(({ data }) => {
          setUser(data);
      });
  }, []);

  return (
      <div>
          <div id="defaultLayout">
              <aside>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/users">Users</Link>
              </aside>
              <div className="content">
                  <header>
                      <div>Header</div>

                      <div>
                          {user.name} &nbsp; &nbsp;
                          <a onClick={onLogout} className="btn-logout" href="#">
                              Logout
                          </a>
                      </div>
                  </header>
                  <main>
                      <Outlet />
                  </main>
                  {notification && (
                      <div className="notification">{notification}</div>
                  )}
              </div>
          </div>
      </div>
  );
}

export default DefaultLayout