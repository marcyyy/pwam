import {createBrowserRouter} from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";

import Users from "./views/Users.jsx";
import UserForm from "./views/UserForm.jsx";
import Dashboard from "./views/Dashboard.jsx";

import NotFound from "./views/NotFound.jsx";

import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";


const router = createBrowserRouter([

    //logged in user
    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/',
                element: <Navigate to="/users" />
            },
            {
                path: '/users/',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },

    //guest user
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
        ]
    },

    //page not found
    {
        path: '*',
        element: <NotFound />
    },
])

export default router;