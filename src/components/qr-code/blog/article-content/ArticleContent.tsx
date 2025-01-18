import { CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'

interface ArticleContentProps {
  title: string
  imageUrl?: string
  publishDate: string
  readTime: number
  sections: Array<{ type: string, content: string }>
}

export default function ArticleContent({ title, imageUrl, publishDate, readTime, sections }: ArticleContentProps) {
  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1 className="mb-4">{title}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <CalendarIcon className="w-4 h-4 mr-2" />
        <span>{publishDate}</span>
        <ClockIcon className="w-4 h-4 ml-4 mr-2" />
        <span>{readTime} min de lectura</span>
      </div>
      {imageUrl && (
        <div className="my-8 max-w-screen-md mx-auto">
          <Image src={imageUrl || '/placeholder.svg'} alt={title} width={800} height={400} className="rounded-lg shadow-md max-w-full h-auto" />
        </div>
      )}
      <div className="mt-8">
        {sections.map((section, index) => {
          if (section.type === 'text') {
            return <p key={index}>{section.content}</p>
          }
          if (section.type === 'header') {
            return <h2 key={index} className="mt-4">{section.content}</h2>
          }
          return null
        })}
      </div>
    </article>
  )
}
