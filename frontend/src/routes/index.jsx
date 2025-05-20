import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoutes } from "./AdminRoutes";
import Logout from "../pages/Logout"
import Connect from "../pages/Connect"
import Profile from "../pages/Profile";
import Admin from "../pages/Admin";
import OpsPage from "../pages/OpsPage";
import Update from "../pages/Update";

const Routes = () => {
    const { token, user} = useAuth()

    const authRoutesOnly = [
        { 
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <Profile />
                },
                {
                    path: "edit-info/:id",
                    element: <Update />
                },
                {
                    path: "/logout",
                    element: <Logout />
                },
                {
                    path: "*",
                    element: <OpsPage />
                }
            ]
        }
    ]

    const adminRoutesOnly = [
        {
            path: "/admin",
            element: <AdminRoutes />,
            children: [
                {
                    path: "",
                    element: <Admin />
                },
            ]
        }
    ]

    const nonAuthRoutesOnly = [
        {
            path: "/connect",
            element: <Connect />
        },
        {
            path: "*",
            element: <Connect />
        }
    ]

    const router = createBrowserRouter(token ? user?.isAdmin? [...authRoutesOnly, ...adminRoutesOnly] : authRoutesOnly : nonAuthRoutesOnly)

    return <RouterProvider router={router} />
}

export default Routes



