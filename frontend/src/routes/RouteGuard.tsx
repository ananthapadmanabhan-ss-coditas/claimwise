import { Navigate, Outlet } from "react-router-dom";

type ROLE="CLAIMANT"|"ADJUSTER"|"ADMIN"

const RouteGuard=({allowedRoles}:{allowedRoles?:ROLE[]})=>{
  
  //API CALL FOR GET USER
  // if(isLoading)
  //   return <Loader/>
 
  // if(!data || isError)
  //   return <Navigate to={"signin"} replace/>  

  // if(allowedRoles && !allowedRoles.includes(data.role)){
  //   return <Navigate to={"unauthorized"} replace/>
  // }
  
  return <Outlet/>
}

export default RouteGuard