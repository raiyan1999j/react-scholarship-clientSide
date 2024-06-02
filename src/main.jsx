import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import LoginPage from './Component/User/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/loginPage',
        element:<LoginPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div className='max-w-[1440px] mx-auto'>
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
  </div>
  </React.StrictMode>,
)
