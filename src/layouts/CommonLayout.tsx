import React from 'react'
import { BaseFooter } from '@/components/domain/BaseFooter'
import { BaseHeader } from '@/components/domain/BaseHeader'
import * as styles from './style.css'
interface Props {
  children: React.ReactNode
}

export const CommonLayout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <BaseHeader />
      {children}
      <BaseFooter />
    </div>
  )
}