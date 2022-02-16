import Ctx from './cart-context'
import { useReducer } from 'react';

const inCartFromlocalStorage = JSON.parse(localStorage.getItem('inCart'))
const TotalAmountFromlocalStorage = JSON.parse(localStorage.getItem('TotalAmount'))

const deafualtState = {
    inCart: inCartFromlocalStorage || [],
    TotalAmount: TotalAmountFromlocalStorage || 0,
}


const cartReducer = (state , action)=>{
    console.log(inCartFromlocalStorage ,TotalAmountFromlocalStorage , "ss");
    if(action.typy === 'ADD'){
        const updatedTotalAmount = state.TotalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.inCart?.findIndex(item=>item.id===action.item.id)

        const existingCartItem = state.inCart[existingCartItemIndex]

        let updatedItems;

        if(existingCartItem){
           const updatedItem = {...existingCartItem,
            amount : existingCartItem.amount + action.item.amount
        }
        updatedItems = [...state.inCart]
        updatedItems[existingCartItemIndex] = updatedItem  
     } 
        else {
            updatedItems = state.inCart.concat(action.item);
        }
        localStorage.setItem('inCart',JSON.stringify(updatedItems))
        localStorage.setItem('TotalAmount',JSON.stringify(updatedTotalAmount))

        return {
            inCart : updatedItems ,
            TotalAmount:updatedTotalAmount
        }
    }

    if(action.typy === 'REMOVE'){

        const existingCartItemIndex = state.inCart?.findIndex(item=>item.id===action.id)
        const existingCartItem = state.inCart[existingCartItemIndex]
        const updatedTotalAmount = state.TotalAmount - existingCartItem.price 
        let updatedItems;
        if(existingCartItem.amount === 1){
          updatedItems = state.inCart?.filter(item=> item.id !== action.id)
        } else {
            const updatedItem = {...existingCartItem,amount:existingCartItem.amount - 1 }
            updatedItems = [...state.inCart]
            updatedItems[existingCartItemIndex] = updatedItem  ;
        }
        localStorage.setItem('inCart',JSON.stringify(updatedItems))
        localStorage.setItem('TotalAmount',JSON.stringify(updatedTotalAmount))

        return {
            inCart : updatedItems ,
            TotalAmount:updatedTotalAmount
        }
    }

     return deafualtState
};
const CartProvider = (props)=>{

    const [CartStates , dispatchCartStatesAction] = useReducer(cartReducer , deafualtState);

    const addToCartHandler = (item) => {
        dispatchCartStatesAction({typy:"ADD" , item:item})
    }

    
    const removeFromCartHandler = (id) => {
        dispatchCartStatesAction({typy:"REMOVE" , id:id})

    }
        

    const cartContext = {

        inCart:CartStates.inCart,
        TotalAmount:CartStates.TotalAmount,

        add: addToCartHandler,
        remove:removeFromCartHandler,

    }

    return (
    <Ctx.Provider value={cartContext}>
        {props.children}
    </Ctx.Provider>
    )
}

export default CartProvider