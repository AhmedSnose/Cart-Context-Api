import  React ,{useState , useEffect} from "react";
import {axios} from "./axios";


export default function FireBaseData (){
const [item, setitem] = useState([]);

    useEffect(async ()=>{
        const res = await axios.get('https://fb-clone-1c671-default-rtdb.firebaseio.com/items.json').catch(err=>console.log(err))
        const data = await res.data
        setitem(data);

      }, []);
    
      if (!item) return null;
      
      return  item

}


