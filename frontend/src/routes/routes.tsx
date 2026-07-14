import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import RouteGuard from "./RouteGuard";
import GeneralLayout from "../layouts/GeneralLayout/GeneralLayout";
import RoleRouter from "./RoleRouter";
import ClaimantLayout from "../layouts/ClaimantLayout/ClaimantLayout";
import ClaimantPortal from "../features/claimant/components/ClaimantPortal/ClaimantPortal";
import ViewClaim from "../features/claimant/components/ViewClaimant/ViewClaim";

export const routes=createBrowserRouter(
  [
    {
      path:"signin",
      Component:Login
    },
    {
      path:"unauthorized",
      
    },
    {
      Component:RouteGuard,
      children:
      [
        {
          path:"/",
          Component:GeneralLayout,
          children:
          [
            {
              index:true,
              Component:RoleRouter
            },
            //CLAIMANT SIDE
            {
              element:<RouteGuard allowedRoles={["CLAIMANT"]}/>,
              children:[
                {
                  Component:ClaimantLayout,
                  children:[
                    {
                      path:"/claimant/portal",
                      Component:ClaimantPortal,
                      children:[
                        {
                          path:"/viewclaim/:id",
                          Component:ViewClaim
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
)