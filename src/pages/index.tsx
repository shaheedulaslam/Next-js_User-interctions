import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center justify-between p-24 ${inter.className}`}>
        <Link href={'/signup'} className='border-2 rounded-lg w-32 text-center'>Get start →</Link>
    </main>
  )
}
