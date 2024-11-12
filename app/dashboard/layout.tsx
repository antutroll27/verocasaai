import React, { ReactNode , useState } from 'react'
import Header from './_components/Header'
import { UserDataContext } from '../_context/UserDataContext'
import { UserDetailType } from '@/types';

function DashboardLayout({children}: {children: ReactNode}) {

  return (
    <div className="min-h-screen w-full">
      <div className="fixed top-0 w-full z-50 bg-colors-custom-pastel">
        <Header />
      </div>
      <main className="pt-24 px-5 md:px-20 lg:px-40 xl:px-60 relative z-10">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
