import React from 'react'

const Label = ({ className, title ,htmlFor,id}) => {
  return (
    <label className={className} htmlFor={htmlFor} id={id}>
      {title}
    </label>
  )
}

export default Label