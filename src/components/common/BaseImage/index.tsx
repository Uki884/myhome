import React from 'react'

interface Props {
  src?: string;
  alt?: string;
  className: string;
}

export const BaseImage = (props: Props) => {
  const { src, alt = '', className } = props
  console.log('src', src)
  const imageUrl = src ? src : '/noimage.png'
  console.log('imageUrl', imageUrl)
  return (
    <img src={imageUrl} alt={alt} className={className} />
  )
}