import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import LoginPage from './Component/User/LoginPage.jsx';
import Admin from './Dashboard/Admin/Admin.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import AddScholarship from './Dashboard/AddScholarShip/AddScholarShip.jsx';
import ManageScholar from './Dashboard/ManageScholarship/ManageScholar.jsx';
import ManageUser from './Dashboard/ManageUser/ManageUser.jsx';
import Home from './Component/Home/Home.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllScholars from './Component/AllScholars/AllScholars.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/loginPage',
        element:<LoginPage/>
      },
      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/allScholars',
        element:<AllScholars/>
      }
    ],
  },
  {
    path:'/dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:'/dashboard/profile',
        element:<Admin/>
      },
      {
        path:'/dashboard/addScholarShip',
        element:<AddScholarship/>
      },
      {
        path:'/dashboard/manageScholarship',
        element:<ManageScholar/>
      },
      {
        path:'/dashboard/manageUser',
        element:<ManageUser/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div className='max-w-[1440px] mx-auto'>
  
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
  
    <RouterProvider router={router}/>
  
  </AuthProvider>
  </QueryClientProvider>
  
  </div>
  </React.StrictMode>,
)
