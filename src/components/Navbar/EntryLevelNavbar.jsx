import React from 'react'
import Image from '../Image/Image'
import Images from '../../utils/images'

const EntryLevelNavbar = () => {
  return (
    <nav className="navbar navbar-light bg-white header-nav">
    <div className="container mt-4">
      <a className="navbar-brand" href="#">
        <Image
          src={Images.logo}
          altText="No Logo"
          width={270}
          height={40}
          className="img-responsive"
        />
      </a>
    </div>
  </nav>
  )
}

export default EntryLevelNavbar