import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import SelfOrAdminRoute from "./routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>)
  },
    {
        path: "/login",
        element: <SignIn />,
    },
  {
    path: "/users",
    element:(
        <ProtectedRoute>
            <Users />
        </ProtectedRoute>
    ),
  },
    {
        path: "/users/new",
        element:(
            <SelfOrAdminRoute>
                <UserEdit />
            </SelfOrAdminRoute>
        ),
    },
    {
    path: "/users/edit/:id",
      element:(
          <SelfOrAdminRoute>
              <UserEdit />
          </SelfOrAdminRoute>
      ),
  },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    }
]);

export default router;
