import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({children}){
    const isLoggedIn=useAuth()
    return !isLoggedIn?children:<Navigate to={'/home'}></Navigate>
}