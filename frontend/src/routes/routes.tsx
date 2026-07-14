import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import RouteGuard from "./RouteGuard";
import GeneralLayout from "../layouts/GeneralLayout/GeneralLayout";
import RoleRouter from "./RoleRouter";
import ClaimantLayout from "../layouts/ClaimantLayout/ClaimantLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import ViewUsersDashboard from "../pages/ViewUsersDashboard/ViewUsersDashboard";
import ClaimantPortal from "../pages/ClaimantPortal/ClaimantPortal";
import UnderDevelopment from "../components/feedback/UnderDevelopment/UnderDevelopment";
import UnauthorizedPage from "../pages/Unauthorized/Unauthorized";
import ViewClaim from "../features/claimant/components/ViewClaimant/ViewClaim";

export const routes=createBrowserRouter(
  [
    {
      path:"signin",
      Component:Login
    },
    {
      path:"unauthorized",
      Component:UnauthorizedPage
    },
    {
    element: <RouteGuard/>,
    children: [
      {
        path: "/",
        element: <GeneralLayout/>,
        children: [
          {
            index: true,
            element: <RoleRouter />,
          },
          {
            element: <RouteGuard allowedRoles={["CLAIMANT"]}/>,
            children: 
            [
              { 
                path: "portal/claimant",
                element: <ClaimantLayout/>,
                children: [
                  {
                    index: true,
                    element: <ClaimantPortal />,
                  },
                  {
                    path:"viewclaim/:id",
                    element:<ViewClaim/>
                  }
                ],
              },
            ],
          },
          {
            element:<RouteGuard allowedRoles={["ADMIN"]}/>,
            children:
            [
              {
                path:"portal/admin",
                element:<AdminLayout/>,
                children:
                [
                  {
                    index:true,
                    element:<Navigate to={"users"}/>
                  },
                  {
                    path:"users",
                    element:<ViewUsersDashboard/>
                  },
                  {
                    path:"assignments",
                    element:<UnderDevelopment/>
                  },
                  {
                    path:"categories",
                    element:<UnderDevelopment/>
                  }
                ]
              }
            ]
          }
        ],
      },
    ],
  },
  ])