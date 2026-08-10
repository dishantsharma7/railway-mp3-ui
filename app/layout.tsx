import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond, JetBrains_Mono, Tiro_Devanagari_Hindi } from 'next/font/google'
import './globals.css'

const fontSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const fontSerif = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  style: ['normal', 'italic'], 
  variable: '--font-serif' 
})
const fontMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const fontHindi = Tiro_Devanagari_Hindi({ weight: ['400'], style: ['normal', 'italic'], subsets: ['devanagari'], variable: '--font-hindi' })

export const metadata: Metadata = {
  title: 'Window Seat Radio | A Railway Music Journey',
  description: 'An ambient music journey through the sleeper class of an Indian railway carriage.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#151919',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} ${fontHindi.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
