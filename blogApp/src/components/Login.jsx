import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from '../components'
import appWriteService from '../appwrite/configDatabase'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form' 

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [errors, setErrors] = useState(null);

    const login = async (data) =>{
        setErrors('');
        try {
            const session = await appWriteService.login(data);
            if(session) {
                const userData = await appWriteService.getCurrentUser();
                if(userData) {
                    dispatch(authLogin(userData));
                }
                navigate('/');
            }
        } catch (error) {
            setErrors(error.message);
        }
    }
  return (
    <div className='flex item-center justify-center w-full'>
     <div className='w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 mt-20 shadow-lg'>
        <div className='flex justify-center mb-6'>
            <span className='inline-block w-full '>
                 <Logo width="150px" />
            </span>
        </div>
        <h2 className='text-2xl font-bold text-center text-gray-700'>Login to your account</h2>
        <p  className='text-sm text-center text-gray-600'>
            Dont't have an account?
            <Link to='/signup' className='text-blue-600 hover:underline ml-1'>Sign up</Link>
        </p>
        {errors && <p className='text-red-500 mt-8 text-center'>{errors}</p>} 

        <form onSubmit={handleSubmit(login)} className='space-y-6 mt-8'>
            <div className='space-y-5 text-sm'>
                <label htmlFor='email' className='block text-gray-600'>Email</label>        
                <Input
                    type='email'
                    id='email'
                    placeholder='Enter your email'  
                    {...register('email', {
                         required: true,
                         pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                    })}
                />
            </div>
            <div className='space-y-5 text-sm'>
                <label htmlFor='password' className='block text-gray-600'>Password</label>        
                <Input
                    type='password'
                    id='password'
                    placeholder='Enter your password'  
                    {...register('password', { required: true,
                        validate:{
                            matchPattern:(value)=>
                            [
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
                                ].test(value) || "Email is not valid",
                        }
                        
                        })}
                />

                <input
                label="password"
                type='password'
                placeholder='Enter your password'
                className='w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
                {...register('password', { required: true,
                    minLength: {
                        value: 4,   
                        message: "Password must be at least 4 characters long"
                    }
                })}
                ></input>
                <button
                type='submit'
                className='w-full px-4 py-3 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 duration-200'
                
                >Sign in </button>
            </div>
            </form>
           
    </div>
    </div>
  )
}

export default Login