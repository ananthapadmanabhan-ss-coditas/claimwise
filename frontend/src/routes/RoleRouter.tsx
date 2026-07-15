import { Navigate } from "react-router-dom";
import Loader from "../components/feedback/Loader/Loader";
import { useMeQuery } from "../features/auth/services/authapi";

const RoleRouter=()=>{
 const {data,isLoading}=useMeQuery();
  if(isLoading)
    return <Loader/>
  if(!data)
    return <Navigate to={"signin"} replace/>
  if(data.role==="CLAIMANT")
    return <Navigate to={`portal/claimant`}/>
  if(data.role==="ADJUSTER")
    return <Navigate to={`portal/adjuster`}/>
  if(data.role==="ADMIN")
    return <Navigate to={`portal/admin`}/>
}

export default RoleRouter