import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import RouteGuard from "./RouteGuard";
import GeneralLayout from "../layouts/GeneralLayout/GeneralLayout";
import RoleRouter from "./RoleRouter";

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
            }
          ]
        }
      ]
    }
  ]
)