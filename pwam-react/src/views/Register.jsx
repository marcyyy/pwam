import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client.js';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import logo from '../assets/pw-logo2.png';

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCRef = useRef();

  const [errors, setErrors] = useState(null)
  const {setUser, setToken} = useStateContext()

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordCRef.current.value,
    }
    axiosClient.post('/register', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  /*return (
    <>
            <form onSubmit={onSubmit}>
                <h1 className='title'>Register</h1>
                {errors &&
                  <div className="alert">
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                }
                <input ref={nameRef} type='text' placeholder='Full Name' />
                <input ref={emailRef} type='email' placeholder='Email Address' />
                <input ref={passwordRef} type='password' placeholder='Passsword' />
                <input ref={passwordCRef} type='password' placeholder='Passsword Confirmation' />

                <button className='btn btn-block'>Signup</button>
                <p className='message'>
                    Already Registered? <br></br> <Link to="/login"> Login to your Account</Link>
                </p>
            </form>
    </>
  )*/

  return (
    <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={logo}
            alt="PrimeWater"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {errors &&
              <div className="alert">
                  {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                  ))}
              </div>
          }

          <form className="space-y-6" onSubmit={onSubmit}>

            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  ref={nameRef}
                  type="text"
                  autoComplete="full-name"
                  placeholder='Juan Dela Cruz'
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  placeholder='email@address.com'
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    ref={passwordRef}
                    autoComplete="current-password"
                    placeholder='********'
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    ref={passwordCRef}
                    placeholder='********'
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered? {' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Login to your Account
            </Link>
          </p>
        </div>
    </>
  )


}
