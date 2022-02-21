import React , {useContext , useState} from 'react'
import { ShoppingCartIcon , MenuIcon} from '@heroicons/react/outline'

import { Link } from "react-router-dom";
import ctx from '../store/cart-context'
import {auth} from '../firebase/firebase-config'
import {onAuthStateChanged , signOut} from 'firebase/auth'


function Nav() {
  const [user , setUser] = useState({})
  const {inCart} = useContext(ctx)
  // console.log(inCart , "inCart");
  const numberOfCartItems = inCart?.reduce((acc , item)=>{
    return acc + item.amount;
  }, 0)

  // work as useEffect
  onAuthStateChanged(auth , (currentUser)=>{
    setUser(currentUser)
  })

  const logOutHandler = async () =>{
    await signOut(auth)
  } 

  return (
    <div className='w-full h-30 bg-slate-500  left-0 flex text-white'>
        <h4 className='hidden m-6 font-bold lg:block md:block'>{user?.email && user?.email} {!user?.email && 'Logo'}</h4>
        <ul className='flex flex-wrap justify-evenly ml-auto list-none space-x-3 space-y-3 md:space-x-6'> {/* ------- space-y-3 */}
            <Link to='/' className='mt-3 cursor-pointer hover:text-gray-300 no-underline text-white'>
              Home
            </Link>
            {user?.email && <Link onClick={logOutHandler} to='/' className='cursor-pointer hover:text-gray-300 no-underline text-white'>
              Log Out
            </Link>}
            {!user?.email && <Link to='/SignUp' className='cursor-pointer hover:text-gray-300 no-underline text-white'>
              sign up
            </Link>}
            {!user?.email && <Link to='/SignIn' className='pr-3 cursor-pointer hover:text-gray-300 no-underline text-white'>
              sign in
            </Link>}
            {user?.email && <Link to='/Cart' className='flex justify-between flex-col cursor-pointer hover:text-gray-300 no-underline text-white'>
                <ShoppingCartIcon  className='w-5 mr-5'/>
                <span className='font-sans font-bold text-sm'>{numberOfCartItems}</span>
            </Link>}
        </ul>
    </div>
  )
}

export default Nav