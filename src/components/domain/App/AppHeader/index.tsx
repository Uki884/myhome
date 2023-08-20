import React from 'react'
import router from 'next/router'
import { $Content, $Header, $Title, $Link } from './styled'
import { FaGithub } from "react-icons/fa"

export const AppHeader = () => {
  const handleMove = (path: string) => {
    router.push(path)
  }

  return (
    <$Header>
      <$Content>
        <div>
          <$Title onClick={() => handleMove('/')}>884 Log</$Title>
        </div>
        <$Link href={'https://github.com/Uki884'} target='_blank'>
          <FaGithub size={'2rem'} />
        </$Link>
      </$Content>
    </$Header>
  )
}