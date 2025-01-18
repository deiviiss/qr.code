import { initialData } from './seed'
import { countries } from './seed-countries'
import prisma from '../lib/prisma'

const main = async () => {
  // delete all data
  await prisma.orderItem.deleteMany()
  await prisma.orderAddress.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productAttributeValue.deleteMany()
  await prisma.attributeValueOption.deleteMany()
  await prisma.attribute.deleteMany()
  await prisma.userAddress.deleteMany()
  await prisma.country.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // seed categories
  const { users } = initialData

  // users
  await prisma.user.createMany({
    data: users
  })

  // countries
  await prisma.country.createMany({
    data: countries
  })

  // eslint-disable-next-line no-console
  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
}
)()
