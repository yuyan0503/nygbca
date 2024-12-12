import { ReactNode } from 'react'
import NavBar from '@/components/navbar/NavBar'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        {children}
      </div>
    </>
  )
}