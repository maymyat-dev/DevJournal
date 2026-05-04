import { ABOUT, POSTS } from '@/path'
import Link from 'next/link'

function header() {
  return (
      <div className='flex items-center justify-between'>
          <Link href="/" className='text-4xl font-extrabold'>Web Journal</Link>
          <div className='space-x-4'>
              <Link href={POSTS}>Posts</Link>
              <Link href={ABOUT}>About</Link>
          </div>
    </div>
  )
}

export default header