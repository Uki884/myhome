import React from 'react'

interface Props {
  src?: string;
  alt?: string;
  className: string;
}

export const BaseImage = (props: Props) => {
  const { src, alt = '', className } = props
  const imageUrl = src ? src : '/noimage.png'
  return (
    <img src={imageUrl} alt={alt} className={className} />
  )
}