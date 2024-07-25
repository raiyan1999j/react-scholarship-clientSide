import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import LoginPage from "./Component/User/LoginPage.jsx";
import Admin from "./Dashboard/Admin/Admin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddScholarship from "./Dashboard/AddScholarShip/AddScholarShip.jsx";
import ManageScholar from "./Dashboard/ManageScholarship/ManageScholar.jsx";
import ManageUser from "./Dashboard/ManageUser/ManageUser.jsx";
import Home from "./Component/Home/Home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllScholars from "./Component/AllScholars/AllScholars.jsx";
import Details from "./Component/Details/Details.jsx";
import Privet from "./Component/Privet/Privet.jsx";
import { publicRoute } from "./PublicRoute/PublicRoute.jsx";
import Payment from "./Component/Payment/Payment.jsx";
import MyApplication from "./Dashboard/User/MyApplication/MyApplication.jsx";
import MyReviews from "./Dashboard/User/MyReviews/MyReviews.jsx";
import ErrorHandle from "./ErrorHandle/ErrorHandle.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorHandle/>,
    children: [
      {
        path: "/loginPage",
        element: <LoginPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/allScholars",
        element: <AllScholars />,
      },
      {
        path: "/details/:id",
        element: (
          <Privet>
            <Details />
          </Privet>
        ),
        loader: ({ params }) => {
          return publicRoute(`/details/${params.id}`).then((res) => {
            return res.data;
          });
        },
      },
      {
        path: "/payment/:id",
        loader: ({ params }) => {
          return publicRoute(`/details/${params.id}`).then((res) => {
            return res.data;
          });
        },
        element: (
          <Privet>
            <Payment />
          </Privet>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement:<ErrorHandle/>,
    children: [
      {
        path: "/dashboard/profile",
        element:<Admin />,
      },
      {
        path: "/dashboard/addScholarShip",
        element: <AddScholarship />,
      },
      {
        path: "/dashboard/manageScholarship",
        element: <ManageScholar />,
      },
      {
        path: "/dashboard/manageUser",
        element: <ManageUser />,
      },
      {
        path: "/dashboard/myApplication",
        element: <MyApplication />,
      },
      {
        path: "/dashboard/myReviews",
        element: <MyReviews />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="max-w-[1440px] mx-auto">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
