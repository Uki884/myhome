import React from 'react'
import * as styles from './style.css';

export const BaseHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.title}>884 Blog</div>
      </div>
    </header>
  )
}