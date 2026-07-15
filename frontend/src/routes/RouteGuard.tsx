import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/feedback/Loader/Loader";
import { useMeQuery } from "../features/auth/services/authapi";

type ROLE="CLAIMANT"|"ADJUSTER"|"ADMIN"

const RouteGuard=({allowedRoles}:{allowedRoles?:ROLE[]})=>{
  
 
  const {data,isLoading,isError}=useMeQuery();

  if(isLoading)
    return <Loader/>
 
  if(!data || isError)
    return <Navigate to={"signin"} replace/>  

  if(allowedRoles && !allowedRoles.includes(data.role)){
    return <Navigate to={"unauthorized"} replace/>
    
  }
  return <Outlet/>
  
  return <Outlet/>
}

export default RouteGuard