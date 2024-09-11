import { useContext, useEffect, useState } from 'react';
import logo from '../public/logo.png';
import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { InfoContainer } from './AuthProvider/AuthProvider';
import Loader from './Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { publicRoute } from './PublicRoute/PublicRoute';
import Notification from './Component/Notification/Notification';
import { FaCcApplePay, FaCcMastercard, FaCcVisa, FaFacebookF, FaGithubAlt, FaLinkedinIn } from 'react-icons/fa';

export default function App(){
  const [navScroll,setNav] = useState(false);
  const [unseen,setUnseen] = useState(true);
  const [notifyCon,setNotify] = useState(false);
  const [supportNotify,setSupport] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {userLogout,loading,operator,user} = useContext(InfoContainer);

  const {isPending:notifyPending,error:notifyError,data:notifyData} = useQuery({
    queryKey:['getNotification',user?.email],
    queryFn:()=>{
      return publicRoute(`/getNotification?email=${user?.email}`)
      .then(res=>res.data)
    },
    refetchInterval:1000 * 30
  })
  const scrollChange=()=>{
    window.scrollY > 50? setNav(true) : setNav(false)
  }
  const loginPage=()=>{
    navigate('/loginPage')
  }

  const signOutUser=()=>{
    userLogout()
  }

  const notifyManage=(value)=>{
    setSupport(value)

    if(value){
      setNotify(value)
    }else{
      setTimeout(()=>{
        setNotify(value)
      },1000)
    }

    setUnseen(false);
  }

  useEffect(()=>{
    const clickHandler=(event)=>{
      if(supportNotify && !event.target.closest(".notificationBoard") && !event.target.closest(".notificationBtn")){
        setSupport(false)
      }
    }

    document.addEventListener('mousedown',clickHandler);

    return ()=>{document.removeEventListener('mousedown',clickHandler)}
  },[supportNotify])

  useEffect(()=>{
    window.addEventListener('scroll',scrollChange);

    return ()=>{
      window.removeEventListener('scroll',scrollChange)
    }
  },[])

  useEffect(()=>{
    navigate(location.pathname=="/"?"/home":location.pathname)
  },[])
  return(
    <>
      <header>
        <nav className={`h-[60px] w-[1200px] rounded-full ${navScroll?"bg-white transition-all duration-500":"bg-transparent transition-all duration-500"} shadow-lg shadow-gray-600 mx-auto flex flex-row items-center fixed top-4 z-50 left-[5.5%]`}>
          <div className='w-[10%] flex justify-center'>
            <div className='h-[40px] w-10'>
              <img src={logo} alt="logoImg" className='h-full w-full object-cover' />
            </div>
          </div>
          <div className='w-[70%] flex justify-center'>
            <ul className='flex flex-row justify-center w-[90%] font-semibold text-blue-950 capitalize'>
              <li className=''>
                <NavLink to="/home">
                  Home
                </NavLink>
              </li>
              <li className={`${user?"mx-auto":"ml-auto"}`}>
                <NavLink to="/allScholars">
                  All Scholarship
                </NavLink>
              </li>
              {
                user?<li>
                <NavLink to="/dashboard">
                  {operator}
                </NavLink>
              </li>:""
              }
            </ul>
          </div>
          <div className='w-[20%] flex items-center justify-around'>
          {
            loading? <div><Loader/></div>: 
            user?
            <div>
              <div className='h-10 w-10 rounded-full border relative hover:cursor-pointer notificationBtn' onClick={()=>{notifyManage(!supportNotify)}}>
                <img src={user?.photoURL} alt="profileImg" className='h-full w-full rounded-full object-cover absolute' />
              </div>
            </div>:""
          }
            <div>
            {
              user?
              <button className=' py-2 px-5 rounded-full border border-rose-500 bg-transparent hover:bg-rose-900 hover:opacity-80 hover:text-white transition-all duration-500 ease-in font-semibold text-blue-950' onClick={signOutUser}>
                Log out
              </button>
              :
              <button className=' py-2 px-5 rounded-full border border-green-500 bg-transparent hover:bg-green-700 hover:opacity-80 hover:text-white transition-all duration-500 ease-in font-semibold text-blue-950' onClick={loginPage}>
                Log in
              </button>
            }
            </div>
          </div>
        </nav>
        
        <div>
        {
          notifyCon?
          <Notification
          notifySupport={supportNotify}
          info={notifyData} />: ""
        }
          
        </div>

        <div className='h-[50px] w-[50px] border border-r-0 border-gray-400 fixed top-[50%] right-0 rounded-l-xl flex justify-center items-center'>
        <label className="swap swap-rotate">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox" className="theme-controller" value="sunset" />
  
  {/* sun icon */}
  <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  
  {/* moon icon */}
  <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label>
        </div>
      </header>

      <main>
        <Outlet/>
      </main>

      <footer className='paymentBackground'>
        <section className='w-full mx-auto mt-[250px] border border-b-0 border-r-0 border-l-0 border-t border-gray-400/5 pt-20'>
          <div className='flex flex-row w-[90%] mx-auto'>
            <div className='w-[38%]'>
              <div className='flex flex-row'>
                <div className='h-[40px] w-[40px]'>
                  <img src={logo} alt="logoImg" className='h-full w-full object-cover' />
                </div>
                <div>
                  <h2 className='text-4xl font-sans capitalize font-bold text-blue-900'>
                    study<span className='footerHeader'>abroad</span>
                  </h2>
                </div>
              </div>

              <div className='w-[90%] font-semibold text-base font-mono text-pretty text-slate-800 bg-sky-100/35 rounded-2xl my-8'>
                <p>
                Connect with global scholarship opportunities and apply to top universities abroad. We help students access funding and guidance for a brighter academic future
                </p>
              </div>
            </div>
            <div className='w-[38%]'>
              <h2 className='capitalize text-4xl font-sans font-bold text-blue-900'>
                add<span className='text-[#ee5253] lowercase'>ress</span>
              </h2>
              <div className='my-8 bg-sky-100/35 rounded-2xl text-slate-800 font-semibold font-mono w-[90%]'>
              <p>
                79/A,Mirpur-3,somajkollan road, Dhaka-1200
              </p>
              <div className='flex flex-row py-4'>
                <p className='mr-2'>
                  01735433906,
                </p>
                <p>
                  01866665158
                </p>
              </div>
              </div>
            </div>
            <div className='w-[20%]'>
              <h2 className='font-sans font-bold capitalize text-3xl text-blue-900'>
                so<span className='text-[#ee5253] lowercase'>cial</span> con<span className='text-[#ee5253] lowercase'>nects</span> 
              </h2>
              <ul className='flex flex-row my-8'>
                <a className='h-[40px] w-[40px] rounded-full flex justify-center items-center border border-slate-900 transition-all ease-linear duration-200 hover:cursor-pointer relative z-30 after:transition-all after:ease-linear after:duration-150 after:absolute after:h-0 after:w-0 after:rounded-full after:bg-blue-600 after:-z-30 hover:after:h-full hover:after:w-full hover:text-white hover:border-none hover:text-2xl' href='https://www.facebook.com/raiyan.raiyan.31/' target='blank'>
                <FaFacebookF />
                </a>
                <a className='h-[40px] w-[40px] rounded-full flex justify-center items-center border border-slate-900 transition-all ease-linear duration-200 hover:cursor-pointer relative z-30 after:transition-all after:ease-linear after:duration-150 after:absolute after:h-0 after:w-0 after:rounded-full after:bg-[#8395a7] after:-z-30 hover:after:h-full hover:after:w-full hover:text-white hover:border-none hover:text-2xl mx-6' href='https://github.com/raiyan1999j' target='blank'>
                <FaGithubAlt />
                </a>
                <a className='h-[40px] w-[40px] rounded-full flex justify-center items-center border border-slate-900 transition-all ease-linear duration-200 hover:cursor-pointer relative z-30 after:transition-all after:ease-linear after:duration-150 after:absolute after:h-0 after:w-0 after:rounded-full after:bg-sky-400 after:-z-30 hover:after:h-full hover:after:w-full hover:text-white hover:border-none hover:text-2xl' href='https://www.linkedin.com/in/raiyan-khan-756b52304/' target='blank'>
                <FaLinkedinIn />
                </a>
              </ul>
            </div>
          </div>
          <div className='flex flex-row justify-between items-center border border-black/15 border-r-0 border-l-0 border-b-0'>
            <div className='ml-[5%]'>
              <h2 className='capitalize font-sans font-bold text-blue-950'>all &#169; copyright reserve</h2>
            </div>
            <div className='flex flex-row mr-[5%]'>
              <span>
              <FaCcVisa className=' text-gray-400 text-4xl'/>
              </span>
              <span>
              <FaCcMastercard className=' text-gray-400 text-4xl mx-4'/>
              </span>
              <span>
              <FaCcApplePay className=' text-gray-400 text-4xl'/>
              </span>
            </div>
          </div>
        </section>
      </footer>
    </>
  )
}