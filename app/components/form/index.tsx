'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../input'

const SignUpForm = () => {
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // handleSubmit
    e.preventDefault()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;
      default:
        console.log('incorrect input name handle')
        break;
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
        <Input type={'text'} handleChange={handleChange} value={username} name='username' label={'Username'} />
        <Input type={'text'} handleChange={handleChange} value={firstName} name='firstName' label={'First Name'} />
        <Input type={'text'} handleChange={handleChange} value={lastName} name='lastName' label={'Last Name'} />
        <Input type={'email'} handleChange={handleChange} value={email} name='email' label={'Email'} />
        <Input type={'password'} handleChange={handleChange} value={password} name='password' label={'Password'} />
        <Input type={'password'} handleChange={handleChange} value={confirmPassword} name='confirmPassword' label={'Confirm Password'} />
        <button type='submit' className='btn btn-ghost'>Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm
