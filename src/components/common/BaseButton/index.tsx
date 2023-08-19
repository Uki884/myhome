import React from 'react';
import { $Button, $PrimaryButton, $SecondaryButton } from './styled';
interface Props {
  children: React.ReactNode;
  color: 'primary' | 'secondary';
  onClick: () => void;
}

export const BaseButton = ({ children, color, onClick }: Props) => {
  const ButtonComponent = color === 'primary' ? $PrimaryButton : $SecondaryButton;

  return (
    <ButtonComponent onClick={onClick}>
      {children}
    </ButtonComponent>
  );
};