'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

// A welcome section with inspirational messaging and a quick navigation to key features: Journaling, Transformation Logs, and Community.
// A visual hero banner that reflects artistic creativity and mindfulness.

const DashboardPage = () => {
  const { data: session } = useSession()

  return session && (
    <div className='min-h-screen'>
      <h1>Welcome,  {session && session?.user.firstName || 'creator'}</h1>
      <Link href='/api/auth/signout' className='btn btn-accent btn-hover btn-outline text-nowrap'>Sign Out</Link>
    </div>
  )
}

export default DashboardPage
