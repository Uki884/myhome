import { BaseFooter } from '@/components/domain/BaseFooter'
import { BaseHeader } from '@/components/domain/BaseHeader'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export const CommonLayout = ({ children }: Props) => {
  return (
    <>
      <BaseHeader />
      {children}
      <BaseFooter />
    </>
  )
}