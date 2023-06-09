import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({children}){
    const { user } = useSelector((state) => state.auth) || {};
    const isLoggedIn=useAuth();
    return (isLoggedIn&&user?.role==='student')?children:<Navigate to={ '/'}></Navigate>
}