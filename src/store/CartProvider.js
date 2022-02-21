import Ctx from './cart-context'
import CheckOutContext from './check-out-context'

import { useReducer } from 'react';

const inCartFromlocalStorage = JSON.parse(localStorage.getItem('inCart'))
const TotalAmountFromlocalStorage = JSON.parse(localStorage.getItem('TotalAmount'))

const deafualtState = {
    inCart: inCartFromlocalStorage || [],
    TotalAmount: TotalAmountFromlocalStorage || 0,
}


const cartReducer = (state , action)=>{
    // console.log(inCartFromlocalStorage ,TotalAmountFromlocalStorage , "ss");
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

    if(action.typy === 'REMOVE_ALL'){
       localStorage.removeItem('inCart')
       localStorage.removeItem('TotalAmount')
        return {
            inCart : [],
            TotalAmount:0,
        }
    }

     return deafualtState
};

// CheckOutContext 
const ChekOutDeafualtState ={isCheckOutOpen:false}

const CheckOutReducer =(state, action)=>{
    if(action.typy === 'toggle'){
        return {
            isCheckOutOpen:!state.isCheckOutOpen
        }
    }

}


const CartProvider = (props)=>{

    const [CartStates , dispatchCartStatesAction] = useReducer(cartReducer , deafualtState);

    const addToCartHandler = (item) => {
        dispatchCartStatesAction({typy:"ADD" , item:item})
    }

    
    const removeFromCartHandler = (id) => {
        dispatchCartStatesAction({typy:"REMOVE" , id:id})

    }
        
    const RemoveAllFromContext = ()=>{
        dispatchCartStatesAction({typy:"REMOVE_ALL"})
    }

    const cartContext = {

        inCart:CartStates.inCart,
        TotalAmount:CartStates.TotalAmount,

        add: addToCartHandler,
        remove:removeFromCartHandler,

        removeAll:RemoveAllFromContext,

    }

    //  CheckOutContext
    const [CheckOutState , dispatchCheckOutActions] = useReducer(CheckOutReducer , ChekOutDeafualtState);


    const dispatchActionIsCheckOutOpenHandler = ()=>{
        dispatchCheckOutActions({typy:'toggle'})
    }
    const CheckOutContextValue={
        isCheckOutOpen:CheckOutState.isCheckOutOpen,
        isCheckOutOpenHandler:dispatchActionIsCheckOutOpenHandler
    }

    return (
    <Ctx.Provider value={cartContext}>
        <CheckOutContext.Provider value={CheckOutContextValue}>
          {props.children}
        </CheckOutContext.Provider>
    </Ctx.Provider>
    )
}

export default CartProvider