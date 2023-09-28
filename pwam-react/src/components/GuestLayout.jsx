import React from 'react'
import {Outlet} from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function GuestLayout() {
  const { token} = useStateContext()

  if(token){
    return <Navigate to="/"/>
  }

  return (
    <>
    <div className="flex min-h-screen flex-col justify-center px-12 md:pb-12">
      <div className=''>
        
        <Outlet />

        </div>
      </div>
    </>
  )
}
