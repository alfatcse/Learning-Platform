import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({children}){
    const { user } = useSelector((state) => state.auth) || {};
    console.log(children);
    console.log('admin route');
    const isLoggedIn=useAuth();
    return (isLoggedIn&&user?.role==='admin')?<Navigate to={ '/admin'}></Navigate>:<Navigate to={ '/'}></Navigate>
}