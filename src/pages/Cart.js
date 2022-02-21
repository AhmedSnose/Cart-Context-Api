import React, { useContext, useState } from 'react'
import ctx from '../store/cart-context'
import BackDrop from '../UI/BackDrop';
import CardUI from '../UI/CardUI';
// import Button from '@mui/material/Button';
import CheckOutContext from '../store/check-out-context'
import emptyCart from '../assets/emptyCart.png'


const Cart = () => {

  const {inCart , TotalAmount , add ,remove , removeAll} = useContext(ctx)
  const displayedTotalAmount = `$${TotalAmount}`
  const hasItem = inCart.length > 0;
  const {isCheckOutOpen,isCheckOutOpenHandler} = useContext(CheckOutContext)

  const cartItemRemoveHandler = id => {
    remove(id)
  }

  const acrtItemAddHandler = item => {
    add({...item , amount: 1})
  }

  const SubmitOrderHandler = () =>{
    // setShowBackDrop(true)
    isCheckOutOpenHandler()
    console.log(isCheckOutOpen);
  }

  const RemoveHandler = ()=>{
    removeAll()
  }

  
  
  const cartItems = (
    <ul className='flex justify-around flex-wrap p-0'>
      {inCart.map((item) => (
        // <li key={Math.random()}>{item.name}</li>
         <CardUI 
         key={item.id} 
         item={item} 
         isCartPage={true} 
         onRemoveItem={cartItemRemoveHandler.bind(null , item.id)} 
         onAddItem={acrtItemAddHandler.bind(null , item)}/>

      ))}
    </ul>
  );

  return (
    <>
    
    {hasItem && (<>
      {cartItems}
      <hr />
      <div className='flex justify-around'>
        <span>Total Amount</span>
        <span>{displayedTotalAmount}</span>
      </div>

      <div className='flex justify-around py-10'>
        <button onClick={RemoveHandler} className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4'>Remove</button>
        <button onClick={SubmitOrderHandler} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'>Checkout</button>
      </div>

    </>
    )}
      {!hasItem && <img className='w-full h-[80vh] object-contain' src={emptyCart} />}
      {isCheckOutOpen && <BackDrop />}
    </>
  );
};

export default Cart;