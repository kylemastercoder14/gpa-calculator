
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientOnly from '@/components/ClientOnly'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GPA Wizard Calculator',
  description: 'Calculate your Grade Point Average based on subjects, grades, and credits.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  )
}
