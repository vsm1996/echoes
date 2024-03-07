'use client'

import apiClient from '@/app/services/api-client';
import { CanceledError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let registerBody = {
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      username: usernameRef.current!.value,
    }

    apiClient
      .post('/register', registerBody)
      .then(res => {
        // console.log('res', res.data)
        setErrorMessage(null)
        router.push('/dashboard')
      })
      .catch(err => {
        if (err instanceof CanceledError) return
        // console.log(err.response.data.error)
        setErrorMessage(err.response.data.error)
      })
  }

  return (
    <div>
      {errorMessage && (<div onClick={() => setErrorMessage(null)} role="alert" className="alert alert-error cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errorMessage}</span>
      </div>)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <input ref={firstNameRef} id='firstName' type='text' placeholder='First Name' required />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <input ref={lastNameRef} id='lastName' type='text' placeholder='Last Name' required />
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input ref={usernameRef} id='username' type='text' placeholder='Username' required />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input ref={emailRef} id='email' type='email' placeholder='Email' required />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} id='password' type='password' placeholder='Password' required />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm