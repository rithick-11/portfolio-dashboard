import React from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (props) => {
    if(Cookies.get("user_token") === undefined){
        return <Navigate to="/login" />
    }
    return  <Outlet {...props} />
}

export default ProtectedRoute