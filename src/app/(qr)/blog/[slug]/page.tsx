import Link from 'next/link'
import ArticleContent from '@/components/qr-code/blog/article-content/ArticleContent'
import { Title } from '@/components/title/Title'

const blogPosts = {
  'usar-codigos-qr-en-negocio': {
    title: 'Cómo usar códigos QR en tu negocio',
    imageUrl: '/imgs/1.png?height=400&width=800',
    publishDate: '18 enero, 2025',
    readTime: 3,
    sections: [
      {
        type: 'text',
        content: 'Los códigos QR se han convertido en una herramienta poderosa para los negocios en la era digital. Aquí te explicamos cómo puedes aprovecharlos:'
      },
      {
        type: 'header',
        content: '1. Menús digitales'
      },
      {
        type: 'text',
        content: 'Coloca códigos QR en las mesas de tu restaurante para que los clientes accedan a menús digitales actualizados.'
      },
      {
        type: 'header',
        content: '2. Información de productos'
      },
      {
        type: 'text',
        content: 'Añade códigos QR a tus productos para proporcionar información detallada, videos demostrativos o reseñas de clientes.'
      },
      {
        type: 'header',
        content: '3. Pagos sin contacto'
      },
      {
        type: 'text',
        content: 'Facilita los pagos móviles utilizando códigos QR vinculados a plataformas de pago digital.'
      },
      {
        type: 'text',
        content: 'Implementar códigos QR en tu negocio puede mejorar la experiencia del cliente y aumentar la eficiencia operativa. ¡Comienza hoy mismo!'
      }
    ]
  },
  'ideas-creativas-codigos-qr': {
    title: 'Ideas creativas para aprovechar códigos QR',
    imageUrl: '/imgs/2.png?height=400&width=800',
    publishDate: '18 enero, 2025',
    readTime: 5,
    sections: [
      {
        type: 'text',
        content: 'Los códigos QR ofrecen infinitas posibilidades creativas. Aquí tienes algunas ideas innovadoras:'
      },
      {
        type: 'header',
        content: '1. Arte interactivo'
      },
      {
        type: 'text',
        content: 'Integra códigos QR en obras de arte para proporcionar información adicional o experiencias multimedia.'
      },
      {
        type: 'header',
        content: '2. Tarjetas de visita digitales'
      },
      {
        type: 'text',
        content: 'Crea tarjetas de visita con códigos QR que enlacen a tu perfil profesional o portafolio en línea.'
      },
      {
        type: 'header',
        content: '3. Juegos de búsqueda del tesoro'
      },
      {
        type: 'text',
        content: 'Organiza juegos de búsqueda del tesoro utilizando códigos QR para pistas y desafíos.'
      },
      {
        type: 'text',
        content: 'Con un poco de creatividad, los códigos QR pueden transformar la forma en que interactuamos con el mundo que nos rodea.'
      }
    ]
  },
  'generar-trafico-codigos-qr': {
    title: 'Los mejores consejos para generar tráfico con códigos QR',
    imageUrl: '/imgs/3.png?height=400&width=800',
    publishDate: '18 enero, 2025',
    readTime: 4,
    sections: [
      {
        type: 'text',
        content: 'Los códigos QR pueden ser una excelente herramienta para aumentar el tráfico a tu sitio web. Sigue estos consejos:'
      },
      {
        type: 'header',
        content: '1. Ubicación estratégica'
      },
      {
        type: 'text',
        content: 'Coloca códigos QR en lugares de alto tráfico o donde tu audiencia objetivo pase tiempo.'
      },
      {
        type: 'header',
        content: '2. Ofrece valor'
      },
      {
        type: 'text',
        content: 'Asegúrate de que el contenido al que enlaza el código QR sea valioso y relevante para tu audiencia.'
      },
      {
        type: 'header',
        content: '3. Llama a la acción clara'
      },
      {
        type: 'text',
        content: 'Incluye una llamada a la acción junto al código QR para motivar a las personas a escanearlo.'
      },
      {
        type: 'text',
        content: 'Recuerda medir y analizar el tráfico generado por tus códigos QR para optimizar tus estrategias futuras.'
      }
    ]
  }
}

type Params = Promise<{ slug: string }>

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    return <div>Post no encontrado</div>
  }

  return (
    <div className="min-h-screen">
      <Title title="Blog" subtitle="¡Lee nuestros artículos!" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArticleContent {...post} />
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Volver a todas las publicaciones
          </Link>
        </div>
      </main>
    </div>
  )
}
