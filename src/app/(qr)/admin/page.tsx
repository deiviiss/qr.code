import { titleFont } from '@/config/fonts'

export default async function AdminPage() {
  return (
    <div className="">
      <h1 className={`${titleFont.className} text-4xl`}>Dashboard</h1>
      <p className='text-xl text-center'>Página protegida</p>
    </div>
  )
}
