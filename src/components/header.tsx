import { aboutPath, postsPath } from '@/path'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

function header() {
  return (
      <div className='flex items-center justify-between'>
          <Link href="/" className='text-4xl font-extrabold'>Web Journal</Link>
          <div className='space-x-4'>
              <Link href={postsPath}>Posts</Link>
              <Link href={aboutPath}>About</Link>
      </div>
      <ModeToggle/>
    </div>
  )
}

export default header