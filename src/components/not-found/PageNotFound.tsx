import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const PageNotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div className="text-center px-10">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link href="/" className='font-normal hover:underline transition-all'>inicio</Link>
        </p>
      </div>
    </div>
  )
}
