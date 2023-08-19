import React from 'react'
import * as styles from './style.css';
import router from 'next/router'

export const BaseHeader = () => {
  const handleMove = (path: string) => {
    router.push(path)
  }

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div>
          <div className={styles.title} onClick={() => handleMove('/')}>884ブログ</div>
        </div>
        <div>
          <div className={styles.title}>About</div>
        </div>
      </div>
    </header>
  )
}