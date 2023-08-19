import React from 'react'
import { BaseFooter } from '@/components/domain/BaseFooter'
import { BaseHeader } from '@/components/domain/BaseHeader'
import * as Styled from './styled'
interface Props {
  children: React.ReactNode
}

export const CommonLayout = ({ children }: Props) => {
  return (
    <Styled.$Layout>
      <BaseHeader />
      <Styled.$Main>
        {children}
      </Styled.$Main>
      <BaseFooter />
    </Styled.$Layout>
  )
}