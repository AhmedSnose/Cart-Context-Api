import React, { useEffect, useState , useContext } from 'react'
import CardUI from '../UI/CardUI'
import LoadingSpinner from '../UI/LoadingSpinner'
import ctx from '../store/cart-context'
import {auth} from '../firebase/firebase-config'
import {onAuthStateChanged } from 'firebase/auth'
import {axios} from "../store/axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  const [items , setItems] = useState([])
  const [isLoading , setIsLoading] = useState(true)
  const {dataItems , add , inCart} = useContext(ctx)
  const [user , setUser] = useState({})
  const notify = () => toast.success("You add Item!");

  // Work As useEffect
  onAuthStateChanged(auth , (currentUser)=>{
    setUser(currentUser)
  })

  const clickBtn = (item)=>{
    notify('you Add item')
    add({
      id:item.id,
      name:item.name,
      price:item.price,
      url:item.url,
      amount:item.amount
    })
  }



  // console.log(dataItems , "data");

  // useEffect(()=>{
  //     setItems(dataItems)
  //     setIsLoading(false)
  //     // console.log(dataItems);
  //   },[dataItems])
  
    
    const products = items.map((item)=>{
      return <CardUI key={item.id} item={item} clickBtn={clickBtn} isCartPage={false} isUser={Boolean(user?.email)}/>
    })
  
    useEffect( async ()=>{
      const res = await axios.get('https://fb-clone-1c671-default-rtdb.firebaseio.com/items.json').catch(err=>console.log(err))
      const data = await res.data
      setItems(data)
      setIsLoading(false)
      // console.log(data);
    },[])

    

  if (isLoading){
    return <LoadingSpinner />
  }
  return (
    <div>
      <ToastContainer/>
        <h3 className='text-center'>Products</h3>
        <div className='flex justify-evenly flex-wrap'>
        {products}
        </div>
    </div>
  )
}

export default Home

// https://www.youtube.com/watch?v=35lXWvCuM8o&ab_channel=DevEd