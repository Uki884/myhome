import React from 'react'
import { $Card } from './styled';
interface Props {
  children: React.ReactNode;
  onClick?: () => void
}

export const BaseCard = ({ children, onClick }: Props) => {
  return (
    <$Card onClick={onClick}>
      { children }
    </$Card>
  )
}
