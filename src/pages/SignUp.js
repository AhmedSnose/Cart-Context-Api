import React , {useState} from 'react'
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebase/firebase-config'
import LoadingSpinner from '../UI/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const history = useHistory();
  const [isLoading , setIsLoading] = useState(false)
  const notify = (message) => toast.error(message);
  const notifyDone = () => toast.success('You create a new account');


  const validate = values => {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (values.email.length < 4) {
      errors.email = 'Must be 5 characters or more'
    }
    if (!values.password) {
      errors.password = 'Required'
    }  else if (!(values.password.charAt(0) === values.password.charAt(0).toUpperCase())){
      errors.password = 'the first letter should be capital'
    } else if (values.password.length < 8) {
      errors.password = 'Must be 8 characters or more'
    } else if (values.password === '12345678') {
      errors.password = 'Must not be 12345678 !!!'
    }
    return errors
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true)
      // console.log(values);
      
      try{
        const user = await signInWithEmailAndPassword(auth , values.email , values.password)
        notifyDone()
        history.push("/");

      } catch (error) {
        console.log(error);
        // alert(error.message)
        notify(error.message)
        setIsLoading(false)

      }

      // Reset Form
      // setIsLoading(false)
      // navigate with route to Home Page
    }

  })

  if(isLoading){
    return <LoadingSpinner />
  }
  return (
    <div className='w-full max-w-xs flex flex-col justify-center m-auto '>
  <ToastContainer />
      <form onSubmit={formik.handleSubmit} className=' bg-white shadow-md rounded px-9 pt-9 pb-9 m-7'>

      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email Address</label>

      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        // ref={refEmail}
        />
      {formik.touched.email && formik.errors.email ? <div className=' text-red-500 text-xs italic error'>{formik.errors.email}</div> : null}
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        // ref={refPass}
        />
      {formik.touched.password && formik.errors.password ? <div className=' text-red-500 text-xs italic error'>{formik.errors.password}</div> : null}
      <button className='mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Log In</button>
      </form>
      <p className="text-center text-gray-500 text-xs">
       &copy;2022 6hmed . All rights reserved.
      </p>
    </div>
  )
}
