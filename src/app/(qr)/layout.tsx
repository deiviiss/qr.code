import { Footer } from '@/components/footer/Footer'
import { NextProgress } from '@/components/next-progress/NextProgress'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { TopMenu } from '@/components/top-menu/TopMenu'

export default async function QrLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-col items-center justify-center mt-[68.67px] pt-5'>
      <TopMenu />
      <NextProgress />

      <Sidebar />
      {children}
      <Footer />
    </div>

  )
}
