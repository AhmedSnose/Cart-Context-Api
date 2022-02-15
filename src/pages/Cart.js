import React, { useContext } from 'react'
import ctx from '../store/cart-context'
import CardUI from '../UI/CardUI';

const Cart = (props) => {

  const {inCart , TotalAmount , add ,remove} = useContext(ctx)

  const displayedTotalAmount = `$${TotalAmount}`
  const hasItem = inCart.length > 0;

  const cartItemRemoveHandler = id => {
    remove(id)
  }

  const acrtItemAddHandler = item => {
    add({...item , amount: 1})
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
        <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Close</button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Order</button>
      </div>

    </>
    )}
      {!hasItem && <p> No Item Added</p>}
    </>
  );
};

export default Cart;