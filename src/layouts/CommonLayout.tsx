import React from 'react'
import { AppFooter } from '@/components/domain/App/AppFooter'
import { AppHeader } from '@/components/domain/App/AppHeader'
import * as Styled from './styled'
interface Props {
  children: React.ReactNode
}

export const CommonLayout = ({ children }: Props) => {
  return (
    <Styled.$Layout>
      <AppHeader />
      <Styled.$Main>
        {children}
      </Styled.$Main>
      {/* <BaseFooter /> */}
    </Styled.$Layout>
  )
}