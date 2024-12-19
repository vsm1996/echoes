'use client'

import React, { ChangeEvent, useState } from 'react'

interface InputProps {
  type: string,
  name: string,
  value: string | undefined,
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  label?: string,
  icon?: SVGElement,
}

const Input = ({ type, name, value, handleChange, label, icon }: InputProps) => {

  return (
    <label className='input input-bordered flex items-center gap-2 bg-white text-black'>
      {label && (<span>{label}</span>)}
      {icon && (<span>icon</span>)}
      <input type={type} onChange={(e) => handleChange(e)} value={value} name={name} />
    </label>
  )
}

export default Input
