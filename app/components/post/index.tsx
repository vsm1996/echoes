'use client'

import React from 'react'

interface User {
  name: string,

}

const Post = ({ post }: any) => {

  return (
    <div className='card bg-neutral shadow-xl mb-5 p-6'>
      <p>
        {post.message}
      </p>
      <p className='text-right'>
        {post.user.name || post.user.username}
      </p>
      <div>
        {post.likes}
      </div>
      {/* TODO - comments/replies */}
    </div>
  )
}

export default Post