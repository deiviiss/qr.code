'use client'

import Link from 'next/link'
import { ToogleDarkMode } from '../dark-mode/toogle-dark-mode/toogle-dark-mode'
import { Button } from '@/components/ui/button'
import { titleFont } from '@/config/fonts'
import { useUiStore } from '@/store/ui/ui.store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  return (
    <nav className="fixed-menu fixed top-0 min-[487px]:top-0 z-20 flex px-5 md:px-10 lg:px-20 justify-between items-center w-full border-b-[1px] border-primary bg-card">

      {/* logo */}
      <div>
        <Link href={'/'}>
          <span
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            Generador de Códigos QR
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-x-1 w-auto m-2 p-2">
        < ToogleDarkMode />
        <Button
          type="button"
          variant={'ghost'}
          onClick={openMenu}
          className={`${titleFont.className} text-lg`}
        >
          Menú
        </Button>
      </div >

    </nav >
  )
}
