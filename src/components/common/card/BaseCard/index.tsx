import React from 'react'
import { card } from './style.css';

interface Props {
  children: React.ReactNode;
  onClick: () => void
}

export const BaseCard = ({ children, onClick }: Props) => {
  return (
    <div className={card} onClick={onClick}>
      { children }
    </div>
  )
}
