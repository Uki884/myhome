import React from 'react'
import router from 'next/router'
import { $Content, $Header, $Title } from './styled'

export const BaseHeader = () => {
  const handleMove = (path: string) => {
    router.push(path)
  }

  return (
    <$Header>
      <$Content>
        <div>
          <$Title onClick={() => handleMove('/')}>884ブログ</$Title>
        </div>
        <div>
          <$Title>About</$Title>
        </div>
      </$Content>
    </$Header>
  )
}