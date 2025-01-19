import Image from 'next/image'
import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const Footer = () => {
  return (
    <footer className="w-full bg-primary text-gray-300 py-12 mt-16 dark:bg-secondary dark:text-gray-400">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/info/terms"
                className="hover:text-white transition-colors"
              >
                Términos y condiciones
              </Link>
              <Link
                href="https://davidhilera.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Hecho con ❤️ por Deiviiss
              </Link>
              <div className="flex items-center space-x-4">
                <Link
                  href="https://buymeacoffee.com/deiviiss"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                  rel="noopener noreferrer"
                  aria-label="Síguenos en Facebook"
                >
                  <Image src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me a Coffee" width={120} height={35} />
                </Link>
              </div>
            </nav>
          </div>

          {/* Brand Section */}
          <Link href="/" className="inline-block">
            <div className="flex flex-col space-y-1">
              <span className={`${titleFont.className} text-xl font-bold tracking-wider text-white`}>
                {/* Company */}
              </span>
              <span className="text-sm text-gray-400">
                © {new Date().getFullYear()} Generador de Códigos QR
              </span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
