import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  if (!token) {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
    <>
      <div id ="defaultLayout">
        <aside>
          <Link to ="/dashboard">Dashboard</Link>
          <Link to ="/users">Users</Link>
        </aside>

        <div className="content">

          <header>
            <div>
              Header
            </div>
            <div>
              {user.name}
              <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
            </div>
          </header>

          <main>
            Welcome User!
            <Outlet />
          </main>

          {
            notification &&
            <div className="notification">
              {notification}
            </div>
          }

        </div>

      </div>
    </>
  )
}
