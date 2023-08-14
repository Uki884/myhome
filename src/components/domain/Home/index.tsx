import React from 'react'
import { useRecoilState } from 'recoil'
import { TwoButtons } from '@/components/domain/Button/TwoButtons';
import { container } from './style.css';

export const Home = () => {
  return (
    <div className={container}>
      <h1>next.js</h1>
      <TwoButtons />
    </div>
  )
}
export default Home