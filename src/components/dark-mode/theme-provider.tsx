// 'use client'

// import dynamic from 'next/dynamic'
// import { type ThemeProviderProps } from 'next-themes'
// import * as React from 'react'

// const NextThemesProvider = dynamic(
//   async () => await import('next-themes').then((e) => e.ThemeProvider),
//   {
//     ssr: false
//   }
// )

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'
import * as React from 'react'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
