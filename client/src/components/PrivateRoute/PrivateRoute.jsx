import React from 'react'
import useUserStore from '../../store/userStore'
import { checkObjectEmpty } from '../../utils/utilFunctions';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {

  const {user} = useUserStore();

  return (
    <div>
      {!checkObjectEmpty(user) ? <Outlet/> : <Navigate to={"/signin"}/>}
    </div>
  )
}

export default PrivateRoute
