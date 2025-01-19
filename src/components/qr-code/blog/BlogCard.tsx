import { CalendarIcon, ClockIcon } from 'lucide-react'
import Link from 'next/link'

interface BlogCardProps {
  title: string
  description: string
  slug: string
  publishDate: string
  readTime: number
}

export default function BlogCard({ title, description, slug, publishDate, readTime }: BlogCardProps) {
  return (
    <div className="shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{publishDate}</span>
          <ClockIcon className="w-4 h-4 ml-4 mr-2" />
          <span>{readTime} min de lectura</span>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Leer más
        </Link>
      </div>
    </div>
  )
}
