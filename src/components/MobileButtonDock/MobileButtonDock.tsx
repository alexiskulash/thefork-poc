import React from 'react';
import * as S from './MobileButtonDock.styles';

interface MobileButtonDockProps {
  children: React.ReactNode;
}

/**
 * Mobile-specific button dock that provides fixed bottom positioning
 * with proper spacing and background for mobile restaurant pages
 */
const MobileButtonDock: React.FC<MobileButtonDockProps> = ({ children }) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default MobileButtonDock;
