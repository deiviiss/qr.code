'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FaBalanceScale } from 'react-icons/fa'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { IoAnalytics, IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoQrCodeOutline } from 'react-icons/io5'
import { logout } from '@/actions/auth/logout'
import { useUiStore } from '@/store/ui/ui.store'

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-primary opacity-10'>
            </div>
            {/* blur */}
            <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-secondary z-40 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* menú */}
        <div className='mt-16'>
          {
            !isAuthenticated
              ? (
                <>
                  <Link href='/'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                    <IoQrCodeOutline size={30} />
                    <span className='ml-3 text-xl'>Generar QR</span>
                  </Link>
                  <Link href='/blog'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                    <HiOutlineDocumentText size={30} />
                    <span className='ml-3 text-xl'>Blog</span>
                  </Link>
                  <Link href='/info/terms'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                    <FaBalanceScale size={25} />
                    <span className='ml-3 text-xl'>Términos y condiciones</span>
                  </Link>
                </>)
              : (
                <>
                  <Link href='/profile'
                    onClick={() => { closeMenu() }}
                    className='flex items-center mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                    <IoPersonOutline size={30} />
                    <span className='ml-3 text-xl'>Perfil</span>
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      closeMenu()
                      window.location.replace('/auth/login')
                    }}
                    className='flex items-center w-full mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                    <IoLogOutOutline size={30} />
                    <span className='ml-3 text-xl'>Salir</span>
                  </button>
                </>)
          }

          {/* divisor */}
          <div className="w-full h-px bg-gray-100 rounded transition-all mt-5"></div>
        </div>

        <Link href='/auth/login'
          onClick={() => { closeMenu() }}
          className='flex items-center mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
          <IoLogInOutline size={30} />
          <span className='ml-3 text-xl'>Ingresar</span>
        </Link>

        {
          isAdmin && (
            <>
              <Link href='/admin'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-5 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                <IoAnalytics size={30} />
                <span className='ml-3 text-xl'>Dashboard</span>
              </Link>
              <Link href='/admin/users'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-10 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                <IoPeopleOutline size={30} />
                <span className='ml-3 text-xl'>Usuarios</span>
              </Link>
            </>)
        }

      </nav >

    </div >
  )
}
