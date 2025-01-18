import { redirect } from 'next/navigation'
import { getPaginatedUsers } from '@/actions/users/get-paginated-users'
import { Pagination } from '@/components/pagination/Pagination'
import { Title } from '@/components/title/Title'
import { CardUser } from '@/components/users/user-card/CardUser'
import { UsersTable } from '@/components/users/user-table/UsersTable'

export const revalidate = 0

type Params = Promise<{ page?: string }>

export default async function UsersPage({ params }: { params: Params }) {
  const page = parseInt((await params).page || '1')

  const { ok, users = [], totalPages } = await getPaginatedUsers({ page })

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" subtitle='Lista de todos los usuarios' />

      <div className='sm:hidden w-full flex flex-col gap-3 mb-10'>
        {
          users.map(user => (
            <CardUser
              key={user.id}
              user={user}
            />
          ))
        }
      </div>

      <div className="hidden sm:block mb-10 overflow-auto">
        <UsersTable users={users} />

      </div>
      <Pagination totalPages={totalPages || 1} />
    </>
  )
}
