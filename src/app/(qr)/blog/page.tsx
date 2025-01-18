import BlogCard from '@/components/qr-code/blog/BlogCard'
import { Title } from '@/components/title/Title'

const blogPosts = [
  {
    title: 'Cómo usar códigos QR en tu negocio',
    description: 'Descubre las múltiples formas en que los códigos QR pueden impulsar tu negocio y mejorar la experiencia del cliente.',
    slug: 'usar-codigos-qr-en-negocio',
    publishDate: '18 de enero, 2025',
    readTime: 3
  },
  {
    title: 'Ideas creativas para aprovechar códigos QR',
    description: 'Explora ideas innovadoras y creativas para integrar códigos QR en tu estrategia de marketing y comunicación.',
    slug: 'ideas-creativas-codigos-qr',
    publishDate: '18 de enero, 2025',
    readTime: 4
  },
  {
    title: 'Los mejores consejos para generar tráfico con códigos QR',
    description: 'Aprende técnicas efectivas para aumentar el tráfico a tu sitio web y redes sociales utilizando códigos QR estratégicamente.',
    slug: 'generar-trafico-codigos-qr',
    publishDate: '18 de enero, 2025',
    readTime: 3
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Title title='Blog' subtitle='' className='w-full px-4' />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl font-bold text-gray-800 mb-8">Últimas publicaciones</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </main>
    </div>
  )
}
