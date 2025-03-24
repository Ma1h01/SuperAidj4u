import HomeNavbar from '@/components/main/home/HomeNavbar'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div className=''>
        <HomeNavbar />
        {children}
    </div>
  )
}

export default Layout