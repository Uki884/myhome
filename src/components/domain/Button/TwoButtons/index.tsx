import React, { useState } from 'react'
import { buttons } from './style.css';
import { BaseButton } from '@/components/common/BaseButton';
import { useRecoilState } from 'recoil';

export const TwoButtons = () => {
  const [count, setCount] = useState(0)

  const increaseCount = () => {
    setCount(count + 1)
  };

  return (
    <div className={buttons}>
      <BaseButton color="primary" onClick={increaseCount}>ボタン1 { count }</BaseButton>
    </div>
  )
}
